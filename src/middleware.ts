import { defineMiddleware } from "astro:middleware";
import { supabase } from "./db/supabase";
import { LOGIN_ROUTE } from "./constants/routes";

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware(async (context, next) => {
  const token = context.cookies.get("sb_token")?.value;
  if (token) {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (user) {
      context.locals.user = user;
      context.locals.isLoggedIn = true;
    } else {
      context.locals.user = null;
      context.locals.isLoggedIn = false; 
      context.cookies.delete("sb_token", {
        path: "/",
      });
      return context.rewrite(
        new Request(LOGIN_ROUTE, {
          headers: {
            "x-redirect-to": context.url.pathname,
          },
        }),
      );
    }
  }
  return next();
});
