import { FastifyReply, FastifyRequest } from 'fastify';
import { verify } from 'jsonwebtoken';

export async function validateJWT(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return reply.status(401).send({ message: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return reply.status(401).send({ message: 'Token não fornecido' });
  }

  try {
    return verify(token, process.env.JWT_SECRET_KEY || 'your-secret-key');
  } catch (error) {
    return reply.status(401).send({ message: 'Token inválido' });
  }
}
