-- Paste this into phpMyAdmin's "SQL" tab (or use the "Import" tab) once,
-- against the database the Yandex Cloud Functions will connect to.
-- Safe to re-run: it only creates the table if it doesn't already exist.

CREATE TABLE IF NOT EXISTS `projects` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `slug` VARCHAR(191) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `tags` TEXT NOT NULL COMMENT 'JSON array of strings, e.g. ["[ TAG ONE ]","[ TAG TWO ]"]',
  `description` TEXT NOT NULL,
  `image_thumb` LONGBLOB NULL,
  `image_thumb_mime` VARCHAR(100) NULL,
  `sort_order` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_projects_slug` (`slug`),
  KEY `idx_projects_sort_order` (`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Unlimited "Большое изображение" gallery images per project.
CREATE TABLE IF NOT EXISTS `project_images` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `project_id` INT UNSIGNED NOT NULL,
  `image` LONGBLOB NOT NULL,
  `image_mime` VARCHAR(100) NOT NULL,
  `sort_order` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_project_images_project_id` (`project_id`),
  CONSTRAINT `fk_project_images_project` FOREIGN KEY (`project_id`)
    REFERENCES `projects`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
