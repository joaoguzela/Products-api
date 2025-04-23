import { User } from '@prisma/client';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { InvalidCredentialsError } from '../errors/invalidCredentialsError';
import { IUsersRepository } from '@/http/repositories/interfaces/iUsersRepository';

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}
type AuthenticateUseCaseResponse = {
  user: User;
  token: string;
};

export class AuthenticateUseCase {
  private userRepository: IUsersRepository;

  constructor(userRepository: IUsersRepository) {
    this.userRepository = userRepository;
  }

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new InvalidCredentialsError();
    }
    const doesPasswordMatches = await compare(password, user.password_hash);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }
    const token = sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET_KEY || 'your-secret-key',
      { expiresIn: '1h' },
    );

    return {
      user,
      token,
    };
  }
}
