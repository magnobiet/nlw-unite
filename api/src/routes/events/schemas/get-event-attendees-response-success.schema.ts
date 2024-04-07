import { z } from '../../../lib/zod';

export const getEventAttendeesResponseSuccessSchema = z.array(
  z.object({
    id: z.number().int().positive(),
    name: z.string().min(3),
    email: z.string().email(),
    createdAt: z.date(),
    checkInAt: z.date().nullable(),
  }),
);
