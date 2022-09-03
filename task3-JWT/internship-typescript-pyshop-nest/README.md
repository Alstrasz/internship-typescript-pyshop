# About

Project containing JWT bearer auth and basic CRUD for User using rest api. It is server part.

Project deployed on heroku (first access can be slow due to heroku storing containers in sleep mode): 
- https://internship-typescript-pyshop-n.herokuapp.com/api

Workflow:
- User can login or signup using email and password
- User can update his data(email, name, address, phone, about)
- User can delete account
- User (kind of) can logout

# Used technologies


- NodeJS
- NestJS
- Postgres
- Prisma
- Swagger
- Passport


# How to run

package.json pretty self explanatory

# How to test

- ```npm i```
- ```npm run test:local```

It will launch docker compose for loading database. Container will be downed afterward

OR

- ```npm run test```

If you have postgres instance running already. Pass url by DATABASE_URL env var or .env.test file
