import { z } from 'zod';
import { environmentVariablesSchema } from './src/environment';

declare global {
  namespace NodeJS {
    interface ProcessEnvironment
      extends z.infer<typeof environmentVariablesSchema> {}
  }
}
