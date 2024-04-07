import { z } from '../../../lib/zod';

export const getEventByIdResponseSuccessSchema = z.object({
  name: z.string(),
  slug: z.string(),
  details: z.string().nullable(),
  maximumAttendees: z.number().int().nullable(),
  attendeesAmount: z.number().int(),
});
