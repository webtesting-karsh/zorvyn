import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Generate an id function
export function generateId() {
  return Math.random().toString(36).substr(2, 9);
}
