-- CreateTable
CREATE TABLE "Nutricionista" (
    "nutricionista_id" SERIAL NOT NULL,
    "nutricionista_nome" TEXT NOT NULL,
    "nutricionista_cpf" TEXT NOT NULL,
    "nutricionista_email" TEXT NOT NULL,
    "nutricionista_password" TEXT NOT NULL,

    CONSTRAINT "Nutricionista_pkey" PRIMARY KEY ("nutricionista_id")
);

-- CreateTable
CREATE TABLE "Paciente" (
    "paciente_id" SERIAL NOT NULL,
    "paciente_nome" TEXT NOT NULL,
    "paciente_cpf" TEXT NOT NULL,
    "paciente_email" TEXT NOT NULL,
    "paciente_password" TEXT NOT NULL,
    "nutricionista_id" INTEGER NOT NULL,

    CONSTRAINT "Paciente_pkey" PRIMARY KEY ("paciente_id")
);

-- CreateTable
CREATE TABLE "Plano" (
    "plano_id" SERIAL NOT NULL,
    "plano_descricao" TEXT NOT NULL,

    CONSTRAINT "Plano_pkey" PRIMARY KEY ("plano_id")
);

-- CreateTable
CREATE TABLE "Assinatura" (
    "assinatura_id" SERIAL NOT NULL,
    "nutricionista_id" INTEGER NOT NULL,
    "plano_id" INTEGER NOT NULL,
    "assinatura_data_inicio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Assinatura_pkey" PRIMARY KEY ("assinatura_id")
);

-- CreateTable
CREATE TABLE "Exame" (
    "exame_id" SERIAL NOT NULL,
    "exame_descricao" TEXT NOT NULL,
    "exame_data" TIMESTAMP(3) NOT NULL,
    "nutricionista_id" INTEGER NOT NULL,
    "paciente_id" INTEGER NOT NULL,

    CONSTRAINT "Exame_pkey" PRIMARY KEY ("exame_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Nutricionista_nutricionista_cpf_key" ON "Nutricionista"("nutricionista_cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Nutricionista_nutricionista_email_key" ON "Nutricionista"("nutricionista_email");

-- CreateIndex
CREATE UNIQUE INDEX "Paciente_paciente_cpf_key" ON "Paciente"("paciente_cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Paciente_paciente_email_key" ON "Paciente"("paciente_email");

-- AddForeignKey
ALTER TABLE "Paciente" ADD CONSTRAINT "Paciente_nutricionista_id_fkey" FOREIGN KEY ("nutricionista_id") REFERENCES "Nutricionista"("nutricionista_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assinatura" ADD CONSTRAINT "Assinatura_nutricionista_id_fkey" FOREIGN KEY ("nutricionista_id") REFERENCES "Nutricionista"("nutricionista_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assinatura" ADD CONSTRAINT "Assinatura_plano_id_fkey" FOREIGN KEY ("plano_id") REFERENCES "Plano"("plano_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exame" ADD CONSTRAINT "Exame_nutricionista_id_fkey" FOREIGN KEY ("nutricionista_id") REFERENCES "Nutricionista"("nutricionista_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exame" ADD CONSTRAINT "Exame_paciente_id_fkey" FOREIGN KEY ("paciente_id") REFERENCES "Paciente"("paciente_id") ON DELETE RESTRICT ON UPDATE CASCADE;
