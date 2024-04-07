import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { database } from '../../database/database';
import { HttpStatusCode } from '../../enums/http-status-code.enum';
import { BadRequest } from '../../errors/bad-request';
import { registerInEventRequestBodySchema } from './schemas/register-in-event-request-body.schema';
import { registerInEventRequestParametersSchema } from './schemas/register-in-event-request-parameters.schema';
import { registerInEventResponseCreatedSchema } from './schemas/register-in-event-response-created.schema';

export async function registerInEventRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/events/:eventId/attendees',
    {
      schema: {
        summary: 'Register a user in an event',
        tags: ['Events'],
        body: registerInEventRequestBodySchema,
        params: registerInEventRequestParametersSchema,
        response: {
          [HttpStatusCode.Created]: registerInEventResponseCreatedSchema,
        },
      },
    },
    async (request, reply) => {
      const { eventId } = request.params;
      const { name, email } = request.body;

      const attendeeFromEmail = await database.attendee.findUnique({
        where: { eventId_email: { eventId, email } },
      });

      if (attendeeFromEmail !== null) {
        throw new BadRequest('This email already registered for this event.');
      }

      const [event, amountOfAttendsForEvent] = await Promise.all([
        database.event.findUnique({ where: { id: eventId } }),
        database.attendee.count({ where: { eventId } }),
      ]);

      if (
        event?.maximumAttendees &&
        amountOfAttendsForEvent > event.maximumAttendees
      ) {
        throw new BadRequest(
          'Tha maximum of attendees for this event has been reached.',
        );
      }

      const { id: attendeeId } = await database.attendee.create({
        data: { name, email, eventId },
      });

      return reply.status(HttpStatusCode.Created).send({ attendeeId });
    },
  );
}
