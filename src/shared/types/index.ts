export type BookRequestType = {
  query?: string;
  sort?: string;
  page: number;
  size: number;
  target?: 'title' | 'isbn' | 'publisher' | 'person';
};

export type BookResponseType = {
  meta: MetaResponse;
  documents: BookType[];
};

export type MetaResponse = {
  total_count: number;
  pageable_count: number;
  is_end: boolean;
};

export type BookType = {
  title: string;
  contents: string;
  url: string;
  isbn: string;
  datetime: string;
  authors: string[];
  publisher: string;
  translators: string[];
  price: number;
  sale_price: number;
  thumbnail: string;
  status: string;
};
