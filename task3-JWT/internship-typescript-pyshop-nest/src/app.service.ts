import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHello (): string {
        // eslint-disable-next-line max-len
        return `You seems to be lost. Maybe you should look at github of this project: https://github.com/Alstrasz/internship-typescript-pyshop/tree/master/task3-JWT. Or at swagger at /api endpoint. Or at frontend ${process.env.FRONTEND_URL || 'https://github.com/Alstrasz/internship-typescript-pyshop/tree/master/task3-JWT/internship-typescript-pyshop-quasar'}`;
    }
}
