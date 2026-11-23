
import Modal from "./modal";
import type { Book } from "./EditBookModal";

interface DeleteBookModalProps {
  canShow: boolean;
  updateModalState: () => void;
  book: Book | null;
  onConfirm: (id: number) => void;
}

export default function DeleteBookModal({
  canShow,
  updateModalState,
  book,
  onConfirm,
}: DeleteBookModalProps) {
  if (!book) return null;

  return (
    <Modal
      canShow={canShow}
      updateModalState={updateModalState}
      title="Delete Book"
    >
      <p className="mb-6 text-gray-600">
        Are you sure you want to delete{" "}
        <strong>{book.name}</strong>?
      </p>

      <div className="flex justify-end gap-2">
        <button onClick={updateModalState}>
          Cancel
        </button>

        <button
          onClick={() => {
            onConfirm(book.id);
            updateModalState();
          }}
          className="rounded-lg bg-red-600 px-4 py-2 text-white"
        >
          Delete
        </button>
      </div>
    </Modal>
  );
}
