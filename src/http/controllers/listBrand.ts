import { FastifyRequest, FastifyReply } from 'fastify';
import { makeListBrandsUseCase } from '@/http/modules/factories/listBrandFactory';

export async function listBrands(request: FastifyRequest, reply: FastifyReply) {
  try {
    const listBrandsUseCase = makeListBrandsUseCase();

    const { brands } = await listBrandsUseCase.execute();

    return reply.status(200).send(brands);
  } catch (error) {
    return reply.status(500).send({
      message: 'Erro ao listar marcas',
      error: error instanceof Error ? error.message : error,
    });
  }
}
