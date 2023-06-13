ALTER TABLE `inventory` MODIFY COLUMN `created_at` datetime NOT NULL DEFAULT '2023-06-12 15:06:14.187';
ALTER TABLE `inventory` MODIFY COLUMN `updated_at` datetime NOT NULL DEFAULT '2023-06-12 15:06:14.187';
ALTER TABLE `inventory` ADD `edited_by` int;
ALTER TABLE `inventory` ADD CONSTRAINT `inventory_edited_by_users_id_fk` FOREIGN KEY (`edited_by`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;