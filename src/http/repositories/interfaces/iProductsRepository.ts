import { Product, Prisma } from '@prisma/client';

export interface IProductsRepository {
  create(data: Prisma.ProductCreateInput): Promise<Product>;
  findAll(page: number, limit: number, nameFilter?: string): Promise<Product[]>;
  count(nameFilter?: string): Promise<number>;
}
