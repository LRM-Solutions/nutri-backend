/*
  Warnings:

  - The `sexo` column on the `DadosBasicosAntropometria` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `exame_id` to the `GastosEnergeticos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DadosBasicosAntropometria" DROP COLUMN "sexo",
ADD COLUMN     "sexo" INTEGER;

-- AlterTable
ALTER TABLE "GastosEnergeticos" ADD COLUMN     "exame_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "GastosEnergeticos" ADD CONSTRAINT "GastosEnergeticos_exame_id_fkey" FOREIGN KEY ("exame_id") REFERENCES "Exame"("exame_id") ON DELETE CASCADE ON UPDATE CASCADE;
