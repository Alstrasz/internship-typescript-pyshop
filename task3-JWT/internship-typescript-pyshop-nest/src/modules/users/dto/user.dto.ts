import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';
import * as _ from 'lodash';

@Exclude()
export class UserDto implements Omit<User, 'password' | 'salt'> {
    @ApiProperty()
    @Expose()
        id: string;

    @ApiProperty()
    @Expose()
        email: string;

    @ApiProperty()
    @Expose()
        name: string;

    @ApiProperty()
    @Expose()
        address: string;

    @ApiProperty()
    @Expose()
        phone: string;

    @ApiProperty()
    @Expose()
        about: string;

    constructor ( data: User ) {
        Object.assign( this, data );
    }
}
