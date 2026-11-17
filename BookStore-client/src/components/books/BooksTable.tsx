import { Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { Book } from "../../types/book";

interface BooksTableProps {
  books: Book[];
  isAdmin: boolean;
}

export default function BooksTable({
  books,
  isAdmin,
}: BooksTableProps) {

  const handleEdit = (book: Book) => {
    toast.info(`Edit "${book.name}" - modal coming next!`);
  };

  const handleDelete = (book: Book) => {
    toast.info(`Delete "${book.name}" - confirmation coming next!`);
  };

  if (books.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-10 text-center">
        <p className="text-slate-500">No books found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">

      <div className="overflow-x-auto">
        <table className="w-full text-left">

          <thead className="bg-slate-50 border-b border-slate-200">
            <tr className="text-sm text-slate-500">
              <th className="px-6 py-4 font-semibold">ID</th>
              <th className="px-6 py-4 font-semibold">Book Name</th>
              <th className="px-6 py-4 font-semibold">Price</th>
              <th className="px-6 py-4 font-semibold">Author</th>
              <th className="px-6 py-4 font-semibold">Publication Year</th>
              <th className="px-6 py-4 font-semibold text-center">
                Operations
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {books.map((book) => (
              <tr
                key={book.id}
                className="hover:bg-slate-50 transition"
              >
                <td className="px-6 py-4 text-sm text-slate-500">
                  #{book.id}
                </td>

                <td className="px-6 py-4">
                  <p className="font-medium text-slate-800">
                    {book.name}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {book.genre}
                  </p>
                </td>

                <td className="px-6 py-4 text-sm font-medium text-slate-700">
                  {book.price.toFixed(2)}
                </td>

                <td className="px-6 py-4 text-sm text-slate-600">
                  {book.authorName}
                </td>

                <td className="px-6 py-4 text-sm text-slate-600">
                  {book.releaseDate.slice(0, 4)}
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">

                    <button
                      onClick={() => handleEdit(book)}
                      title={
                        isAdmin
                          ? "Edit book"
                          : "Admin permission required"
                      }
                      className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 disabled:text-slate-300 disabled:cursor-not-allowed disabled:hover:bg-transparent transition"
                    >
                      <Edit size={18} />
                    </button>
                

                    <button
                      onClick={() => handleDelete(book)}
                      title={
                        isAdmin
                          ? "Delete book"
                          : "Admin permission required"
                      }
                      className="p-2 rounded-lg text-red-600 hover:bg-red-50 disabled:text-slate-300 disabled:cursor-not-allowed disabled:hover:bg-transparent transition"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}