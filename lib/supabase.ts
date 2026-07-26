import { createClient } from "@supabase/supabase-js";

/**
 * Client Supabase côté serveur (clé service_role — ne jamais exposer côté
 * client). Utilisé par lib/store.ts pour toutes les opérations de lecture/
 * écriture (commandes, créations, galerie) dès que les variables
 * d'environnement sont configurées.
 *
 * Variables nécessaires (voir .env.example) :
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *
 * Schéma SQL à exécuter dans Supabase (SQL Editor) : voir supabase/schema.sql
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseServiceKey);

export const supabaseAdmin = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false },
    })
  : null;
