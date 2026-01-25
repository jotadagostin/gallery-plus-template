import { z } from "zod";

export const photoNewFormSchema = z.object({
  title: z.string().min(1, { message: "Field required!" }).max(250),
  file: z.instanceof(FileList).refine((file) => file.length > 0, {
    message: "required field",
  }),
  albumIds: z.array(z.string().uuid()).optional(),
});

export type PhotoNewFormSchema = z.infer<typeof photoNewFormSchema>;
