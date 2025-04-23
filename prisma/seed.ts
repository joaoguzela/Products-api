import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await hash('admin123', 8);
  await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@example.com',
      password_hash: passwordHash,
    },
  });

  await prisma.brand.createMany({
    data: [
      { name: 'Apple' },
      { name: 'Samsung' },
      { name: 'Sony' },
      { name: 'LG' },
    ],
  });

  console.log('🌱 Seed concluído!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
