export interface Article {
  id: string;
  title: string;
  author: string;
  abstract: string;
  content: string;
  publishDate: string;
  category: string;
  tags: string[];
  pdfUrl?: string;
}

export interface AdminState {
  isLoggedIn: boolean;
  username: string;
}
