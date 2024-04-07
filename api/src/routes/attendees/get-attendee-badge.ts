import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { database } from '../../database/database';
import { HttpStatusCode } from '../../enums/http-status-code.enum';
import { BadRequest } from '../../errors/bad-request';
import { getAttendeeBadgeRequestParametersSchema } from './schemas/get-attendee-badge-request-parameters.schema';
import { getAttendeeBadgeResponseSuccessSchema } from './schemas/get-attendee-badge-response-success.schema';

export async function getAttendeeBadgeRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/attendees/:attendeeId/badge',
    {
      schema: {
        summary: 'Get attendee badge',
        tags: ['Attendees'],
        params: getAttendeeBadgeRequestParametersSchema,
        response: {
          [HttpStatusCode.OK]: getAttendeeBadgeResponseSuccessSchema,
        },
      },
    },
    async (request, reply) => {
      const { attendeeId } = request.params;

      const attendee = await database.attendee.findUnique({
        where: { id: attendeeId },
        select: {
          id: true,
          name: true,
          email: true,
          event: { select: { name: true } },
        },
      });

      if (!attendee) {
        throw new BadRequest('Attendee not found');
      }

      const checkInURL = new URL(
        `/attendees/${attendeeId}/check-in`,
        `${request.protocol}://${request.hostname}`,
      );

      return reply.status(HttpStatusCode.OK).send({
        id: attendee.id,
        name: attendee.name,
        email: attendee.email,
        eventName: attendee.event.name,
        checkInURL: checkInURL.toString(),
      });
    },
  );
}
