# About

Project containing JWT bearer auth and basic CRUD for User using rest api. Contains server and a client.

Project deployed on heroku (first access can be slow due to heroku storing containers in sleep mode): [not yet]

Workflow:
- User can login or signup using email and password
- User can update his data(email, name, address, phone, about)
- User can delete account
- User (kind of) can logout

Project broken into two pieces:

- [backend](./internship-typescript-pyshop-nest/) - done using NestJS and Postgres. Contins swagger for api reference. Has integration tests and they are exectued automatically using GitHub Actions
- [frontend](./internship-typescript-pyshop-quasar/) - done using Quasar

# Used technologies

### Backend:

- NodeJS
- NestJS
- Postgres
- Prisma
- Swagger
- Passport

### Frontend:

- Vue
- Quasar
- Axios

# How to run

## For dev

### Using docker compose:

- ```docker-compose up```

Backend available at localhost:3000

Swagger available at localhost:3000/api

Postgres available at localhost:5432

Frontend available at localhost:4200

## For prod

No need

Project deployed on heroku (first access can be slow due to heroku storing containers in sleep mode): [not yet]

If you really want: either edit dev docker-compose file or install, build and run back and front. Althogh passing proper settings can be tedios

# Ui screenshots

### Sign up page

![Alt text](screenshots/signup.png?raw=true "Sign up page")

### Edit profile page

![Alt text](screenshots/edit_profile.png?raw=true "Edit profile page")
