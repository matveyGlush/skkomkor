import { notFound } from "next/navigation";

// Projects are added/edited live via /admin, so slugs aren't known at build
// time. "output: export" requires at least one static param per dynamic
// segment, so we emit a single unused placeholder page; real slugs 404 and
// are served by the site's 404 fallback (see not-found.tsx), which fetches
// and renders the project client-side by reading the slug from the URL.
export function generateStaticParams() {
  return [{ slug: "_" }];
}

export default function ProjectPage(): never {
  notFound();
}
