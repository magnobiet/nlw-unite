import { z } from '../../../lib/zod';

export const getEventAttendeesRequestParametersSchema = z.object({
  eventId: z.string().uuid(),
});
