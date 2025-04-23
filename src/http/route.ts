import { FastifyInstance } from 'fastify';
import { listProducts } from '@/http/controllers/listProducts';
import { createProduct } from '@/http/controllers/createProduct';

export async function productsRoutes(app: FastifyInstance) {
  app.get('/products', listProducts);
  app.post('/products', createProduct);
}
