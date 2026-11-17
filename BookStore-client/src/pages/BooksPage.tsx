import { Plus, BookOpen } from "lucide-react";
import { toast } from "sonner";

import Header from "../components/layout/Header";
import BooksTable from "../components/books/BooksTable";

import { mockBooks } from "../data/mockBooks";
import { useAuth } from "../context/useAuth";

export default function BooksPage() {
  const { user } = useAuth();

  const isAdmin = user?.role.toLowerCase() === "admin";
  const [selectedBook, setSelectedBook] = useState<BookDto | null>(null);
  const handleAdd = () => {
    setSelectedBook(null);
    setIsBookModalOpen(true);
  };

  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  

  const handleEdit = (book: BookDto) => {
  setSelectedBook(book);
  setIsBookModalOpen(true);
};

  return (
    <div className="min-h-screen bg-slate-50">

      <Header />

      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* Page heading */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Books
            </h2>

            <p className="text-slate-500 mt-1">
              Manage and explore your bookstore collection.
            </p>
          </div>

          <button
            onClick={handleAdd}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition"
          >
            <Plus size={19} />
            Add Book
          </button>

        </div>

        {/* Permission information */}
        <div className="flex items-center gap-3 mb-6 p-4 rounded-lg bg-blue-50 border border-blue-100">
          <BookOpen className="text-blue-600" size={20} />

          <p className="text-sm text-blue-800">
            {isAdmin
              ? "You have administrator access. You can add, edit, and delete books."
              : "You are viewing the bookstore as a regular user. Modification operations are restricted to administrators."}
          </p>
        </div>

        {/* Books summary */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6">
          <p className="text-sm text-slate-500">Total books</p>
          <p className="text-3xl font-bold text-slate-800 mt-1">
            {mockBooks.length}
          </p>
        </div>

        {/* Books table */}
        <BooksTable
          books={mockBooks}
          isAdmin={isAdmin}
        />

      </main>
    </div>
  );
}



