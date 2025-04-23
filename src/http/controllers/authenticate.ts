import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';

import { InvalidCredentialsError } from '@/http/modules/errors/invalidCredentialsError';
import { makeAuthenticateUseCase } from '@/http/modules/factories/authenticateFactorie';

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);
  try {
    const authenticateUseCase = makeAuthenticateUseCase();
    const { token } = await authenticateUseCase.execute({ email, password });

    return reply.status(200).send({ token });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message });
    }
    throw error;
  }
}
