import { Product, Prisma } from '@prisma/client';
import { IProductsRepository } from '@/http/repositories/interfaces/iProductsRepository';
import { IBrandsRepository } from '@/http/repositories/interfaces/iBrandsRepository';
import { NotFoundError } from '@/http/modules/errors/notFoundError';

interface CreateProductUseCaseRequest {
  name: string;
  price: number;
  description?: string;
  image?: string;
  brandId: string;
}

type CreateProductUseCaseResponse = {
  product: Product;
};

export class CreateProductUseCase {
  private productsRepository: IProductsRepository;

  private brandsRepository: IBrandsRepository;

  constructor(
    productsRepository: IProductsRepository,
    brandsRepository: IBrandsRepository,
  ) {
    this.productsRepository = productsRepository;
    this.brandsRepository = brandsRepository;
  }

  async execute({
    name,
    price,
    description,
    image,
    brandId,
  }: CreateProductUseCaseRequest): Promise<CreateProductUseCaseResponse> {
    const brand = await this.brandsRepository.findById(brandId);
    if (!brand) {
      throw new NotFoundError('Brand');
    }

    const product = await this.productsRepository.create({
      name,
      price,
      description,
      image,
      brandId,
    });

    return { product };
  }
}
