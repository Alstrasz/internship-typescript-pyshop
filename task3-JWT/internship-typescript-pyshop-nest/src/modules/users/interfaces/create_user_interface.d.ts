import { User } from '@prisma/client';

export type CreateUserInterface = Pick<User, 'name' | 'email' | 'password' | 'salt'>
