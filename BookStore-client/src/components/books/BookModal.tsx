
import { useEffect, useState, type FormEvent } from "react";
import type { AddBookDto, BookDto } from "../../services/api";

interface BookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (book: AddBookDto) => void;
  book?: BookDto | null;
}

export default function BookModal({
  isOpen,
  onClose,
  onSubmit,
  book,
}: BookModalProps) {
  const [name, setName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [price, setPrice] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [genre, setGenre] = useState("");

  const isEditing = Boolean(book);

  useEffect(() => {
    if (book) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setName(book.name);
      setAuthorName(book.authorName);
      setPrice(String(book.price));
      setReleaseDate(book.releaseDate);
      setGenre(book.genre);
    } else {
      setName("");
      setAuthorName("");
      setPrice("");
      setReleaseDate("");
      setGenre("");
    }
  }, [book, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const newBook: AddBookDto = {
      name,
      authorName,
      price: Number(price),
      releaseDate,
      genre,
    };

    onSubmit(newBook);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        <h2 className="mb-6 text-xl font-bold text-slate-800">
          {isEditing ? "Edit Book" : "Add New Book"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">
              Book Name
            </label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Author Name
            </label>
            <input
              required
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Price
            </label>
            <input
              required
              min="0"
              step="0.01"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Release Date
            </label>
            <input
              required
              type="date"
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Genre
            </label>
            <input
              required
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-4 py-2 text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              {isEditing ? "Save Changes" : "Add Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
