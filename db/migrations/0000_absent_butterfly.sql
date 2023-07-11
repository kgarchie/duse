CREATE TABLE `inventory` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(20),
	`price` double,
	`description` text,
	`is_featured` boolean DEFAULT false,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`edited_by` varchar(128));
--> statement-breakpoint
CREATE TABLE `tokens` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`token` varchar(36) NOT NULL,
	`is_valid` boolean DEFAULT true,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`user_id` varchar(128) NOT NULL,
	`type` enum('email_verification','password_reset','bearer') NOT NULL);
--> statement-breakpoint
CREATE TABLE `users` (
	`user_id` varchar(32) PRIMARY KEY NOT NULL,
	`name` varchar(20) DEFAULT 'Anonymous',
	`password` varchar(256),
	`email` varchar(30),
	`is_ephemeral` boolean DEFAULT true,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`is_admin` boolean DEFAULT false);
--> statement-breakpoint
ALTER TABLE `inventory` ADD CONSTRAINT `inventory_edited_by_users_user_id_fk` FOREIGN KEY (`edited_by`) REFERENCES `users`(`user_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `tokens` ADD CONSTRAINT `tokens_user_id_users_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE no action ON UPDATE no action;