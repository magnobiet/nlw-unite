import fastifyCors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import fastify from 'fastify';
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
import { environment } from './environment';
import { errorHandler } from './errors/error-handler';
import { checkInRoute } from './routes/attendees/check-in';
import { getAttendeeBadgeRoute } from './routes/attendees/get-attendee-badge';
import { createEventRoute } from './routes/events/create-event.route';
import { getEventAttendeesRoute } from './routes/events/get-event-attendees';
import { getEventByIdRoute } from './routes/events/get-event-by-id';
import { registerInEventRoute } from './routes/events/register-in-event.route';
import { rootRoute } from './routes/root';

const app = fastify({ logger: environment.DEBUG });

app.register(fastifyCors, {
  origin: environment.ALLOWED_ORIGINS,
  exposedHeaders: [
    'x-pagination-total-items',
    'x-pagination-total-pages',
    'x-pagination-current-page',
    'x-pagination-page-size',
  ],
});

app.register(fastifySwagger, {
  swagger: {
    consumes: ['application/json'],
    produces: ['application/json'],
    info: {
      title: 'Pass.in',
      description: 'Especificação da API para o back-end da aplicação Pass.in.',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUI, { routePrefix: '/docs' });

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(rootRoute);
app.register(createEventRoute);
app.register(registerInEventRoute);
app.register(getEventByIdRoute);
app.register(getAttendeeBadgeRoute);
app.register(checkInRoute);
app.register(getEventAttendeesRoute);

app.setErrorHandler(errorHandler);

app
  .listen({ port: environment.APP_PORT, host: environment.APP_HOST })
  .then(() => {
    console.log('🚀 HTTP server running!');
  });
