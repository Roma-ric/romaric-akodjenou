import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { scrollToSection } from "./scroll"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const navigateToSection = (endpoint: string) => {
  scrollToSection(endpoint.substring(1));
};
