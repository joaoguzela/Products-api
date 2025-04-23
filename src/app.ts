import fastify from 'fastify';
import { ZodError } from 'zod';
import { appRoutes } from '@/http/route';
import { validateJWT } from '@/middlewares/jwt';

export const app = fastify();
app.addHook('onRequest', async (request, reply) => {
  if (request.url === '/login') return;

  await validateJWT(request, reply);
});

app.register(appRoutes);

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({ message: error.message });
  }

  return reply.status(500).send({ message: 'Internal server error' });
});
