/*
  Warnings:

  - You are about to drop the column `amount` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[stripedId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `stripedId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAmount` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "amount",
DROP COLUMN "quantity",
DROP COLUMN "status",
ADD COLUMN     "stripedId" TEXT NOT NULL,
ADD COLUMN     "totalAmount" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Order_stripedId_key" ON "Order"("stripedId");
