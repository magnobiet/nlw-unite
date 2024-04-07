import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { database } from '../../database/database';
import { HttpStatusCode } from '../../enums/http-status-code.enum';
import { BadRequest } from '../../errors/bad-request';
import { checkInRequestParametersSchema } from './schemas/check-in-request-parameters.schema';
import { checkInResponseCreatedSchema } from './schemas/check-in-response-created.schema';

export async function checkInRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/attendees/:attendeeId/check-in',
    {
      schema: {
        summary: 'Do check-in in an event',
        tags: ['Attendees'],
        params: checkInRequestParametersSchema,
        response: {
          [HttpStatusCode.Created]: checkInResponseCreatedSchema,
        },
      },
    },
    async (request, reply) => {
      const { attendeeId } = request.params;

      const attendeeCheckIn = await database.checkIn.findUnique({
        where: { attendeeId },
      });

      if (attendeeCheckIn) {
        throw new BadRequest('Attendee already checked in');
      }

      await database.checkIn.create({ data: { attendeeId } });

      return reply.status(HttpStatusCode.Created).send();
    },
  );
}
