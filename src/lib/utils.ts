import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function getMatchClass(match: number): string {
  if (match >= 60) return 'high';
  if (match >= 30) return 'medium';
  return 'low';
}

export function getMatchColor(match: number): string {
  if (match >= 60) return 'text-secondary-cyan';
  if (match >= 30) return 'text-primary';
  return 'text-error';
}

export function truncate(str: string, len: number): string {
  if (str.length <= len) return str;
  return str.slice(0, len) + '...';
}
