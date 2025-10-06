import { z } from 'zod';

export const registerSchema = z.object({
  nombre: z.string().min(2).max(100),
  apellido: z.string().min(2).max(100),
  email: z.string().email().max(200),
  password: z.string().min(8).max(200),
  telefono: z.string().max(100).optional().or(z.literal('').transform(() => undefined)),
});

export type RegisterInput = z.infer<typeof registerSchema>;
