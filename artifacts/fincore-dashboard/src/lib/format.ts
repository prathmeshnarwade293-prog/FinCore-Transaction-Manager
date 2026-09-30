import { format, parseISO } from 'date-fns';

export const money = (value: number, currency = 'USD') =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(value);

export const moneyExact = (value: number, currency = 'USD') =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 2 }).format(value);

export const dateLabel = (value: string) => {
  try { return format(parseISO(value), 'MMM d, yyyy'); } catch { return value; }
};

export const shortDate = (value: string) => {
  try { return format(parseISO(value), 'MMM d'); } catch { return value; }
};

export const initials = (label: string) =>
  label.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();

export const percent = (value: number) => `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;