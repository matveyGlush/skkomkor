export interface ProjectImage {
  id: number;
  url: string;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  tags: string[];
  description: string;
  sortOrder: number;
  images: ProjectImage[];
  imageThumbUrl: string | null;
}
