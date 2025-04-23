import { ListBrandsUseCase } from '@/http/modules/services/listBrands';
import { PrismaBrandsRepository } from '@/http/repositories/brandsRepository';

export function makeListBrandsUseCase() {
  const brandsRepository = new PrismaBrandsRepository();

  const useCase = new ListBrandsUseCase(brandsRepository);
  return useCase;
}
