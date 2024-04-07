import { FastifyInstance } from 'fastify';
import { ZodError } from 'zod';
import { HttpStatusCode } from '../enums/http-status-code.enum';
import { BadRequest } from './bad-request';

type FastifyErrorHandler = FastifyInstance['errorHandler'];

type Error = {
  [key: string]: Array<string> | undefined;
  [key: number]: Array<string> | undefined;
  [key: symbol]: Array<string> | undefined;
};

type ErrorResponse = {
  message: string;
  errors?: Error;
};

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  request.log.info(error);

  if (error instanceof ZodError) {
    const response: ErrorResponse = {
      message: 'Validation error',
      errors: error.flatten().fieldErrors,
    };

    return reply.status(HttpStatusCode.UnprocessableEntity).send(response);
  }

  if (error instanceof BadRequest) {
    const response: ErrorResponse = { message: error.message };

    return reply.status(HttpStatusCode.BadRequest).send(response);
  }

  const response: ErrorResponse = { message: 'Internal Server Error' };

  return reply.status(HttpStatusCode.InternalError).send(response);
};
