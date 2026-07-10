import { createClient } from "@supabase/supabase-js";

/**
 * Client Supabase — prêt à l'emploi dès que les variables d'environnement
 * NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY sont définies
 * dans un fichier .env.local (voir .env.example).
 *
 * Table suggérée pour les commandes :
 *
 * create table orders (
 *   id uuid primary key default gen_random_uuid(),
 *   name text not null,
 *   phone text not null,
 *   email text not null,
 *   event_date date not null,
 *   guest_count text,
 *   cake_type text,
 *   flavor text,
 *   colors text,
 *   decoration text,
 *   custom_text text,
 *   message text,
 *   inspiration_photo_url text,
 *   status text default 'nouveau',
 *   created_at timestamptz default now()
 * );
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
