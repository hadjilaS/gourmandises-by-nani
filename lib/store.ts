import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import type { Creation, GalleryItem, OrderFormData, OrderRecord, OrderStatus } from "@/types";
import { creations as seedCreations } from "@/data/creations";
import { galleryItems as seedGallery } from "@/data/gallery";
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

/**
 * Couche de persistance à double mode :
 *  - Si Supabase est configuré (NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY),
 *    toutes les opérations passent par Supabase → fonctionne sur Vercel / tout hébergement serverless.
 *  - Sinon, repli automatique sur des fichiers JSON locaux dans data/db/
 *    → pratique pour développer en local sans rien configurer, mais NE PERSISTE PAS
 *    sur un hébergement serverless (système de fichiers éphémère).
 */

const DB_DIR = path.join(process.cwd(), "data", "db");
const ORDERS_FILE = path.join(DB_DIR, "orders.json");
const CREATIONS_FILE = path.join(DB_DIR, "creations.json");
const GALLERY_FILE = path.join(DB_DIR, "gallery.json");

async function ensureFile<T>(filePath: string, seed: T) {
  try {
    await fs.access(filePath);
  } catch {
    await fs.mkdir(DB_DIR, { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(seed, null, 2), "utf-8");
  }
}

async function readJson<T>(filePath: string, seed: T): Promise<T> {
  await ensureFile(filePath, seed);
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

async function writeJson<T>(filePath: string, data: T) {
  await fs.mkdir(DB_DIR, { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

/* ───────────────────────── Mappers Supabase (snake_case ↔ camelCase) ───────────────────────── */

function orderFromRow(row: Record<string, unknown>): OrderRecord {
  return {
    id: row.id as string,
    createdAt: row.created_at as string,
    status: row.status as OrderStatus,
    name: row.name as string,
    phone: row.phone as string,
    email: row.email as string,
    eventDate: row.event_date as string,
    guestCount: (row.guest_count as string) ?? "",
    cakeType: (row.cake_type as string) ?? "",
    flavor: (row.flavor as string) ?? "",
    colors: (row.colors as string) ?? "",
    decoration: (row.decoration as string) ?? "",
    customText: (row.custom_text as string) ?? undefined,
    message: (row.message as string) ?? undefined,
    inspirationPhotoUrl: (row.inspiration_photo_url as string) ?? undefined,
  };
}

function rowFromOrderData(data: OrderFormData) {
  return {
    name: data.name,
    phone: data.phone,
    email: data.email,
    event_date: data.eventDate,
    guest_count: data.guestCount,
    cake_type: data.cakeType,
    flavor: data.flavor,
    colors: data.colors,
    decoration: data.decoration,
    custom_text: data.customText ?? null,
    message: data.message ?? null,
    inspiration_photo_url: data.inspirationPhotoUrl ?? null,
  };
}

/* ───────────────────────── Commandes ───────────────────────── */

export async function getOrders(): Promise<OrderRecord[]> {
  if (isSupabaseConfigured && supabaseAdmin) {
    const { data, error } = await supabaseAdmin
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(`Supabase getOrders: ${error.message}`);
    return (data ?? []).map(orderFromRow);
  }

  const orders = await readJson<OrderRecord[]>(ORDERS_FILE, []);
  return orders.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function addOrder(data: OrderFormData): Promise<OrderRecord> {
  if (isSupabaseConfigured && supabaseAdmin) {
    const { data: row, error } = await supabaseAdmin
      .from("orders")
      .insert(rowFromOrderData(data))
      .select()
      .single();
    if (error) throw new Error(`Supabase addOrder: ${error.message}`);
    return orderFromRow(row);
  }

  const orders = await readJson<OrderRecord[]>(ORDERS_FILE, []);
  const record: OrderRecord = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    status: "nouveau",
    ...data,
  };
  orders.push(record);
  await writeJson(ORDERS_FILE, orders);
  return record;
}

export async function updateOrderStatus(
  id: string,
  status: OrderStatus
): Promise<OrderRecord | null> {
  if (isSupabaseConfigured && supabaseAdmin) {
    const { data: row, error } = await supabaseAdmin
      .from("orders")
      .update({ status })
      .eq("id", id)
      .select()
      .single();
    if (error) return null;
    return orderFromRow(row);
  }

  const orders = await readJson<OrderRecord[]>(ORDERS_FILE, []);
  const idx = orders.findIndex((o) => o.id === id);
  if (idx === -1) return null;
  orders[idx].status = status;
  await writeJson(ORDERS_FILE, orders);
  return orders[idx];
}

export async function deleteOrder(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabaseAdmin) {
    const { error } = await supabaseAdmin.from("orders").delete().eq("id", id);
    return !error;
  }

  const orders = await readJson<OrderRecord[]>(ORDERS_FILE, []);
  const filtered = orders.filter((o) => o.id !== id);
  if (filtered.length === orders.length) return false;
  await writeJson(ORDERS_FILE, filtered);
  return true;
}

/* ───────────────────────── Créations (cartes accueil) ───────────────────────── */

export async function getCreations(): Promise<Creation[]> {
  if (isSupabaseConfigured && supabaseAdmin) {
    const { data, error } = await supabaseAdmin
      .from("creations")
      .select("*")
      .order("created_at", { ascending: true });
    if (error) throw new Error(`Supabase getCreations: ${error.message}`);
    return (data ?? []) as Creation[];
  }
  return readJson<Creation[]>(CREATIONS_FILE, seedCreations);
}

export async function addCreation(data: Omit<Creation, "id">): Promise<Creation> {
  if (isSupabaseConfigured && supabaseAdmin) {
    const { data: row, error } = await supabaseAdmin
      .from("creations")
      .insert(data)
      .select()
      .single();
    if (error) throw new Error(`Supabase addCreation: ${error.message}`);
    return row as Creation;
  }

  const items = await readJson<Creation[]>(CREATIONS_FILE, seedCreations);
  const record: Creation = { id: randomUUID(), ...data };
  items.push(record);
  await writeJson(CREATIONS_FILE, items);
  return record;
}

export async function updateCreation(
  id: string,
  data: Partial<Omit<Creation, "id">>
): Promise<Creation | null> {
  if (isSupabaseConfigured && supabaseAdmin) {
    const { data: row, error } = await supabaseAdmin
      .from("creations")
      .update(data)
      .eq("id", id)
      .select()
      .single();
    if (error) return null;
    return row as Creation;
  }

  const items = await readJson<Creation[]>(CREATIONS_FILE, seedCreations);
  const idx = items.findIndex((c) => c.id === id);
  if (idx === -1) return null;
  items[idx] = { ...items[idx], ...data };
  await writeJson(CREATIONS_FILE, items);
  return items[idx];
}

export async function deleteCreation(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabaseAdmin) {
    const { error } = await supabaseAdmin.from("creations").delete().eq("id", id);
    return !error;
  }

  const items = await readJson<Creation[]>(CREATIONS_FILE, seedCreations);
  const filtered = items.filter((c) => c.id !== id);
  if (filtered.length === items.length) return false;
  await writeJson(CREATIONS_FILE, filtered);
  return true;
}

/* ───────────────────────── Galerie ───────────────────────── */

export async function getGalleryItems(): Promise<GalleryItem[]> {
  if (isSupabaseConfigured && supabaseAdmin) {
    const { data, error } = await supabaseAdmin
      .from("gallery_items")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(`Supabase getGalleryItems: ${error.message}`);
    return (data ?? []) as GalleryItem[];
  }
  return readJson<GalleryItem[]>(GALLERY_FILE, seedGallery);
}

export async function addGalleryItem(data: Omit<GalleryItem, "id">): Promise<GalleryItem> {
  if (isSupabaseConfigured && supabaseAdmin) {
    const { data: row, error } = await supabaseAdmin
      .from("gallery_items")
      .insert(data)
      .select()
      .single();
    if (error) throw new Error(`Supabase addGalleryItem: ${error.message}`);
    return row as GalleryItem;
  }

  const items = await readJson<GalleryItem[]>(GALLERY_FILE, seedGallery);
  const record: GalleryItem = { id: randomUUID(), ...data };
  items.push(record);
  await writeJson(GALLERY_FILE, items);
  return record;
}

export async function updateGalleryItem(
  id: string,
  data: Partial<Omit<GalleryItem, "id">>
): Promise<GalleryItem | null> {
  if (isSupabaseConfigured && supabaseAdmin) {
    const { data: row, error } = await supabaseAdmin
      .from("gallery_items")
      .update(data)
      .eq("id", id)
      .select()
      .single();
    if (error) return null;
    return row as GalleryItem;
  }

  const items = await readJson<GalleryItem[]>(GALLERY_FILE, seedGallery);
  const idx = items.findIndex((g) => g.id === id);
  if (idx === -1) return null;
  items[idx] = { ...items[idx], ...data };
  await writeJson(GALLERY_FILE, items);
  return items[idx];
}

export async function deleteGalleryItem(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabaseAdmin) {
    const { error } = await supabaseAdmin.from("gallery_items").delete().eq("id", id);
    return !error;
  }

  const items = await readJson<GalleryItem[]>(GALLERY_FILE, seedGallery);
  const filtered = items.filter((g) => g.id !== id);
  if (filtered.length === items.length) return false;
  await writeJson(GALLERY_FILE, filtered);
  return true;
}
