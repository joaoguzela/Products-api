import { PrismaProductsRepository } from '@/http/repositories/productsRepository';
import { ListProductsUseCase } from '@/http/modules/services/listProducts';

export function makeListProductsUseCase() {
  const productsRepository = new PrismaProductsRepository();
  const useCase = new ListProductsUseCase(productsRepository);
  return useCase;
}
