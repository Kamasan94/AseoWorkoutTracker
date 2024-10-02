/*
  Warnings:

  - You are about to drop the column `weoghted_average_watts` on the `Workout` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "weoghted_average_watts",
ADD COLUMN     "weighted_average_watts" DOUBLE PRECISION;
