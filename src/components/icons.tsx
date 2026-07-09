import { cn } from "@/lib/utils";

interface IconProps {
  className?: string;
}

export function ArrowUpRightSmIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 13 12"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-[13px] h-[12px]", className)}
      aria-hidden="true"
    >
      <path d="M12.9997 10.8711C12.9996 11.1471 12.7757 11.3711 12.4997 11.3711C12.2236 11.3711 11.9998 11.1471 11.9997 10.8711V1.63574L0.837581 11.8682C0.634096 12.0547 0.318149 12.0412 0.131527 11.8379C-0.0550019 11.6344 -0.0415482 11.3185 0.1618 11.1318L11.2145 1H1.18621C0.910072 1 0.686214 0.776142 0.686214 0.5C0.686214 0.223858 0.910072 1.10647e-08 1.18621 0H12.4997C12.7758 5.1517e-07 12.9997 0.223858 12.9997 0.5V10.8711Z" />
    </svg>
  );
}

export function PlusIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-4 h-4", className)}
      aria-hidden="true"
    >
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}
