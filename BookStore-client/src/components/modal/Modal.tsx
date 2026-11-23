
interface ModalProps {
  canShow: boolean;
  updateModalState: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({
  canShow,
  updateModalState,
  title,
  children,
}: ModalProps) {
  if (!canShow) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={updateModalState}
    >
      <div
        className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">{title}</h2>

          <button
            onClick={updateModalState}
            className="text-xl text-gray-500 hover:text-black"
          >
            &times;
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
