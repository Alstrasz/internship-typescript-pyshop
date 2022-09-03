import { INestApplication, Inject, Injectable } from '@nestjs/common';
import { AuthService } from '../../modules/auth/auth.service';
import { TEST_HELPER_MODULE_OPTIONS_NAME } from './constants';
import { TestHelperModuleOptions } from './interfaces/test_helper_module_options';
import { UsersService } from '../../modules/users/users.service';
import { TestingModule } from '@nestjs/testing';
import { apply_middleware } from '../apply_middleware';
import { UserSignupCredentialsDto } from 'src/modules/auth/dto/user_signup_credentials.dto';
import { UpdateUserDto } from 'src/modules/users/dto/update_user.dto';

@Injectable()
export class TestHelperService {
    private unique_name: string;
    private unique_id = {
        user: 0,
        tag: 0,
    };

    constructor (
        @Inject( TEST_HELPER_MODULE_OPTIONS_NAME ) private options: TestHelperModuleOptions,
        private auth_service: AuthService,
        private users_service: UsersService,
    ) {
        this.unique_name = options?.test_bed_name || 'undefined';
    }

    get_unique_user_signup_credentials_dto (): UserSignupCredentialsDto {
        this.unique_id.user += 1;
        const unique_string = `${this.unique_name}${this.unique_id.user}`;
        return {
            email: `${unique_string}@a.com`,
            name: `${unique_string}`,
            password: `1aA${unique_string}`,
        };
    }

    get_unique_update_user_dto (): UpdateUserDto {
        this.unique_id.user += 1;
        const unique_string = `${this.unique_name}${this.unique_id.user}`;
        return {
            email: `${unique_string}@a.com`,
            name: `${unique_string}`,
            about: `${unique_string}`,
            address: `${unique_string}`,
            phone: `${unique_string}`,
        };
    }

    async sign_in_unique_user () {
        const user_signup_credentials_dto = this.get_unique_user_signup_credentials_dto();
        const token = await this.auth_service.signup( user_signup_credentials_dto );
        return { user_signup_credentials_dto, token };
    }

    async create_application ( module: TestingModule ): Promise<INestApplication> {
        const app = module.createNestApplication();
        apply_middleware( app );
        await app.init();
        return app;
    }
}
