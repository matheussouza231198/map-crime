import z from "zod/v3";

const envSchema = z.object({
  VITE_GOOGLE_MAPS_API_KEY: z.string().min(1, "VITE_GOOGLE_MAPS_API_KEY is required"),
});


export const env = envSchema.parse(import.meta.env);