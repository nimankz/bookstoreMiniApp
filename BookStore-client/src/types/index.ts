export interface Book {
  id: number;
  name: string;
  authorName: string;
  price: number;
  releaseDate: string;
  genre: string;
}

export interface BookFormData {
  name: string;
  authorName: string;
  price: number;
  releaseDate: string;
  genre: string;
}

export interface BooksTableProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
}