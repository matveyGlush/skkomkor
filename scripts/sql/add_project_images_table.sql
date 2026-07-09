-- Run this once against the existing database (paste into phpMyAdmin's
-- "SQL" tab) to let each project have unlimited "Большое изображение"
-- gallery images instead of exactly one.
--
-- Safe to re-run: table creation is guarded, and the data migration only
-- copies rows that haven't been migrated yet (project_images is empty).

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

-- Move each project's existing single large image into the new table as
-- the first gallery image (only runs if project_images is still empty).
INSERT INTO `project_images` (`project_id`, `image`, `image_mime`, `sort_order`)
SELECT `id`, `image_large`, `image_large_mime`, 0
FROM `projects`
WHERE `image_large` IS NOT NULL
  AND NOT EXISTS (SELECT 1 FROM `project_images` LIMIT 1);

-- The old single-image columns are no longer used once the app code is
-- deployed. Drop them after confirming the migration above worked.
ALTER TABLE `projects`
  DROP COLUMN `image_large`,
  DROP COLUMN `image_large_mime`;
