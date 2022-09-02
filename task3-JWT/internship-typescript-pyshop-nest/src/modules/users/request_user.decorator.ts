import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const RequestUser = createParamDecorator(
    ( data: unknown, ctx: ExecutionContext ) => {
        const request = ctx.switchToHttp().getRequest();
        if ( request.user == undefined ) {
            throw new Error( 'request.user undefind' );
        }
        return request.user;
    },
);
