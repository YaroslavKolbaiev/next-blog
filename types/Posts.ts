export interface Post {
  id?: string;
  createdAt?: string;
  slug?: string;
  content?: string
  title: string;
  excerpt: string;
  imageUrl: string;
  author: string | null | undefined;
}
