-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';


-- -----------------------------------------------------
-- Schema GreenWaysOFC
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `GreenWaysOFC` DEFAULT CHARACTER SET utf8 ;
USE `GreenWaysOFC` ;

-- -----------------------------------------------------
-- Table `GreenWaysOFC`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GreenWaysOFC`.`users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `senha` VARCHAR(100) NOT NULL,
  `foto` VARCHAR(255) NULL DEFAULT NULL,
  `acesso` ENUM('user', 'admin') NOT NULL DEFAULT 'user',
  `ativo` TINYINT(4) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC)
) ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `GreenWaysOFC`.`post`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GreenWaysOFC`.`post` (
  `idPost` INT(11) NOT NULL AUTO_INCREMENT,
  `region` VARCHAR(100) NOT NULL,
  `content` VARCHAR(300) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `Users_id` INT(11) NOT NULL,
  PRIMARY KEY (`idPost`),
  INDEX `fk_post_user_idx` (`Users_id` ASC),
  CONSTRAINT `fk_post_user`
    FOREIGN KEY (`Users_id`)
    REFERENCES `GreenWaysOFC`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `GreenWaysOFC`.`responses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GreenWaysOFC`.`responses` (
  `idResponse` INT(11) NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(300) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `Users_id` INT(11) NOT NULL,
  `Post_idPost` INT(11) NOT NULL,
  PRIMARY KEY (`idResponse`),
  INDEX `fk_responses_users1_idx` (`Users_id` ASC),
  INDEX `fk_responses_post1_idx` (`Post_idPost` ASC),
  CONSTRAINT `fk_responses_users1`
    FOREIGN KEY (`Users_id`)
    REFERENCES `GreenWaysOFC`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_responses_post1`
    FOREIGN KEY (`Post_idPost`)
    REFERENCES `GreenWaysOFC`.`post` (`idPost`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;