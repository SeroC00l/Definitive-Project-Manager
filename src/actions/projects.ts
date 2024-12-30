import {
  createProjectSchema,
  projectsTable,
  updateProjectSchema,
} from "@/db/schema";
import { db, supabase } from "@/db/supabase";
import { defineAction, ActionError } from "astro:actions";

export const projects = {
  create: defineAction({
    accept: "form",
    input: createProjectSchema,
    handler: async (project, ctx) => {
      console.log({ project });
      const {
        data: { user },
      } = await supabase.auth.getUser(ctx.cookies.get("sb_token")?.value);
      if (!user) {
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "User not found",
        });
      }
      await db.insert(projectsTable).values({ ...project, user_id: user?.id });
    },
  }),
  update: defineAction({
    accept: "form",
    input: updateProjectSchema,
    handler: async (project, ctx) => {
      console.log({ project });
      const {
        data: { user },
      } = await supabase.auth.getUser(ctx.cookies.get("sb_token")?.value);
      if (!user) {
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "User not found",
        });
      }
     await db.update(projectsTable).set({ ...project, user_id: user?.id });
    },
  }),
};
