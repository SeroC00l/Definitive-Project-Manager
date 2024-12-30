/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
  import type { User } from "@supabase/supabase-js";

  interface Locals {
    user?: User;
    isLoggedIn?: boolean;
  }
}
