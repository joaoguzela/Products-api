import { Brand, Prisma } from '@prisma/client';

export interface IBrandsRepository {
  create(data: Prisma.BrandCreateInput): Promise<Brand>;
  findAll(): Promise<Brand[]>;
  findById(id: string): Promise<Brand | null>;
}
