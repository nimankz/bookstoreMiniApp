
import { useEffect, useState, type FormEvent } from "react";
import Modal from "./modal";

export interface Book {
  id: number;
  name: string;
  price: number;
}

interface EditBookModalProps {
  canShow: boolean;
  updateModalState: () => void;
  book: Book | null;
  onSave: (book: Book) => void;
}

export default function EditBookModal({
  canShow,
  updateModalState,
  book,
  onSave,
}: EditBookModalProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (book) {
      setName(book.name);
      setPrice(String(book.price));
    }
  }, [book]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!book) return;

    onSave({
      id: book.id,
      name,
      price: Number(price),
    });

    updateModalState();
  };

  return (
    <Modal
      canShow={canShow}
      updateModalState={updateModalState}
      title="Edit Book"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Book Name</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border p-2"
          />
        </div>

        <div>
          <label>Price</label>
          <input
            required
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full rounded-lg border p-2"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button type="button" onClick={updateModalState}>
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-4 py-2 text-white"
          >
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
}
