/*
  Warnings:

  - The `status` column on the `orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "OrderEnum" AS ENUM ('pending', 'shipped', 'delivered');

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "status",
ADD COLUMN     "status" "OrderEnum" NOT NULL DEFAULT 'pending';
