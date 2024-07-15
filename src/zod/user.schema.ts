import { z } from "zod";

export const createUserSchema = z.object({
    name: z.string().nonempty(),
    email: z.string().email(),
    username: z.string().min(3),
    password: z.string().min(8),
});
