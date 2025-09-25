/*
  Warnings:

  - You are about to drop the `responses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `responses` DROP FOREIGN KEY `fk_responses_post1`;

-- DropForeignKey
ALTER TABLE `responses` DROP FOREIGN KEY `fk_responses_users1`;

-- AlterTable
ALTER TABLE `coments` MODIFY `createdAt` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- DropTable
DROP TABLE `responses`;
