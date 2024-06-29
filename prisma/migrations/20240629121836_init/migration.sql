-- CreateTable
CREATE TABLE `company` (
    `id` VARCHAR(191) NOT NULL,
    `profile` JSON NOT NULL,
    `metadata` JSON NOT NULL,
    `entityId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Company_entityId_key`(`entityId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cv` (
    `id` VARCHAR(191) NOT NULL,
    `job_position` VARCHAR(191) NOT NULL,
    `metadata` JSON NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `CV_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `entity` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `TIN` VARCHAR(191) NULL,
    `hashed_password` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(191) NOT NULL,
    `profile` JSON NOT NULL,
    `metadata` JSON NOT NULL,
    `entityId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_entityId_key`(`entityId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `company` ADD CONSTRAINT `Company_entityId_fkey` FOREIGN KEY (`entityId`) REFERENCES `entity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cv` ADD CONSTRAINT `CV_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `User_entityId_fkey` FOREIGN KEY (`entityId`) REFERENCES `entity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
