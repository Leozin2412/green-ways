-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema GreenWaysOFC
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema GreenWaysOFC
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `GreenWaysOFC` DEFAULT CHARACTER SET utf8 ;
USE `GreenWaysOFC` ;

-- -----------------------------------------------------
-- Table `GreenWaysOFC`.`coments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GreenWaysOFC`.`coments` (
  `idComents` INT(11) NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(300) NOT NULL,
  `createdAt` DATE NOT NULL,
  `Users_idUsers` INT(11) NOT NULL,
  `Post_idPost` INT(11) NOT NULL,
  PRIMARY KEY (`idComents`, `Post_idPost`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `GreenWaysOFC`.`post`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GreenWaysOFC`.`post` (
  `idPost` INT(11) NOT NULL AUTO_INCREMENT,
  `region` VARCHAR(100) NOT NULL,
  `content` VARCHAR(300) NOT NULL,
  `createdAt` DATE NOT NULL,
  `Users_idUsers` INT(11) NOT NULL,
  `responses` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`idPost`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `GreenWaysOFC`.`tb_coment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GreenWaysOFC`.`tb_coment` (
  `id_coment` CHAR(10) NOT NULL,
  `conteudo` VARCHAR(300) NOT NULL,
  `tb_usuario_id usuario` CHAR(10) NOT NULL,
  `tb_post_id_post` CHAR(10) NOT NULL,
  `data_coment` CHAR(10) NOT NULL,
  PRIMARY KEY (`id_coment`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `GreenWaysOFC`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GreenWaysOFC`.`users` (
  `idUsers` INT(11) NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `senha` VARCHAR(100) NOT NULL,
  `foto` VARCHAR(255) NULL DEFAULT NULL,
  `permissao` ENUM('user', 'admin') NOT NULL DEFAULT 'user',
  `ativo` TINYINT(4) NOT NULL DEFAULT 1,
  PRIMARY KEY (`idUsers`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  UNIQUE INDEX `foto_UNIQUE` (`foto` ASC)
) ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
