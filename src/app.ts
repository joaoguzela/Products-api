import fastify from 'fastify';
import { ZodError } from 'zod';
// import { appRoutes } from '@/http/routes';

export const app = fastify();

// app.register(appRoutes);

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({ message: error.message });
  }

  return reply.status(500).send({ message: 'Internal server error' });
});
