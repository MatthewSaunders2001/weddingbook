export type Memory = {
  prompt: string;

  mainPhoto: File | null;

  extras: File[];

  message: string;

  uploaded: boolean;
};