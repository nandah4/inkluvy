import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Shared class-name helper expected by copied shadcn-compatible components.
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
