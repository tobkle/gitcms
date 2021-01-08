/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[repository]` on the table `sites`. If there are existing duplicate values, the migration will fail.
  - Added the required column `repository` to the `sites` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('CREATED', 'LIVE');

-- DropIndex
DROP INDEX "sites.url_unique";

-- AlterTable
ALTER TABLE "sites" ADD COLUMN     "repository" TEXT NOT NULL,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT E'CREATED';

-- CreateTable
CREATE TABLE "maintainers" (
    "site_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "role" "Role" NOT NULL DEFAULT E'EDITOR',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "maintainers.site_id_user_id_unique" ON "maintainers"("site_id", "user_id");

-- CreateIndex
CREATE INDEX "maintainerSiteId" ON "maintainers"("site_id");

-- CreateIndex
CREATE INDEX "maintainerUserId" ON "maintainers"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "sites.repository_unique" ON "sites"("repository");

-- AddForeignKey
ALTER TABLE "maintainers" ADD FOREIGN KEY("site_id")REFERENCES "sites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintainers" ADD FOREIGN KEY("user_id")REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sites" ADD FOREIGN KEY("owner_id")REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
