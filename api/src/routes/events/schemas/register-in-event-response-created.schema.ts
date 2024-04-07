import { z } from '../../../lib/zod';

export const registerInEventResponseCreatedSchema = z.object({
  attendeeId: z.number(),
});
