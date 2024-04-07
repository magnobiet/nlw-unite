import { z } from '../../../lib/zod';

export const registerInEventRequestParametersSchema = z.object({
  eventId: z.string().uuid(),
});
