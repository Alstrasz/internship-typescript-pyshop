import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class AccessTokenDto {
    @ApiProperty()
    @Expose()
        token: string;

    constructor ( token: string ) {
        this.token = token;
    }
}
