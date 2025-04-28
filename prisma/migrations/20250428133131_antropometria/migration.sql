/*
  Warnings:

  - Added the required column `antropometria_data` to the `Antropometria` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Antropometria" ADD COLUMN     "antropometria_data" TIMESTAMP(3) NOT NULL;
