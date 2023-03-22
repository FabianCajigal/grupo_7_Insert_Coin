CREATE DATABASE insertcoin;

CREATE TABLE `products` (
   `id` SMALLINT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(255) NOT NULL,
   `shortDescription` VARCHAR(255) NOT NULL,
   `price` MEDIUMINT NOT NULL,
   `longDescription` TEXT NOT NULL,
   `categoryId` SMALLINT NOT NULL,
   `news` TINYINT NOT NULL,
   `image` VARCHAR(255) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `users` (
   `id` SMALLINT NOT NULL AUTO_INCREMENT,
   `email` VARCHAR(50) NOT NULL,
   `username` VARCHAR(20) NOT NULL,
   `admin` TINYINT NOT NULL,
   `password` VARCHAR(255) NOT NULL,
   `image` VARCHAR(255) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `categories` (
   `id` SMALLINT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(255) NOT NULL,
   PRIMARY KEY (`id`)
);


ALTER TABLE `products` ADD CONSTRAINT `FK_c5c53d4c-4ffb-4244-868f-4dc52c8138b7` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`);