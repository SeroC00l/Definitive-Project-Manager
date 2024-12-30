import { ActionError, defineAction } from "astro:actions";
import { login, register } from "@/schema/auth";
import { supabase } from "@/db/supabase";
import { PROJECTS_ROUTE } from "@/constants/routes";
import { z } from "astro:schema";

export const auth = {
  login: defineAction({
    accept: "form",
    input: login,
    handler: async ({ email, password }, ctx) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: error.message,
        });
      }
      ctx.cookies.set("sb_token", data.session.access_token, {
        sameSite: "lax",
        path: "/",
      });
      return { redirect: PROJECTS_ROUTE };
    },
  }),
  register: defineAction({
    accept: "form",
    input: register,
    handler: async ({ name, email, password }, ctx) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } },
      });
      if (error || !data.session?.access_token) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: error?.message || "No session created",
        });
      }
      ctx.cookies.set("sb_token", data.session.access_token, {
        sameSite: "lax",
        path: "/",
      });
      return { redirect: PROJECTS_ROUTE };
    },
  }),
  oauth: defineAction({
    accept: "form",
    input: z.object({ provider: z.enum(["google", "github"]) }),
    handler: async ({ provider }, ctx) => {
      const { data, error } = await supabase.auth.signInWithOAuth({ provider });
      if (error) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: error.message,
        });
      }
      return { redirect: data.url };
    },
  }),
  logout: defineAction({
    accept: "form",
    handler: async (_, ctx) => {
      await supabase.auth.signOut();
      ctx.cookies.delete("sb_token", {
        path: "/",
      });
    },
  }),
};
