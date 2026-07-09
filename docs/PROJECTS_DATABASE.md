# Projects: database-backed content

Projects (the `/projects` list, `/projects/[slug]` pages, and the homepage
featured section) are no longer hardcoded in the repo — they're read from a
MySQL/MariaDB table through a small PHP API deployed on the same hosting as
phpMyAdmin, and managed through a password-protected `/admin` page.

## Pieces

| Piece | Where | What it does |
|---|---|---|
| `projects` table | your MySQL DB (phpMyAdmin) | Stores every project, images included, as `LONGBLOB`. |
| `read.php` | `php-api/read.php` | Public GET endpoint: list all projects, fetch one by slug, or stream an image. |
| `write.php` | `php-api/write.php` | Password-protected POST endpoint: create/update/delete projects. Only called from `/admin`. |
| `/admin` page | `src/app/admin/page.tsx` | Password-gated UI that calls `write.php`. |
| `src/lib/projects.ts` | Next.js | Server-side fetch helpers the public pages use to read from `read.php`. |

## 1. Create the table (phpMyAdmin)

1. Open phpMyAdmin, select your database, go to the **SQL** tab.
2. Paste and run `scripts/sql/create_projects_table.sql`. Safe to re-run.
3. Seed it with the 13 existing projects (including their real JPEGs, stored
   as binary in the DB): use the **Import** tab (not the SQL tab — the file
   is ~3.5 MB because the images are hex-encoded, and the SQL query box has a
   lower size limit than file Import) and import
   `scripts/sql/seed_projects.sql`.
   - If Import rejects it for being too large, raise `upload_max_filesize`,
     `post_max_size`, and `max_allowed_packet` in your hosting's PHP/MySQL
     config, or ask your host to do it.
4. To regenerate the seed file later (e.g. if `src/data/projects.ts` or the
   images under `public/images/projects/` change), run:
   ```
   node scripts/generate-seed-sql.mjs
   ```

## 2. Deploy the PHP API

1. Copy `php-api/config.example.php` to `php-api/config.php` and fill in
   your real DB credentials (same DB the table lives in — since this runs on
   the same hosting, `DB_HOST` is usually `localhost`) and set
   `ADMIN_PASSWORD` (`TCy2UFxA`). `config.php` is gitignored — it never gets
   committed.
2. Upload the whole `php-api/` folder to your hosting via FTP/SFTP or the
   hosting file manager — e.g. into `public_html/api/`. It needs no
   dependencies beyond PHP's built-in `pdo_mysql` extension (enabled on
   virtually all shared hosting).
3. Confirm it works by visiting `https://yourdomain.ru/api/read.php` in a
   browser — you should get back `[]` (empty list, since the table is empty
   until step 1.3) or a JSON array of projects.

There's no separate "public URL" configuration step like a cloud function
would need — `read.php` derives its own URL (for building image links)
straight from the request, via `$_SERVER['HTTP_HOST']`.

## 3. Configure Next.js

Copy `.env.example` to `.env.local` and fill in the two script URLs from
step 2:

```
NEXT_PUBLIC_PROJECTS_READ_URL=https://yourdomain.ru/api/read.php
NEXT_PUBLIC_PROJECTS_WRITE_URL=https://yourdomain.ru/api/write.php
```

Set the same two variables in your hosting provider's (e.g. Vercel) project
settings for production.

## 4. Using /admin

Visit `/admin`, enter the password (`TCy2UFxA`, matching `ADMIN_PASSWORD` in
`php-api/config.php`), then add/edit/delete projects. Image files are
uploaded straight into the database as binary — there's no separate file
storage to manage.

The password is never stored in the frontend code; it's typed in at login
and sent with every write request, where `write.php` checks it against
`config.php`'s `ADMIN_PASSWORD`. Anyone with network access to `write.php`
and the correct password can modify data, so keep the password private and
treat the URL as sensitive. Serving both scripts over HTTPS (not plain HTTP)
is required so the password isn't sent in the clear.
