import type { Project } from "@/types/project";

const PROJECTS_READ_URL = process.env.NEXT_PUBLIC_PROJECTS_READ_URL;

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch (error) {
    console.error(`Failed to fetch ${url}:`, error);
    return null;
  }
}

// The API is a separately-deployed PHP script (manually re-uploaded via
// FTP, see docs/PROJECTS_DATABASE.md) and can drift from this shape, so
// normalize its response rather than trusting the TypeScript type at runtime.
function normalizeProject(raw: Partial<Project>): Project {
  return {
    id: raw.id ?? 0,
    slug: raw.slug ?? "",
    title: raw.title ?? "",
    tags: raw.tags ?? [],
    description: raw.description ?? "",
    sortOrder: raw.sortOrder ?? 0,
    images: raw.images ?? [],
    imageThumbUrl: raw.imageThumbUrl ?? null,
  };
}

export async function getProjects(): Promise<Project[]> {
  if (!PROJECTS_READ_URL) return [];
  const projects = await fetchJson<Project[]>(PROJECTS_READ_URL);
  if (!Array.isArray(projects)) return [];
  return projects.map(normalizeProject).sort((a, b) => b.sortOrder - a.sortOrder);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!PROJECTS_READ_URL) return null;
  const url = `${PROJECTS_READ_URL}?slug=${encodeURIComponent(slug)}`;
  const project = await fetchJson<Project>(url);
  return project ? normalizeProject(project) : null;
}
