import z from "zod";

export const albumNewFormSchema = z.object({
  title: z.string().min(1, { message: "Field required" }).max(225),
  photoIds: z.array(z.string().uuid()).optional(),
});

export type albumNewFormSchema = z.infer<typeof albumNewFormSchema>;
