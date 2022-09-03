import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as _ from 'lodash';
import * as request from 'supertest';
import { TestHelperModule } from '../../helpers/test_helper/test_helper.module';
import { TestHelperService } from '../../helpers/test_helper/test_helper.service';
import { UserSignupCredentialsDto } from '../auth/dto/user_signup_credentials.dto';
import { UserDto } from './dto/user.dto';
import { UsersController } from './users.controller';
import { UsersModule } from './users.module';
import { UsersService } from './users.service';

describe( 'UsersController', () => {
    let controller: UsersController;
    let service: UsersService;
    let app: INestApplication;
    let user: {
        user_signup_credentials_dto: UserSignupCredentialsDto;
        token: string;
    };

    let test_helper_service: TestHelperService;
    beforeAll( async () => {
        const test_helper_module: TestingModule = await Test.createTestingModule( {
            imports: [TestHelperModule.register( { test_bed_name: 'UsersController' } )],
        } ).compile();

        test_helper_service = test_helper_module.get<TestHelperService>( TestHelperService );
    } );

    beforeEach( async () => {
        const module: TestingModule = await Test.createTestingModule( {
            imports: [UsersModule],
        } ).compile();

        controller = module.get<UsersController>( UsersController );
        service = module.get<UsersService>( UsersService );
        user = await test_helper_service.sign_in_unique_user();
        app = await test_helper_service.create_application( module );
    } );

    it( 'should be defined', () => {
        expect( controller ).toBeDefined();
    } );

    it( 'should jwt guard properly', async () => {
        await request( app.getHttpServer() )
            .get( '/user' )
            .expect( 401 );

        return request( app.getHttpServer() )
            .get( '/user' )
            .auth( user.token, { type: 'bearer' } )
            .expect( 200 );
    } );

    it( 'should get user properly', async () => {
        return request( app.getHttpServer() )
            .get( '/user' )
            .auth( user.token, { type: 'bearer' } )
            .expect( 200 )
            .expect( ( res ) => {
                const body: UserDto = res.body;
                expect( body.email ).toEqual( user.user_signup_credentials_dto.email );
                expect( body.name ).toEqual( user.user_signup_credentials_dto.name );
            } );
    } );

    it( 'should update user properly', async () => {
        const dto = test_helper_service.get_unique_update_user_dto();
        const dto_2 = test_helper_service.get_unique_update_user_dto();

        await request( app.getHttpServer() )
            .put( '/user' )
            .auth( user.token, { type: 'bearer' } )
            .send( dto_2 )
            .expect( 200 )
            .expect( ( res ) => {
                const body: UserDto = res.body;
                expect( body.email ).toEqual( dto_2.email );
                expect( body.name ).toEqual( dto_2.name );
                expect( body.about ).toEqual( dto_2.about );
                expect( body.address ).toEqual( dto_2.address );
                expect( body.phone ).toEqual( dto_2.phone );
            } );

        await request( app.getHttpServer() )
            .put( '/user' )
            .auth( user.token, { type: 'bearer' } )
            .send( {
                email: dto.email,
            } )
            .expect( 200 )
            .expect( ( res ) => {
                const body: UserDto = res.body;
                expect( body.email ).toEqual( dto.email );
                expect( body.name ).toEqual( dto_2.name );
            } );

        await request( app.getHttpServer() )
            .put( '/user' )
            .auth( user.token, { type: 'bearer' } )
            .send( {
                name: dto.name,
            } )
            .expect( 200 )
            .expect( ( res ) => {
                const body: UserDto = res.body;
                expect( body.email ).toEqual( dto.email );
                expect( body.name ).toEqual( dto.name );
                expect( body.about ).toEqual( dto_2.about );
                expect( body.address ).toEqual( dto_2.address );
                expect( body.phone ).toEqual( dto_2.phone );
            } );

        await request( app.getHttpServer() )
            .put( '/user' )
            .auth( user.token, { type: 'bearer' } )
            .send( {
                about: dto.about,
            } )
            .expect( 200 )
            .expect( ( res ) => {
                const body: UserDto = res.body;
                expect( body.email ).toEqual( dto.email );
                expect( body.name ).toEqual( dto.name );
                expect( body.about ).toEqual( dto.about );
                expect( body.address ).toEqual( dto_2.address );
                expect( body.phone ).toEqual( dto_2.phone );
            } );

        await request( app.getHttpServer() )
            .put( '/user' )
            .auth( user.token, { type: 'bearer' } )
            .send( {
                address: dto.address,
            } )
            .expect( 200 )
            .expect( ( res ) => {
                const body: UserDto = res.body;
                expect( body.email ).toEqual( dto.email );
                expect( body.name ).toEqual( dto.name );
                expect( body.about ).toEqual( dto.about );
                expect( body.address ).toEqual( dto.address );
                expect( body.phone ).toEqual( dto_2.phone );
            } );

        await request( app.getHttpServer() )
            .put( '/user' )
            .auth( user.token, { type: 'bearer' } )
            .send( {
                phone: dto.phone,
            } )
            .expect( 200 )
            .expect( ( res ) => {
                const body: UserDto = res.body;
                expect( body.email ).toEqual( dto.email );
                expect( body.name ).toEqual( dto.name );
                expect( body.about ).toEqual( dto.about );
                expect( body.address ).toEqual( dto.address );
                expect( body.phone ).toEqual( dto.phone );
            } );

        return request( app.getHttpServer() )
            .get( '/user' )
            .auth( user.token, { type: 'bearer' } )
            .expect( 200 )
            .expect( ( res ) => {
                const body: UserDto = res.body;
                expect( body.email ).toEqual( dto.email );
                expect( body.name ).toEqual( dto.name );
                expect( body.about ).toEqual( dto.about );
                expect( body.address ).toEqual( dto.address );
                expect( body.phone ).toEqual( dto.phone );
            } );
    } );

    it( 'should enforce unique on update', async () => {
        const data = await test_helper_service.sign_in_unique_user();

        await request( app.getHttpServer() )
            .put( '/user' )
            .auth( user.token, { type: 'bearer' } )
            .send( {
                email: data.user_signup_credentials_dto.email,
            } )
            .expect( 409 );
    } );

    it( 'should delete properly', async () => {
        await request( app.getHttpServer() )
            .delete( '/user' )
            .auth( user.token, { type: 'bearer' } )
            .expect( 200 );

        expect( await service.get_by_email( user.user_signup_credentials_dto.email ) ).toBeNull();

        return request( app.getHttpServer() )
            .get( '/user' )
            .auth( user.token, { type: 'bearer' } )
            .expect( 401 );
    } );
} );
