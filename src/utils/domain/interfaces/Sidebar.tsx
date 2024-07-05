import type { ReactNode } from "react";

export interface SidebarItems {
  links: Array<{
    label: string;
    href: string;
    icon?: ReactNode;
  }>;
  extras?: ReactNode;
}

export interface SidebarProfile {
  href?: string;
  name: string;
  options: ReactNode;
}
