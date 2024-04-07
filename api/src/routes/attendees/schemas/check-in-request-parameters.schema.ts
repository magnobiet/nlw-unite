import { z } from '../../../lib/zod';

export const checkInRequestParametersSchema = z.object({
  attendeeId: z.coerce.number().int().positive(),
});
