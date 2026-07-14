"use client";

import { useState, type FormEvent, type KeyboardEvent } from "react";
import type { Project } from "@/types/project";
import styles from "./AdminPage.module.css";

const READ_URL = process.env.NEXT_PUBLIC_PROJECTS_READ_URL;
const WRITE_URL = process.env.NEXT_PUBLIC_PROJECTS_WRITE_URL;

const PROJECTS_PER_PAGE = 7;

const EMPTY_FORM = {
  id: null as number | null,
  slug: "",
  title: "",
  tags: [] as string[],
  description: "",
  sortOrder: 0,
};

type FormState = typeof EMPTY_FORM;

type ImageField = { base64: string; mime: string } | null;

type GalleryImage = {
  key: string;
  keepId?: number;
  previewUrl: string;
  base64?: string;
  mime?: string;
};

function stripBrackets(tag: string) {
  return tag.replace(/^\[\s*/, "").replace(/\s*\]$/, "").trim();
}

// Common web transliteration so slugs stay in Latin characters and work as
// URLs, regardless of the (Russian) title they're generated from.
const CYRILLIC_TO_LATIN: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z",
  и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r",
  с: "s", т: "t", у: "u", ф: "f", х: "kh", ц: "ts", ч: "ch", ш: "sh",
  щ: "shch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
};

function transliterate(value: string) {
  return value
    .toLowerCase()
    .split("")
    .map((ch) => CYRILLIC_TO_LATIN[ch] ?? ch)
    .join("");
}

