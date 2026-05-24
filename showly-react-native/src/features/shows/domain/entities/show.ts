export type Show = {
  id: number;
  name: string;
  imageUrl: string;
  summary: string;
  genres: string[];
  rating: number | null;
  status: string;
  language: string;
  runtime: number | null;
  premiered: string | null;
  userNote?: string;
  isLocal?: boolean;
};