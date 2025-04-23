import { FastifyInstance } from 'fastify';
import { listProducts } from '@/http/controllers/listProducts';
import { createProduct } from '@/http/controllers/createProduct';
import { listBrands } from '@/http/controllers/listBrand';
import { authenticate } from '@/http/controllers/authenticate';

export async function appRoutes(app: FastifyInstance) {
  app.get('/products', listProducts);
  app.post('/products', createProduct);
  app.get('/brands', listBrands);
  app.post('/login', authenticate);
}
