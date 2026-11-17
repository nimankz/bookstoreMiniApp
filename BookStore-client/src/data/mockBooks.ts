import type { Book } from "../types/book";

export const mockBooks: Book[] = [
  {
    id: 1,
    name: "Clean Code",
    authorName: "Robert C. Martin",
    price: 35.5,
    releaseDate: "2008-08-01",
    genre: "Programming",
  },
  {
    id: 2,
    name: "The Pragmatic Programmer",
    authorName: "David Thomas",
    price: 42,
    releaseDate: "1999-10-20",
    genre: "Programming",
  },
  {
    id: 3,
    name: "Atomic Habits",
    authorName: "James Clear",
    price: 25.99,
    releaseDate: "2018-10-16",
    genre: "Self-help",
  },
  {
    id: 4,
    name: "The Hobbit",
    authorName: "J.R.R. Tolkien",
    price: 19.5,
    releaseDate: "1937-09-21",
    genre: "Fantasy",
  },
  {
    id: 5,
    name: "1984",
    authorName: "George Orwell",
    price: 15,
    releaseDate: "1949-06-08",
    genre: "Fiction",
  },
];