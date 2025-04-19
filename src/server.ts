import { env } from '@/configs/enviroments';
import { app } from './app';

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log('Server is running on port 3333 🥱');
  });
