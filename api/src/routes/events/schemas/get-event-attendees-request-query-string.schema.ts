import { z } from '../../../lib/zod';

export const getEventAttendeesRequestQueryStringSchema = z.object({
  page: z.string().nullish().default('1').transform(Number),
  query: z.string().nullish(),
});
