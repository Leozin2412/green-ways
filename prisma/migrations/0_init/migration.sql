-- CreateTable
CREATE TABLE `coments` (
    `idComents` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(300) NOT NULL,
    `createdAt` DATE NOT NULL,
    `Users_id` INTEGER NOT NULL,
    `Post_idPost` INTEGER NOT NULL,

    INDEX `fk_coments_post`(`Post_idPost`),
    INDEX `fk_coments_user`(`Users_id`),
    PRIMARY KEY (`idComents`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `post` (
    `idPost` INTEGER NOT NULL AUTO_INCREMENT,
    `region` VARCHAR(100) NOT NULL,
    `content` VARCHAR(300) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `Users_id` INTEGER NOT NULL,

    INDEX `fk_post_user`(`Users_id`),
    PRIMARY KEY (`idPost`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `responses` (
    `idResponse` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(300) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `Users_id` INTEGER NOT NULL,
    `Post_idPost` INTEGER NOT NULL,

    INDEX `fk_responses_post1`(`Post_idPost`),
    INDEX `fk_responses_users1`(`Users_id`),
    PRIMARY KEY (`idResponse`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `senha` VARCHAR(100) NOT NULL,
    `foto` VARCHAR(255) NULL,
    `acesso` ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    `ativo` TINYINT NOT NULL DEFAULT 1,

    UNIQUE INDEX `email_UNIQUE`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `coments` ADD CONSTRAINT `fk_coments_post` FOREIGN KEY (`Post_idPost`) REFERENCES `post`(`idPost`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `coments` ADD CONSTRAINT `fk_coments_user` FOREIGN KEY (`Users_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `post` ADD CONSTRAINT `fk_post_user` FOREIGN KEY (`Users_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `responses` ADD CONSTRAINT `fk_responses_post1` FOREIGN KEY (`Post_idPost`) REFERENCES `post`(`idPost`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `responses` ADD CONSTRAINT `fk_responses_users1` FOREIGN KEY (`Users_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

