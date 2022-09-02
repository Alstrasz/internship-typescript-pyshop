-- CreateTable
CREATE TABLE "users" (
    "id" CHAR(36) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(128) NOT NULL,
    "salt" VARCHAR(16) NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "address" VARCHAR(128) NOT NULL,
    "phone" VARCHAR(128) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
