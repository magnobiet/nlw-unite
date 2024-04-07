import { z } from '../../../lib/zod';

export const getEventByIdRequestParametersSchema = z.object({
  eventId: z.string().uuid(),
});