function slugify(value: string) {
  return transliterate(value)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function fileToBase64(file: File): Promise<ImageField> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.slice(result.indexOf(",") + 1);
      resolve({ base64, mime: file.type || "image/jpeg" });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function callWrite(password: string, body: Record<string, unknown>) {
  if (!WRITE_URL) throw new Error("NEXT_PUBLIC_PROJECTS_WRITE_URL is not configured");
  const res = await fetch(WRITE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password, ...body }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState(false);

  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingList, setLoadingList] = useState(false);
  const [listError, setListError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [tagInput, setTagInput] = useState("");
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [imageThumb, setImageThumb] = useState<ImageField>(null);
  const [existingThumbUrl, setExistingThumbUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  async function loadProjects() {
    if (!READ_URL) {
      setListError("NEXT_PUBLIC_PROJECTS_READ_URL is not configured");
      return;
    }
    setLoadingList(true);
    setListError(null);
    try {
      const res = await fetch(READ_URL, { cache: "no-store" });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      const data: Project[] = await res.json();
      setProjects([...data].sort((a, b) => b.sortOrder - a.sortOrder));
    } catch (error) {
      setListError(error instanceof Error ? error.message : "Failed to load projects");
    } finally {
      setLoadingList(false);
    }
  }

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    setLoggingIn(true);
    setLoginError(null);
    try {
      await callWrite(password, { action: "ping" });
      setAuthed(true);
      await loadProjects();
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : "Login failed");
    } finally {
      setLoggingIn(false);
    }
  }

  function resetForm() {
    setForm(EMPTY_FORM);
    setTagInput("");
    for (const image of images) {
      if (!image.keepId) URL.revokeObjectURL(image.previewUrl);
    }
    setImages([]);
    setImageThumb(null);
    setExistingThumbUrl(null);
    setFormError(null);
  }

  function addTag(raw: string) {
    const tag = raw.trim();
    if (!tag) return;
    setForm((f) => (f.tags.includes(tag) ? f : { ...f, tags: [...f.tags, tag] }));
  }

  function removeTag(tag: string) {
    setForm((f) => ({ ...f, tags: f.tags.filter((t) => t !== tag) }));
  }

  function handleTagInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addTag(tagInput);
      setTagInput("");
    } else if (event.key === "Backspace" && !tagInput && form.tags.length) {
      removeTag(form.tags[form.tags.length - 1]);
    }
  }

  function commitTagInput() {
    if (tagInput.trim()) {
      addTag(tagInput);
      setTagInput("");
    }
  }

  async function handleAddImages(fileList: FileList | null) {
    if (!fileList || !fileList.length) return;
    const added = await Promise.all(
      Array.from(fileList).map(async (file) => {
        const encoded = await fileToBase64(file);
        return {
          key: `new-${Date.now()}-${Math.random().toString(36).slice(2)}`,
          previewUrl: URL.createObjectURL(file),
          base64: encoded?.base64,
          mime: encoded?.mime,
        } satisfies GalleryImage;
      })
    );
    setImages((prev) => [...prev, ...added]);
  }

  function removeImage(key: string) {
    setImages((prev) => {
      const target = prev.find((image) => image.key === key);
      if (target && !target.keepId) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((image) => image.key !== key);
    });
  }

  function startEdit(project: Project) {
    setForm({
      id: project.id,
      slug: project.slug,
      title: project.title,
      tags: project.tags.map(stripBrackets),
      description: project.description,
      sortOrder: project.sortOrder,
    });
    setTagInput("");
    setImages(
      project.images.map((image) => ({
        key: `existing-${image.id}`,
        keepId: image.id,
        previewUrl: image.url,
      }))
    );
    setImageThumb(null);
    setExistingThumbUrl(project.imageThumbUrl ?? null);
    setFormError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setFormError(null);

    const tags = form.tags.map((tag) => `[ ${tag.toUpperCase()} ]`);

    const payload: Record<string, unknown> = {
      slug: form.slug || slugify(form.title),
      title: form.title,
      tags,
      description: form.description,
      sortOrder: form.sortOrder,
      images: images.map((image) =>
        image.keepId
          ? { keepId: image.keepId }
          : { base64: image.base64, mime: image.mime }
      ),
    };
    if (imageThumb) {
      payload.imageThumb = imageThumb.base64;
      payload.imageThumbMime = imageThumb.mime;
    }

    try {
      if (form.id) {
        await callWrite(password, { action: "update", id: form.id, ...payload });
      } else {
        await callWrite(password, { action: "create", ...payload });
      }
      resetForm();
      await loadProjects();
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(project: Project) {
    if (!window.confirm(`Удалить проект «${project.title}»?`)) return;
    try {
      await callWrite(password, { action: "delete", id: project.id });
      await loadProjects();
    } catch (error) {
      setListError(error instanceof Error ? error.message : "Delete failed");
    }
  }

  if (!authed) {
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>Админ-панель</h1>
        <form className={styles.loginBox} onSubmit={handleLogin}>
          <input
            type="password"
            className={styles.input}
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          {loginError && <p className={styles.error}>{loginError}</p>}
          <button type="submit" className={styles.button} disabled={loggingIn || !password}>
            {loggingIn ? "Проверка..." : "Войти"}
          </button>
        </form>
      </div>
    );
  }

  const totalPages = Math.max(1, Math.ceil(projects.length / PROJECTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const pagedProjects = projects.slice(
    (currentPage - 1) * PROJECTS_PER_PAGE,
    currentPage * PROJECTS_PER_PAGE
  );

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Проекты</h1>
      <div className={styles.layout}>
        <form className={styles.formCard} onSubmit={handleSubmit}>
          <h2>{form.id ? "Редактировать проект" : "Новый проект"}</h2>

          <div className={styles.field}>
            <label>Название</label>
            <input
              className={styles.input}
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              required
            />
          </div>

          <div className={styles.field_hidden}>
            <label>Slug (URL)</label>
            <input
              className={styles.input}
              value={form.slug}
              placeholder={slugify(form.title) || "auto"}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
            />
          </div>

          <div className={styles.field}>
            <label>Теги</label>
            <div className={styles.tagList}>
              {form.tags.map((tag) => (
                <span key={tag} className={styles.tagChip}>
                  {tag}
                  <button
                    type="button"
                    className={styles.tagRemove}
                    onClick={() => removeTag(tag)}
                    aria-label={`Удалить тег ${tag}`}
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                className={styles.tagInput}
                value={tagInput}
                placeholder="Добавить тег и нажать Enter"
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagInputKeyDown}
                onBlur={commitTagInput}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label>Описание</label>
            <textarea
              className={styles.textarea}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              required
            />
          </div>

          <div className={styles.field}>
            <label>Чем больше число, тем выше приоритет</label>
            <input
              type="number"
              className={styles.input}
              value={form.sortOrder}
              onChange={(e) => setForm((f) => ({ ...f, sortOrder: Number(e.target.value) }))}
            />
          </div>

          <div className={styles.field}>
            <label>Большое изображение (можно несколько)</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={async (e) => {
                await handleAddImages(e.target.files);
                e.target.value = "";
              }}
            />
            {images.length > 0 && (
              <div className={styles.imageGrid}>
                {images.map((image) => (
                  <div key={image.key} className={styles.imageGridItem}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={image.previewUrl} alt="" />
                    <button
                      type="button"
                      className={styles.imageRemove}
                      onClick={() => removeImage(image.key)}
                      aria-label="Удалить изображение"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={styles.field}>
            <label>Миниатюра{form.id ? " (оставить пустым — без изменений)" : ""}</label>
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) setImageThumb(await fileToBase64(file));
              }}
            />
            {(imageThumb || existingThumbUrl) && (
              <div className={styles.imageGrid}>
                <div className={styles.imageGridItem}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={
                      imageThumb
                        ? `data:${imageThumb.mime};base64,${imageThumb.base64}`
                        : existingThumbUrl!
                    }
                    alt=""
                  />
                </div>
              </div>
            )}
          </div>

          {formError && <p className={styles.error}>{formError}</p>}

          <div className={styles.formActions}>
            <button type="submit" className={styles.button} disabled={saving}>
              {saving ? "Сохранение..." : form.id ? "Сохранить" : "Добавить"}
            </button>
            {form.id && (
              <button type="button" className={styles.buttonSecondary} onClick={resetForm}>
                Отмена
              </button>
            )}
          </div>
        </form>

        <div className={styles.list}>
          {loadingList && <p>Загрузка...</p>}
          {listError && <p className={styles.error}>{listError}</p>}
          {pagedProjects.map((project) => (
            <div key={project.id} className={styles.row}>
              <div className={styles.rowThumb}>
                {project.imageThumbUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={project.imageThumbUrl} alt={project.title} />
                )}
              </div>
              <div className={styles.rowBody}>
                <p className={styles.rowTitle}>{project.title}</p>
                <p className={styles.rowMeta}>
                  /{project.slug} · приоритет {project.sortOrder}
                </p>
              </div>
              <div className={styles.rowActions}>
                <button className={styles.smallButton} onClick={() => startEdit(project)}>
                  Изменить
                </button>
                <button className={styles.smallButton} onClick={() => handleDelete(project)}>
                  Удалить
                </button>
              </div>
            </div>
          ))}
          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                type="button"
                className={styles.smallButton}
                onClick={() => setPage((p) => p - 1)}
                disabled={currentPage <= 1}
              >
                Назад
              </button>
              <span className={styles.pageInfo}>
                Страница {currentPage} из {totalPages}
              </span>
              <button
                type="button"
                className={styles.smallButton}
                onClick={() => setPage((p) => p + 1)}
                disabled={currentPage >= totalPages}
              >
                Вперёд
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
