-- CreateTable
CREATE TABLE "Antropometria" (
    "antropometria_id" SERIAL NOT NULL,
    "exame_id" INTEGER NOT NULL,

    CONSTRAINT "Antropometria_pkey" PRIMARY KEY ("antropometria_id")
);

-- CreateTable
CREATE TABLE "DadosBasicosAntropometria" (
    "dadobasico_id" SERIAL NOT NULL,
    "antropometria_id" INTEGER NOT NULL,
    "tipoPaciente" INTEGER NOT NULL,
    "altura" DOUBLE PRECISION NOT NULL,
    "alturaSentado" DOUBLE PRECISION,
    "alturaJoelho" DOUBLE PRECISION,
    "peso" DOUBLE PRECISION NOT NULL,
    "sexo" TEXT,
    "relatorioAnexo" TEXT,
    "dataColeta" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DadosBasicosAntropometria_pkey" PRIMARY KEY ("dadobasico_id")
);

-- CreateTable
CREATE TABLE "Bioimpedancia" (
    "bioimpedancia_id" SERIAL NOT NULL,
    "antropometria_id" INTEGER NOT NULL,
    "percentGordura" DOUBLE PRECISION,
    "percentMassaMagra" DOUBLE PRECISION,
    "massaGorda" DOUBLE PRECISION,
    "massaMagra" DOUBLE PRECISION,
    "pesoOsseo" DOUBLE PRECISION,
    "aguaCorporal" DOUBLE PRECISION,
    "idadeMetabolica" INTEGER,
    "dataColeta" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bioimpedancia_pkey" PRIMARY KEY ("bioimpedancia_id")
);

-- CreateTable
CREATE TABLE "DobraCutanea" (
    "dobracutanea_id" SERIAL NOT NULL,
    "antropometria_id" INTEGER NOT NULL,
    "tricipal" DOUBLE PRECISION,
    "bicipital" DOUBLE PRECISION,
    "subescapular" DOUBLE PRECISION,
    "suprailiaca" DOUBLE PRECISION,
    "abdominal" DOUBLE PRECISION,
    "coxa" DOUBLE PRECISION,
    "peitoral" DOUBLE PRECISION,
    "axiliarMedia" DOUBLE PRECISION,
    "dataColeta" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DobraCutanea_pkey" PRIMARY KEY ("dobracutanea_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Antropometria_exame_id_key" ON "Antropometria"("exame_id");

-- CreateIndex
CREATE UNIQUE INDEX "DadosBasicosAntropometria_antropometria_id_key" ON "DadosBasicosAntropometria"("antropometria_id");

-- CreateIndex
CREATE UNIQUE INDEX "Bioimpedancia_antropometria_id_key" ON "Bioimpedancia"("antropometria_id");

-- CreateIndex
CREATE UNIQUE INDEX "DobraCutanea_antropometria_id_key" ON "DobraCutanea"("antropometria_id");

-- AddForeignKey
ALTER TABLE "Antropometria" ADD CONSTRAINT "Antropometria_exame_id_fkey" FOREIGN KEY ("exame_id") REFERENCES "Exame"("exame_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DadosBasicosAntropometria" ADD CONSTRAINT "DadosBasicosAntropometria_antropometria_id_fkey" FOREIGN KEY ("antropometria_id") REFERENCES "Antropometria"("antropometria_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bioimpedancia" ADD CONSTRAINT "Bioimpedancia_antropometria_id_fkey" FOREIGN KEY ("antropometria_id") REFERENCES "Antropometria"("antropometria_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DobraCutanea" ADD CONSTRAINT "DobraCutanea_antropometria_id_fkey" FOREIGN KEY ("antropometria_id") REFERENCES "Antropometria"("antropometria_id") ON DELETE RESTRICT ON UPDATE CASCADE;
