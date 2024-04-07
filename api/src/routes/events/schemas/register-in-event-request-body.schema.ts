import { z } from '../../../lib/zod';

export const registerInEventRequestBodySchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
});
