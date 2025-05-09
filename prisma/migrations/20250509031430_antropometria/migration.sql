-- CreateTable
CREATE TABLE "Circunferencias" (
    "circunferencias_id" SERIAL NOT NULL,
    "antropometria_id" INTEGER NOT NULL,
    "pescoco" DOUBLE PRECISION,
    "torax" DOUBLE PRECISION,
    "ombro" DOUBLE PRECISION,
    "quadril" DOUBLE PRECISION,
    "braco_relaxado" DOUBLE PRECISION,
    "braco_contraido" DOUBLE PRECISION,
    "cintura" DOUBLE PRECISION,
    "abdomen" DOUBLE PRECISION,
    "antebraco" DOUBLE PRECISION,
    "coxa_proximal" DOUBLE PRECISION,
    "coxa_medial" DOUBLE PRECISION,
    "coxa_distal" DOUBLE PRECISION,
    "panturrilha" DOUBLE PRECISION,

    CONSTRAINT "Circunferencias_pkey" PRIMARY KEY ("circunferencias_id")
);

-- CreateTable
CREATE TABLE "DiametroOsseo" (
    "diametroOsseo_id" SERIAL NOT NULL,
    "antropometria_id" INTEGER NOT NULL,
    "umero" DOUBLE PRECISION,
    "punho" DOUBLE PRECISION,
    "femur" DOUBLE PRECISION,
    "tornozelo" DOUBLE PRECISION,
    "torax" DOUBLE PRECISION,

    CONSTRAINT "DiametroOsseo_pkey" PRIMARY KEY ("diametroOsseo_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Circunferencias_antropometria_id_key" ON "Circunferencias"("antropometria_id");

-- CreateIndex
CREATE UNIQUE INDEX "DiametroOsseo_antropometria_id_key" ON "DiametroOsseo"("antropometria_id");

-- AddForeignKey
ALTER TABLE "Circunferencias" ADD CONSTRAINT "Circunferencias_antropometria_id_fkey" FOREIGN KEY ("antropometria_id") REFERENCES "Antropometria"("antropometria_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiametroOsseo" ADD CONSTRAINT "DiametroOsseo_antropometria_id_fkey" FOREIGN KEY ("antropometria_id") REFERENCES "Antropometria"("antropometria_id") ON DELETE CASCADE ON UPDATE CASCADE;
