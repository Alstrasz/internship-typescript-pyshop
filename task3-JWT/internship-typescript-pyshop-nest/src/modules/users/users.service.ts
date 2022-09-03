import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update_user.dto';
import { CreateUserInterface } from './interfaces/create_user_interface';

@Injectable()
export class UsersService {
    constructor (
        private prisma_service: PrismaService,
    ) { }

    async get_by_email ( email: string ): Promise<User | null> {
        return this.prisma_service.user.findUnique( {
            where: {
                email,
            },
        } );
    }

    async get_by_id ( id: string ): Promise<User | null> {
        return this.prisma_service.user.findUnique( {
            where: {
                id,
            },
        } );
    }

    async create_user ( user_signup_credentials_dto: CreateUserInterface ): Promise<User> {
        return this.prisma_service.user.create( {
            data: user_signup_credentials_dto,
        } )
            .catch( ( err ) => {
                if ( err instanceof Prisma.PrismaClientKnownRequestError ) {
                    this.prisma_service.default_exception_handler( err, { conflict: true } );
                }
                throw err;
            } );
    }

    async update_user ( id: string, update_user_dto: UpdateUserDto ): Promise<User> {
        return this.prisma_service.user.update( {
            where: {
                id,
            },
            data: update_user_dto,
        } )
            .catch( ( err ) => {
                if ( err instanceof Prisma.PrismaClientKnownRequestError ) {
                    this.prisma_service.default_exception_handler( err, { conflict: true } );
                }
                throw err;
            } );
    }

    async delete_user ( id: string ) {
        await this.prisma_service.user.delete( {
            where: {
                id,
            },
        } );
    }
}
