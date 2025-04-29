-- DropForeignKey
ALTER TABLE "Bioimpedancia" DROP CONSTRAINT "Bioimpedancia_antropometria_id_fkey";

-- DropForeignKey
ALTER TABLE "DadosBasicosAntropometria" DROP CONSTRAINT "DadosBasicosAntropometria_antropometria_id_fkey";

-- DropForeignKey
ALTER TABLE "DobraCutanea" DROP CONSTRAINT "DobraCutanea_antropometria_id_fkey";

-- CreateTable
CREATE TABLE "AnamnesePerguntas" (
    "anamnesePerguntas_id" SERIAL NOT NULL,
    "nutricionista_id" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "conteudo" TEXT,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnamnesePerguntas_pkey" PRIMARY KEY ("anamnesePerguntas_id")
);

-- CreateTable
CREATE TABLE "Anamnese" (
    "anamnese_id" SERIAL NOT NULL,
    "exame_id" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "conteudo" TEXT,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Anamnese_pkey" PRIMARY KEY ("anamnese_id")
);

-- CreateTable
CREATE TABLE "GastosEnergeticos" (
    "gasto_energetico_id" SERIAL NOT NULL,
    "fator_atividade" INTEGER NOT NULL,
    "tmb" DOUBLE PRECISION NOT NULL,
    "get" DOUBLE PRECISION NOT NULL,
    "ingestao_recomendada" DOUBLE PRECISION NOT NULL,
    "adicionais_energeticos" DOUBLE PRECISION,
    "observacoes" TEXT,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GastosEnergeticos_pkey" PRIMARY KEY ("gasto_energetico_id")
);

-- AddForeignKey
ALTER TABLE "DadosBasicosAntropometria" ADD CONSTRAINT "DadosBasicosAntropometria_antropometria_id_fkey" FOREIGN KEY ("antropometria_id") REFERENCES "Antropometria"("antropometria_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bioimpedancia" ADD CONSTRAINT "Bioimpedancia_antropometria_id_fkey" FOREIGN KEY ("antropometria_id") REFERENCES "Antropometria"("antropometria_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DobraCutanea" ADD CONSTRAINT "DobraCutanea_antropometria_id_fkey" FOREIGN KEY ("antropometria_id") REFERENCES "Antropometria"("antropometria_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnamnesePerguntas" ADD CONSTRAINT "AnamnesePerguntas_nutricionista_id_fkey" FOREIGN KEY ("nutricionista_id") REFERENCES "Nutricionista"("nutricionista_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anamnese" ADD CONSTRAINT "Anamnese_exame_id_fkey" FOREIGN KEY ("exame_id") REFERENCES "Exame"("exame_id") ON DELETE CASCADE ON UPDATE CASCADE;
