/*
  Warnings:

  - You are about to drop the column `nutricionista_password` on the `Nutricionista` table. All the data in the column will be lost.
  - You are about to drop the column `paciente_password` on the `Paciente` table. All the data in the column will be lost.
  - Added the required column `nutricionista_senha` to the `Nutricionista` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paciente_senha` to the `Paciente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Nutricionista" DROP COLUMN "nutricionista_password",
ADD COLUMN     "nutricionista_senha" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Paciente" DROP COLUMN "paciente_password",
ADD COLUMN     "paciente_senha" TEXT NOT NULL;
