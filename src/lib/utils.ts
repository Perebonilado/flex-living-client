import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateUUID = (): string => {
  return uuidv4();
};

export const getUniqueValues = <T>(values?: T[]) => {
  return Array.from(new Set(values || []));
};

export const isNumeric = (value: any) => {
  return !isNaN(value) && value !== null && value !== "" && isFinite(value);
};
