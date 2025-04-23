import { z } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';

import { makeCreateProductUseCase } from '@/http/modules/factories/createProductFactorie';
import { NotFoundError } from '@/http/modules/errors/notFoundError';

export async function createProduct(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createProductBodySchema = z.object({
    name: z.string().min(1),
    price: z.number().positive(),
    description: z.string().optional(),
    image: z.string().url().optional(),
    brandId: z.string().uuid(),
  });

  const body = createProductBodySchema.safeParse(request.body);

  if (!body.success) {
    return reply
      .status(400)
      .send({ message: 'Dados inválidos', errors: body.error.errors });
  }

  const { name, price, description, image, brandId } = body.data;

  try {
    const createProductUseCase = makeCreateProductUseCase();

    const { product } = await createProductUseCase.execute({
      name,
      price,
      description,
      image,
      brandId,
    });

    return reply.status(201).send(product);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    return reply.status(500).send({
      message: 'Erro ao criar produto',
      error: error instanceof Error ? error.message : error,
    });
  }
}
