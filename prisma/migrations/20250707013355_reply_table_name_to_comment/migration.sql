/*
  Warnings:

  - You are about to drop the `Reply` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Reply" DROP CONSTRAINT "Reply_curationId_fkey";

-- DropTable
DROP TABLE "Reply";

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "nickname" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "curationId" INTEGER NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Comment_curationId_key" ON "Comment"("curationId");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_curationId_fkey" FOREIGN KEY ("curationId") REFERENCES "Curation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
