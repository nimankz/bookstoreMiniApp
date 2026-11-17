
const API_URL = import.meta.env.VITE_API_URL;

// Book types
export interface BookDto {
  id: number;
  name: string;
  authorName: string;
  price: number;
  releaseDate: string;
  genre: string;
}

export interface AddBookDto {
  name: string;
  authorName: string;
  price: number;
  releaseDate: string;
  genre: string;
}

// Custom API error
export class ApiError extends Error {
  constructor(
    message: string,
    public status: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// Shared request handler
export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T | null> {
  const token = localStorage.getItem("token");

  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new ApiError(
      response.status === 401
        ? "You are not authenticated."
        : response.status === 403
        ? "You are authenticated, but you are not authorized to perform this action."
        : response.status === 404
        ? "The requested resource was not found."
        : "Something went wrong.",
      response.status
    );
  }

  if (response.status === 204) {
    return null;
  }

  return response.json() as Promise<T>;
}

// 1. GET: Get all books
export function getBooks() {
  return apiFetch<BookDto[]>("/books", {
    method: "GET",
  });
}

// 2. GET: Get a book by ID
export function getBookById(id: number) {
  return apiFetch<BookDto>(`/books/${id}`, {
    method: "GET",
  });
}

// 3. POST: Add a new book
export function addBook(book: AddBookDto) {
  return apiFetch<BookDto>("/books", {
    method: "POST",
    body: JSON.stringify(book),
  });
}

// 4. PUT: Update an existing book
export function updateBook(id: number, book: BookDto) {
  return apiFetch<BookDto>(`/books/${id}`, {
    method: "PUT",
    body: JSON.stringify(book),
  });
}

// 5. DELETE: Delete a book
export function deleteBook(id: number) {
  return apiFetch<BookDto[]>(`/books/${id}`, {
    method: "DELETE",
  });
}
