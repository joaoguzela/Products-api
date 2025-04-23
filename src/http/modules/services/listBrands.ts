import { Brand } from '@prisma/client';
import { IBrandsRepository } from '@/http/repositories/interfaces/iBrandsRepository';

type ListBrandsUseCaseResponse = {
  brands: Brand[];
};

export class ListBrandsUseCase {
  private brandsRepository: IBrandsRepository;

  constructor(brandsRepository: IBrandsRepository) {
    this.brandsRepository = brandsRepository;
  }

  async execute(): Promise<ListBrandsUseCaseResponse> {
    const brands = await this.brandsRepository.findAll();
    return { brands };
  }
}
