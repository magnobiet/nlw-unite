import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { database } from '../../database/database';
import { HttpStatusCode } from '../../enums/http-status-code.enum';
import { BadRequest } from '../../errors/bad-request';
import { getEventByIdRequestParametersSchema } from './schemas/get-event-by-id-request-parameters.schema';
import { getEventByIdResponseSuccessSchema } from './schemas/get-event-by-id-response-success.schema';

export async function getEventByIdRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/events/:eventId',
    {
      schema: {
        summary: 'Get an event by ID',
        tags: ['Events'],
        params: getEventByIdRequestParametersSchema,
        response: {
          [HttpStatusCode.OK]: getEventByIdResponseSuccessSchema,
        },
      },
    },
    async (request, reply) => {
      const { eventId } = request.params;

      const event = await database.event.findUnique({
        where: { id: eventId },
        select: {
          name: true,
          slug: true,
          details: true,
          maximumAttendees: true,
          _count: { select: { attendees: true } },
        },
      });

      if (!event) {
        throw new BadRequest('Event not found');
      }

      return reply.status(HttpStatusCode.OK).send({
        name: event.name,
        slug: event.slug,
        details: event.details,
        maximumAttendees: event.maximumAttendees,
        attendeesAmount: event._count.attendees,
      });
    },
  );
}
