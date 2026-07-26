import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "gbn_admin_session";
const SESSION_DURATION = 60 * 60 * 24 * 7; // 7 jours

function getSecretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "SESSION_SECRET manquant dans .env.local — génère-en un et ajoute-le (voir .env.example)."
    );
  }
  return new TextEncoder().encode(secret);
}

export interface AdminSession {
  email: string;
}

/** Crée un JWT signé pour la session admin et le pose dans un cookie httpOnly. */
export async function createSession(email: string) {
  const token = await new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION}s`)
    .sign(getSecretKey());

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION,
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

/** Lit et vérifie la session côté serveur (Server Components / Route Handlers). */
export async function getSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return { email: payload.email as string };
  } catch {
    return null;
  }
}

/** Vérifie un token à partir d'une chaîne brute (utilisé dans le middleware, Edge runtime). */
export async function verifySessionToken(token: string): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return { email: payload.email as string };
  } catch {
    return null;
  }
}

export const SESSION_COOKIE_NAME = COOKIE_NAME;

/** À utiliser en tête des routes API /api/admin/* pour vérifier la session. */
export async function requireAdmin(): Promise<AdminSession | null> {
  return getSession();
}
