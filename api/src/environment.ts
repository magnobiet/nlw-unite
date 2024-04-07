import { z } from './lib/zod';

export const environmentVariablesSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'staging', 'production'])
    .default('development')
    .readonly(),
  DEBUG: z
    .string()
    .default('false')
    .transform((value) => value.toLowerCase() === 'true')
    .readonly(),
  APP_PORT: z.coerce.number().int().positive().readonly(),
  APP_HOST: z.string().default('0.0.0.0').readonly(),
  ALLOWED_ORIGINS: z.string().default('*').readonly(),
  PAGINATION_PAGE_SIZE: z.string().default('10').transform(Number).readonly(),
  DATABASE_URL: z.string().readonly(),
});

export const environment = environmentVariablesSchema.parse(process.env);
