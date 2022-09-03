import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HmacSHA512 } from 'crypto-js';
import { UsersService } from '../users/users.service';
import { lib as crypto_lib } from 'crypto-js';
import { UserLoginCredentialsDto } from './dto/user_login_credentials.dto';
import { User } from '@prisma/client';
import { JwtPayload } from './interfaces/jwt_payload';
import { UserSignupCredentialsDto } from './dto/user_signup_credentials.dto';
import { CreateUserInterface } from '../users/interfaces/create_user_interface';

@Injectable()
export class AuthService {
    constructor (
        private users_service: UsersService,
        private jwt_service: JwtService,
    ) { }

    private sha512 ( password: string, salt: string ) {
        return { salt, hash: HmacSHA512( password, salt ).toString() };
    }

    private create_hash_salt ( password: string ) {
        return this.sha512(
            password,
            crypto_lib.WordArray.random( 32 ).toString().slice( 0, 16 ),
        );
    }

    private validate_password ( password: string, hash: string, salt: string ) {
        return hash === this.sha512( password, salt ).hash;
    }

    async validate_user ( user_login_credentials_dto: UserLoginCredentialsDto ): Promise<User | null> {
        return this.users_service.get_by_email( user_login_credentials_dto.email )
            .then( ( user: User ) => {
                if ( user === null ) {
                    throw new UnauthorizedException( { description: 'Email of password doesn\'t match' } );
                }
                if ( this.validate_password( user_login_credentials_dto.password, user.password, user.salt ) ) {
                    return user;
                }
                return null;
            } );
    }

    /**
     * Issues JWT token
     *
     * @param {User} user
     * @return {*}
     * @memberof AuthService
     */
    login ( user: User ): string {
        const payload: JwtPayload = { username: user.name, sub: user.id };
        return this.jwt_service.sign( payload );
    }

    verify_token ( token: string ) {
        return this.jwt_service.verify( token );
    }

    decode_token ( token: string ) {
        return this.jwt_service.decode( token );
    }

    /**
     * Creates user and issues JWT token
     *
     * @param {UserSignupCredentialsDto} user_signup_credentials_dto
     * @return {*}  {string}
     * @memberof AuthService
     */
    async signup ( user_signup_credentials_dto: UserSignupCredentialsDto ): Promise<string> {
        const { hash, salt } = this.create_hash_salt( user_signup_credentials_dto.password );

        const user_data: CreateUserInterface = {
            email: user_signup_credentials_dto.email,
            name: user_signup_credentials_dto.name,
            password: hash,
            salt: salt,
        };

        const user = await this.users_service.create_user( user_data );

        return this.login( user );
    }
}
