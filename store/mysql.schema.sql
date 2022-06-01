CREATE DATABASE IF NOT EXISTS `contacts`;
USE `contacts`;

CREATE TABLE IF NOT EXISTS `users`(
    `id`    VARCHAR(32) PRIMARY KEY,
    `name`  VARCHAR(32)
);

CREATE TABLE IF NOT EXISTS `credentials`(
    `id`        VARCHAR(32) PRIMARY KEY,
    `username`  VARCHAR(32) UNIQUE,
    `password`  VARCHAR(64)
);

CREATE TABLE IF NOT EXISTS `follows`(
    `from`  VARCHAR(32),
    `to`    VARCHAR(32),
    PRIMARY KEY(`from`, `to`)
);