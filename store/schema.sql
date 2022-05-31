CREATE TABLE users(
    `id`    VARCHAR(32) PRIMARY KEY,
    `name`  VARCHAR(32)
);

CREATE TABLE credentials(
    `id`        VARCHAR(32) PRIMARY KEY,
    `username`  VARCHAR(32) UNIQUE,
    `password`  VARCHAR(64)
);

CREATE TABLE follows(
    `from`  VARCHAR(32),
    `to`    VARCHAR(32),
    PRIMARY KEY(`from`, `to`)
);