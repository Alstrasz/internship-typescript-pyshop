import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt_payload';
import { JWT } from './constants';


/**
 * Validates JWT bearer token and assigns User to request.user
 *
 * @export
 * @class JwtStrategy
 * @extends {PassportStrategy( Strategy, 'jwt' )}
 */
@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy, 'jwt' ) {
    constructor (
        private users_serivce: UsersService,
    ) {
        super( {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JWT.SECRET,
        } );
    }

    async validate ( payload: JwtPayload ) {
        const user = await this.users_serivce.get_by_id( payload.sub );
        return user;
    }
}
