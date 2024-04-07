import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { database } from '../../database/database';
import { HttpStatusCode } from '../../enums/http-status-code.enum';
import { environment } from '../../environment';
import { getEventAttendeesRequestParametersSchema } from './schemas/get-event-attendees-request-parameters.schema';
import { getEventAttendeesRequestQueryStringSchema } from './schemas/get-event-attendees-request-query-string.schema';
import { getEventAttendeesResponseSuccessSchema } from './schemas/get-event-attendees-response-success.schema';

export async function getEventAttendeesRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/events/:eventId/attendees',
    {
      schema: {
        summary: 'Get attendees from an event',
        tags: ['Events'],
        params: getEventAttendeesRequestParametersSchema,
        querystring: getEventAttendeesRequestQueryStringSchema,
        response: {
          [HttpStatusCode.OK]: getEventAttendeesResponseSuccessSchema,
        },
      },
    },
    async (request, reply) => {
      const { eventId } = request.params;
      const { page, query } = request.query;
      const pageSize = environment.PAGINATION_PAGE_SIZE;

      const [attendees, totalRows] = await Promise.all([
        database.attendee.findMany({
          select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            checkIn: { select: { createdAt: true } },
          },
          where: query ? { eventId, name: { contains: query } } : { eventId },
          orderBy: { createdAt: 'desc' },
          take: pageSize,
          skip: (page >= 1 ? page - 1 : 1) * pageSize,
        }),
        database.attendee.count({
          where: query ? { eventId, name: { contains: query } } : { eventId },
        }),
      ]);

      return reply
        .status(HttpStatusCode.OK)
        .headers({
          'X-Pagination-Total-Pages': Math.ceil(totalRows / pageSize),
          'X-Pagination-Total-Items': totalRows,
          'X-Pagination-Current-Page': page,
          'X-Pagination-Page-Size': pageSize,
        })
        .send(
          attendees.map(({ id, name, email, createdAt, checkIn }) => ({
            id,
            name,
            email,
            createdAt,
            checkInAt: checkIn?.createdAt ?? null,
          })),
        );
    },
  );
}
