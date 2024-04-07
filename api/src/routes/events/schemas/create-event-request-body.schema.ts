import { z } from '../../../lib/zod';

export const createEventRequestBodySchema = z.object({
  name: z.string().min(3),
  details: z.string().nullable(),
  maximumAttendees: z.number().int().positive().nullable(),
});
