/*
  Warnings:

  - You are about to drop the column `antebraco` on the `Circunferencias` table. All the data in the column will be lost.
  - You are about to drop the column `braco_contraido` on the `Circunferencias` table. All the data in the column will be lost.
  - You are about to drop the column `braco_relaxado` on the `Circunferencias` table. All the data in the column will be lost.
  - You are about to drop the column `coxa_distal` on the `Circunferencias` table. All the data in the column will be lost.
  - You are about to drop the column `coxa_medial` on the `Circunferencias` table. All the data in the column will be lost.
  - You are about to drop the column `coxa_proximal` on the `Circunferencias` table. All the data in the column will be lost.
  - You are about to drop the column `panturrilha` on the `Circunferencias` table. All the data in the column will be lost.
  - You are about to drop the column `torax` on the `Circunferencias` table. All the data in the column will be lost.
  - You are about to drop the `AnamnesePerguntas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AnamnesePerguntas" DROP CONSTRAINT "AnamnesePerguntas_nutricionista_id_fkey";

-- AlterTable
ALTER TABLE "Circunferencias" DROP COLUMN "antebraco",
DROP COLUMN "braco_contraido",
DROP COLUMN "braco_relaxado",
DROP COLUMN "coxa_distal",
DROP COLUMN "coxa_medial",
DROP COLUMN "coxa_proximal",
DROP COLUMN "panturrilha",
DROP COLUMN "torax",
ADD COLUMN     "Antebraco_dir" DOUBLE PRECISION,
ADD COLUMN     "Antebraco_esq" DOUBLE PRECISION,
ADD COLUMN     "Braco_dir_contraido" DOUBLE PRECISION,
ADD COLUMN     "Braco_dir_relaxado" DOUBLE PRECISION,
ADD COLUMN     "Braco_esq_contraido" DOUBLE PRECISION,
ADD COLUMN     "Braco_esq_relaxado" DOUBLE PRECISION,
ADD COLUMN     "coxa_dir" DOUBLE PRECISION,
ADD COLUMN     "coxa_esq" DOUBLE PRECISION,
ADD COLUMN     "coxa_proximal_dir" DOUBLE PRECISION,
ADD COLUMN     "coxa_proximal_esq" DOUBLE PRECISION,
ADD COLUMN     "panturrilha_dir" DOUBLE PRECISION,
ADD COLUMN     "panturrilha_es" DOUBLE PRECISION,
ADD COLUMN     "peitoral" DOUBLE PRECISION,
ADD COLUMN     "punho_dir" DOUBLE PRECISION,
ADD COLUMN     "punho_esq" DOUBLE PRECISION;

-- DropTable
DROP TABLE "AnamnesePerguntas";
