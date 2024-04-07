import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { database } from '../../database/database';
import { HttpStatusCode } from '../../enums/http-status-code.enum';
import { BadRequest } from '../../errors/bad-request';
import { generateSlug } from '../../utils/generate-slug';
import { createEventRequestBodySchema } from './schemas/create-event-request-body.schema';
import { createEventResponseCreatedSchema } from './schemas/create-event-response-created.schema';

export async function createEventRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/events',
    {
      schema: {
        summary: 'Create an event',
        tags: ['Events'],
        body: createEventRequestBodySchema,
        response: {
          [HttpStatusCode.Created]: createEventResponseCreatedSchema,
        },
      },
    },
    async (request, reply) => {
      const { name, details, maximumAttendees } = request.body;
      const slug = generateSlug(name);

      const eventWithSameSlug = await database.event.findUnique({
        where: { slug },
      });

      if (eventWithSameSlug !== null) {
        throw new BadRequest('Another event with same title already exists');
      }

      const { id: eventId } = await database.event.create({
        data: { name, details, maximumAttendees, slug },
      });

      return reply.status(HttpStatusCode.Created).send({ eventId });
    },
  );
}
