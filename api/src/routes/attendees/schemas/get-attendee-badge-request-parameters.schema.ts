import { z } from '../../../lib/zod';

export const getAttendeeBadgeRequestParametersSchema = z.object({
  attendeeId: z.coerce.number().int().positive(),
});
