import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { HttpStatusCode } from '../enums/http-status-code.enum';
import { z } from '../lib/zod';

export async function rootRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/',
    {
      schema: {
        response: { [HttpStatusCode.OK]: z.object({ message: z.string() }) },
      },
    },
    async (_request, reply) => {
      return reply.status(HttpStatusCode.OK).send({ message: 'Pass.in API' });
    },
  );
}
