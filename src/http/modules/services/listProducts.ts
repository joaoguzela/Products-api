import { Product } from '@prisma/client';
import { IProductsRepository } from '@/http/repositories/interfaces/iProductsRepository';

interface ListProductsUseCaseRequest {
  searchTerm?: string;
  page: number;
  limit: number;
}

type ListProductsUseCaseResponse = {
  products: Product[];
  total: number;
};

export class ListProductsUseCase {
  private productsRepository: IProductsRepository;

  constructor(productsRepository: IProductsRepository) {
    this.productsRepository = productsRepository;
  }

  async execute({
    searchTerm = '',
    page = 1,
    limit = 10,
  }: ListProductsUseCaseRequest): Promise<ListProductsUseCaseResponse> {
    const products = await this.productsRepository.findAll(
      page,
      limit,
      searchTerm,
    );

    const total = await this.productsRepository.count(searchTerm);

    return {
      products,
      total,
    };
  }
}
