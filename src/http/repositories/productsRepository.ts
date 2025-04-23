import { Product, Prisma } from '@prisma/client';
import { prisma } from '@/providers/prisma';
import { IProductsRepository } from '../repositories/interfaces/iProductsRepository';

export class PrismaProductsRepository implements IProductsRepository {
  async create(data: Prisma.ProductCreateInput): Promise<Product> {
    return prisma.product.create({ data });
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    nameFilter?: string,
  ): Promise<Product[]> {
    return prisma.product.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: nameFilter
        ? {
            OR: [
              { name: { contains: nameFilter, mode: 'insensitive' } },
              { description: { contains: nameFilter, mode: 'insensitive' } },
              {
                brand: {
                  name: { contains: nameFilter, mode: 'insensitive' },
                },
              },
            ],
          }
        : {},
      include: {
        brand: true,
      },
    });
  }

  async count(nameFilter?: string): Promise<number> {
    return prisma.product.count({
      where: nameFilter
        ? { name: { contains: nameFilter, mode: 'insensitive' } }
        : {},
    });
  }
}
