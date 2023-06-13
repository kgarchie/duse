ALTER TABLE `inventory` MODIFY COLUMN `price` double;
ALTER TABLE `inventory` ADD `is_featured` boolean DEFAULT false;
ALTER TABLE `inventory` ADD `created_at` datetime DEFAULT '2023-06-12 14:57:06.021' NOT NULL;
ALTER TABLE `inventory` ADD `updated_at` datetime DEFAULT '2023-06-12 14:57:06.021' NOT NULL;