-- ========================================
-- Script completo para banco GreenWaysOFC
-- ========================================

DROP DATABASE IF EXISTS `GreenWaysOFC`;
CREATE DATABASE `GreenWaysOFC` DEFAULT CHARACTER SET utf8;
USE `GreenWaysOFC`;

-- -----------------------------------------------------
-- Tabela de usuários
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
    `idUsers` INT(11) NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `senha` VARCHAR(100) NOT NULL,
    `foto` VARCHAR(255) DEFAULT NULL,
    `permissao` ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    `ativo` TINYINT(4) NOT NULL DEFAULT 1,
    PRIMARY KEY (`idUsers`),
    UNIQUE INDEX `email_UNIQUE` (`email` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- -----------------------------------------------------
-- Tabela de posts
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `post` (
    `idPost` VARCHAR(255) NOT NULL,
    `region` VARCHAR(100) NOT NULL,
    `content` VARCHAR(300) NOT NULL,
    `createdAt` DATETIME NOT NULL,
    `User_idUsers` INT(11) NOT NULL,
    `responses` INT(11) DEFAULT NULL,
    PRIMARY KEY (`idPost`),
    CONSTRAINT `fk_post_user`
        FOREIGN KEY (`User_idUsers`) REFERENCES `users` (`idUsers`)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- -----------------------------------------------------
-- Tabela de comentários
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `coments` (
    `idComents` INT(11) NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(300) NOT NULL,
    `createdAt` DATETIME NOT NULL,
    `Users_idUsers` INT(11) NOT NULL,
    `Post_idPost` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`idComents`),
    CONSTRAINT `fk_coments_user`
        FOREIGN KEY (`Users_idUsers`) REFERENCES `users` (`idUsers`)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT `fk_coments_post`
        FOREIGN KEY (`Post_idPost`) REFERENCES `post` (`idPost`)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
