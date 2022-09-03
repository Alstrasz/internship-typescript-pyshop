import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiConflictResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { ConflictExceptionDto } from '../../dto/conflict_exception.dto';
import { RequestUser } from '../users/request_user.decorator';
import { AuthService } from './auth.service';
import { AccessTokenDto } from './dto/access_token.dto';
import { UserLoginCredentialsDto } from './dto/user_login_credentials.dto';
import { UserSignupCredentialsDto } from './dto/user_signup_credentials.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags( 'Auth' )
@Controller( '' )
export class AuthController {
    constructor (
        private auth_service: AuthService,
    ) {}

    @ApiOperation( { summary: 'Determines user by email/password pair and issues jwt token' } )
    @UseGuards( LocalAuthGuard )
    @Post( 'login' )
    @HttpCode( 200 )
    @ApiOkResponse( { type: AccessTokenDto } )
    @ApiUnauthorizedResponse()
    async login ( @Body() _user_credentials_dto: UserLoginCredentialsDto, @RequestUser() user: User ) {
        return new AccessTokenDto( this.auth_service.login( user ) );
    }

    @ApiOperation( { summary: 'Creates user by email/password pair and issues jwt token' } )
    @Post( 'signup' )
    @ApiCreatedResponse( { type: AccessTokenDto } )
    @ApiConflictResponse( { type: ConflictExceptionDto } )
    async signup ( @Body() user_signup_credentials_dto: UserSignupCredentialsDto ) {
        return new AccessTokenDto( await this.auth_service.signup( user_signup_credentials_dto ) );
    }

    @ApiOperation( {
        summary: '(supposently) logsout user by invalidating token',
        description: 'Proposed simple jwt bearer auth does not support any robust way of invalidating tokens.' +
            'Access refresh tokens requiered for that. Considering limitations... Just pretending not to track this user anymore -)',
    } )
    @ApiBearerAuth()
    @Post( 'logout' )
    @UseGuards( new JwtAuthGuard() )
    @HttpCode( 200 )
    @ApiOkResponse( { type: AccessTokenDto } )
    async logout () {
        // Simple JWT bearer auth does not support any robust logout. Access refresh tokens requiered for that.
        // Considering limitations... Just pretending not to track this user anymore -)
    }
}
