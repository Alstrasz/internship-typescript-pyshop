import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UserSignupCredentialsDto {
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
        email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
        name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength( 32 )
    @MinLength( 8 )
        password: string;
}
