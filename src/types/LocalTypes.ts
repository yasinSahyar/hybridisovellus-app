type MessageResponse = {
  message: string;
};

type ErrorResponse = MessageResponse & {
  stack?: string;
};
// Nullable since not all articles may have an author

type Article = {
  id: number;
  title: string;
  description: string;
  author_id: number  | null;
};

type Author = {
  id: number;
  name: string;
  email: string;
};


export type {MessageResponse, ErrorResponse, Article, Author};
