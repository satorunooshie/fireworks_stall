SET
    @OLD_UNIQUE_CHECKS = @@UNIQUE_CHECKS,
    UNIQUE_CHECKS = 0;
SET
    @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS,
    FOREIGN_KEY_CHECKS = 0;
SET
    @OLD_SQL_MODE = @@SQL_MODE,
    SQL_MODE = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `fireworks` DEFAULT CHARACTER SET utf8mb4;

SET
    CHARSET utf8mb4;

CREATE TABLE `fireworks`.`user` (
    `uid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `score` int(10) unsigned default 0,
    `level` tinyint(3) unsigned default 1,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`uid`)
) ENGINE = InnoDB COMMENT = 'ユーザテーブル';

INSERT INTO `user`(`uid`, `name`, `score`) VALUES ('aaa', 'test name', 100);

SET
    SQL_MODE = @OLD_SQL_MODE;
SET
    FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;
SET
    UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS;
