import { Dictionary, ESortDB } from '../interface';

export const simileEnum = (enumFile: Dictionary, value: unknown) => Object.values(enumFile).some(v => v === value);

export const validateSort = (value: ESortDB | unknown): ESortDB => Number(value === 1 ? 1 : value === -1 ? -1 : 0);

export const validateSelect = (value: number | null | undefined): number => Math.round(Number(value ? value : 0));
