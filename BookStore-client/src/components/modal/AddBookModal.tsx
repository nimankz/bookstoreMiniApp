
import { useState, type FormEvent } from "react";
import Modal from "./modal";
import { Book } from "lucide-react";

export interface NewBook {
    name: string,
    authorName: string,
    price: number,
    releaseDate:string ,
    genre: string
}

interface AddBookModalProps {
  canShow: boolean;
  updateModalState: () => void;
  onAdd: (book: NewBook) => void;
}

export default function AddBookModal({
  canShow,
  updateModalState,
  onAdd,
}: AddBookModalProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [genre, setgenre] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onAdd({
      name,
      price: Number(price),
      authorName,
      genre,
      releaseDate
    });

    setName("");
    setPrice("");
    updateModalState();
  };

  return (
    <Modal
      canShow={canShow}
      updateModalState={updateModalState}
      title="Add New Book"
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
          <label>author Name</label>
          <input
            required
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full rounded-lg border p-2"
          />
        </div>
        <div>
          <label>genre</label>
          <input
            required
            value={genre}
            onChange={(e) => setgenre(e.target.value)}
            className="w-full rounded-lg border p-2"
          />
        </div>
        <div>
          <label>release date</label>
          <input
            required
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
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
