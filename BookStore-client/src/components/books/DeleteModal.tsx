
import type { BookDto } from "../../services/api";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  book: BookDto | null;
}

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  book,
}: DeleteModalProps) {
  if (!isOpen || !book) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h2 className="mb-3 text-xl font-bold text-slate-800">
          Delete Book
        </h2>

        <p className="mb-6 text-slate-600">
          Are you sure you want to delete{" "}
          <strong>{book.name}</strong>? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border px-4 py-2 text-slate-600 hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
