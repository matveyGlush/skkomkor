"use client";

import { useEffect, useState } from "react";
import { getProjects, getProjectBySlug } from "@/lib/projects";
import type { Project } from "@/types/project";

export function useProjects(): Project[] {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    let cancelled = false;
    getProjects().then((data) => {
      if (!cancelled) setProjects(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return projects;
}

// undefined = still loading, null = fetched but not found
export function useProject(slug: string): Project | null | undefined {
  const [project, setProject] = useState<Project | null | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    getProjectBySlug(slug).then((data) => {
      if (!cancelled) setProject(data);
    });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return project;
}
