import { Brand } from '@prisma/client';
import { prisma } from '@/providers/prisma';
import { IBrandsRepository } from '../repositories/interfaces/iBrandsRepository';

export class PrismaBrandsRepository implements IBrandsRepository {
  async findAll(): Promise<Brand[]> {
    return prisma.brand.findMany();
  }

  async findById(id: string): Promise<Brand | null> {
    return prisma.brand.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: Brand): Promise<Brand> {
    return prisma.brand.create({ data });
  }
}
