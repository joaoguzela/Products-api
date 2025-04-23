import { z } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';
import { makeListProductsUseCase } from '@/http/modules/factories/listProductFactorie';

export async function listProducts(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const querySchema = z.object({
    search: z.string().optional(),
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(10),
  });

  const { search, page, limit } = querySchema.parse(request.query);

  try {
    const listProductsUseCase = makeListProductsUseCase();

    const { products, total } = await listProductsUseCase.execute({
      searchTerm: search,
      page,
      limit,
    });

    return reply.status(200).send({
      products,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    return reply.status(500).send({
      message: 'Erro ao listar produtos',
      error: error instanceof Error ? error.message : error,
    });
  }
}
