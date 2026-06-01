-- CreateTable
CREATE TABLE "RoadmapItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "titleTr" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "descriptionTr" TEXT NOT NULL,
    "quarter" TEXT NOT NULL,
    "quarterTr" TEXT NOT NULL,
    "targetDate" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PLANNED',
    "bgGradient" TEXT NOT NULL DEFAULT 'from-orange-500 to-amber-500',
    "glowColor" TEXT NOT NULL DEFAULT 'rgba(249, 115, 22, 0.4)',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
