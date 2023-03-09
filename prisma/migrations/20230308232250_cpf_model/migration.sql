-- CreateTable
CREATE TABLE "cpf" (
    "id" UUID NOT NULL,
    "cpf" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,

    CONSTRAINT "cpf_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cpf_cpf_key" ON "cpf"("cpf");
