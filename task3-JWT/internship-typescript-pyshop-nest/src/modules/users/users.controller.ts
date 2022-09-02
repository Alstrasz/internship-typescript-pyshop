import { Body, Controller, Delete, Get, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiConflictResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { ConflictExceptionDto } from '../../dto/conflict_exception.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update_user.dto';
import { UserDto } from './dto/user.dto';
import { RequestUser } from './request_user.decorator';
import { UsersService } from './users.service';

@ApiTags( 'User' )
@Controller( 'user' )
export class UsersController {
    constructor ( private users_service: UsersService ) { }

    @ApiOperation( { summary: 'Return current user\'s data and assigned tags' } )
    @ApiBearerAuth()
    @Get( '' )
    @UseGuards( new JwtAuthGuard() )
    @ApiOkResponse( { type: UserDto } )
    get_me ( @RequestUser() user: User ): UserDto {
        return new UserDto( user );
    }

    @ApiOperation( { summary: 'Update current user\'s data' } )
    @ApiBearerAuth()
    @Put( '' )
    @UseGuards( new JwtAuthGuard() )
    @ApiOkResponse( { type: UserDto } )
    @ApiConflictResponse( { type: ConflictExceptionDto } )
    async update_me ( @Body() update_user_dto: UpdateUserDto, @RequestUser() user: User ): Promise<UserDto> {
        return new UserDto( await this.users_service.update_user( user.id, update_user_dto ) );
    }

    @ApiOperation( { summary: 'Delete current user\'s data and all created tags' } )
    @ApiBearerAuth()
    @Delete( '' )
    @UseGuards( new JwtAuthGuard() )
    @ApiOkResponse()
    async delete_me ( @RequestUser() user: User ) {
        await this.users_service.delete_user( user.id );
    }
}
