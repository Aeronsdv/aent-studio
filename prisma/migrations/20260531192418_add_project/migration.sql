-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "titleTr" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "categoryTr" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "descTr" TEXT NOT NULL,
    "coverImage" TEXT,
    "bgGradient" TEXT NOT NULL DEFAULT 'from-blue-600 via-indigo-500 to-purple-600',
    "glowColor" TEXT NOT NULL DEFAULT 'rgba(59, 130, 246, 0.4)',
    "demoUrl" TEXT,
    "githubUrl" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
