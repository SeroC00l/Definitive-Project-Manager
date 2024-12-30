import { supabase } from "@/db/supabase";
import { ActionError, defineAction } from "astro:actions";

export const user = {
  profile: defineAction({
    accept: "form",
    handler: async (profile, ctx) => {
      const image = profile.get("image");
      const token = ctx.cookies.get("sb_token")?.value;
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser(token);
      if (!user || error) {
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "User not found",
        });
      }
      if (image instanceof File) {
        const { data, error } = await supabase.storage
          .from("avatars")
          .upload(user.id, image, { upsert: true });
        if (error) {
          throw new ActionError({
            code: "BAD_REQUEST",
            message: "Failed to upload image",
          });
        }
      }
    },
  }),
};
