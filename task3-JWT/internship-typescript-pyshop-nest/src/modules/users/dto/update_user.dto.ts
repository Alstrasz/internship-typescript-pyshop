import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';


export class UpdateUserDto implements Partial<User> {
    @ApiProperty( { required: false } )
    @IsOptional()
    @IsEmail()
    @MaxLength( 100 )
        email?: string;

    @ApiProperty( { required: false } )
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MaxLength( 40 )
        name?: string;

    @ApiProperty( { required: false } )
    @IsOptional()
    @IsString()
    @MaxLength( 256 )
        about?: string;

    @ApiProperty( { required: false } )
    @IsOptional()
    @IsString()
    @MaxLength( 128 )
        address?: string;

    @ApiProperty( { required: false } )
    @IsOptional()
    @IsString()
    @MaxLength( 16 )
        phone?: string;
}
