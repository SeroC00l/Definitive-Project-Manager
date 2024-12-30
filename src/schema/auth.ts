import { z } from "astro:schema";

export const login = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const register = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});
