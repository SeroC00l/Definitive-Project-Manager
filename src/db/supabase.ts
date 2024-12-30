
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL } from "astro:env/client";
import { DATABASE_URL, SUPABASE_KEY } from "astro:env/server";
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const client = postgres(DATABASE_URL, { prepare: false });

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
export const db = drizzle(client);
        