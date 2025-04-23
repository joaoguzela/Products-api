import { AuthenticateUseCase } from '@/http/modules/services/autheticate';
import { PrismaUsersRepository } from '@/http/repositories/usersRespository';

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const authenticateUseCase = new AuthenticateUseCase(usersRepository);
  return authenticateUseCase;
}
