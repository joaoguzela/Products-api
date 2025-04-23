import { PrismaProductsRepository } from '@/http/repositories/productsRepository';
import { PrismaBrandsRepository } from '@/http/repositories/brandsRepository';
import { CreateProductUseCase } from '@/http/modules/services/createProductUser';

export function makeCreateProductUseCase() {
  const productsRepository = new PrismaProductsRepository();
  const brandsRepository = new PrismaBrandsRepository();

  const useCase = new CreateProductUseCase(
    productsRepository,
    brandsRepository,
  );
  return useCase;
}
