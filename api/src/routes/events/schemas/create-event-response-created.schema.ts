import { z } from '../../../lib/zod';

export const createEventResponseCreatedSchema = z.object({
  eventId: z.string().uuid(),
});
