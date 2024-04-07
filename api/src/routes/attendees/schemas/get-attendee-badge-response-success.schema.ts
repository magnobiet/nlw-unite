import { z } from '../../../lib/zod';

export const getAttendeeBadgeResponseSuccessSchema = z.object({
  id: z.number().int().min(1),
  name: z.string().min(3),
  email: z.string().email(),
  eventName: z.string().min(3),
  checkInURL: z.string().url(),
});
