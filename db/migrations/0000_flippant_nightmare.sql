CREATE TABLE `inventory` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(20),
	`price` varchar(20),
	`description` text);

CREATE TABLE `users` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(20),
	`password` varchar(256),
	`email` varchar(256));
