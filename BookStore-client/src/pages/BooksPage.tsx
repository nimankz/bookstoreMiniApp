import { useEffect, useState } from "react"
import { toast } from "sonner"
import { getBooks, editBookAsync, deleteBookAsync, addBookAsync } from "../services/api"
import AddBookModal from "../components/modal/AddBookModal"
import DeleteBookModal from "../components/modal/DeleteConfirmModal"
import EditBookModal from "../components/modal/EditBookModal"
import type { NewBook } from "../components/modal/AddBookModal";
import { Book } from "lucide-react"

export interface book {
    id: number,
    name: string,
    authorName: string,
    price: number,
    releaseDate:string ,
    genre: string
}

interface addBook

{
    name: string,
    authorName: string,
    price: number,
    releaseDate:string ,
    genre: string
}

export default function BooksPage(){

  const [booksList, updateBooksList] = useState<book[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<book | null>(null);
  const [role, setRole] = useState("user");



  const handleEditClick = (book: book) => {
    setSelectedBook(book);
    setShowEditModal(true);
  };

  const handleDeleteClick = (book: book) => {
    setSelectedBook(book);
    setShowDeleteModal(true);
  };

const handleEdit = async (updatedBook: book) => {
  try {
    await editBookAsync(updatedBook);

    updateBooksList((previousBooks) =>
      previousBooks.map((book) =>
        book.id === updatedBook.id ? updatedBook : book
      )
    );

    setShowEditModal(false);

    toast.success("Book updated successfully!");
  } catch (error) {
    toast.error(
      error instanceof Error ? error.message : "Something went wrong."
    );
  }
};

  const handleAdd = async (addBook: addBook) => {
    try{
      console.log("from bookpage:")
      console.log(JSON.stringify(addBook))
      await addBookAsync(addBook);
      const newBook:book = {
        id: booksList.length+1,
        name: addBook.name,
        authorName: addBook.authorName,
        releaseDate: addBook.releaseDate,
        price: addBook.price,
        genre: addBook.genre
      }

    
    updateBooksList((preList) => [...preList, newBook]);
    setShowDeleteModal(false);
      toast.success("your book is deleted.")

    }catch(error){
      toast.error(
      error instanceof Error ? error.message : "Something went wrong."
    )}
      

  };

  const handleDelete = async (id: number) => {
    try{
      await deleteBookAsync(id);
      updateBooksList((previousBooks) =>
        previousBooks.filter((book) =>
          book.id !== id
        )
    );
      setShowDeleteModal(false);
      toast.success("your book is deleted.")

    }catch(error){
        toast.error(
      error instanceof Error ? error.message : "Something went wrong."
    );
    }
  };

  useEffect(() => {

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setRole(parsedUser.role ?? "user");
    }
    async function loadBooks(){
      const result = await getBooks();

      if(result){
        updateBooksList(result);
      }
    }
    loadBooks();
  }, []);
    
  // return(
  //   <>
  //     <h1>hello this is books page</h1>
  //     <table>
  //       <tr>
  //         <th>id</th>
  //         <th>name</th>
  //         <th>author Name</th>
  //         <th>release date</th>
  //         <th>price</th>
  //         <th>genre</th>
  //         <th>operations</th>
  //       </tr>
  //       {
  //       booksList.map((Element : book)=> (
  //         <tr>
  //           <td>{Element.id}</td>
  //           <td>{Element.name}</td>
  //           <td>{Element.authorName}</td>
  //           <td>{Element.releaseDate}</td>
  //           <td>{Element.price}</td>
  //           <td>{Element.genre}</td>
  //           <td>
  //             <button onClick={() => handleEditClick(Element)}>edit</button>
  //             <button onClick={() => handleDeleteClick(Element)}>delete</button>
  //           </td>
  //         </tr>
  //       ))

  //     }

  //     </table>

  //     <EditBookModal
  //       canShow={showEditModal}
  //       updateModalState={() => setShowEditModal(false)}
  //       book={selectedBook}
  //       onSave={handleEdit}
  //     />

  //     <AddBookModal
  //       canShow={showAddModal}
  //       updateModalState={() => setShowAddModal(false)}
  //       onAdd={handleAdd}
  //     />

  //     <DeleteBookModal
  //       canShow={showDeleteModal}
  //       updateModalState={() => setShowDeleteModal(false)}
  //       book={selectedBook}
  //       onConfirm={handleDelete}
  //     />
      
  //   </>
  // )


  return (
  <div className="min-h-screen bg-gray-100 px-4 py-10 sm:px-8">

    <div className="mx-auto max-w-7xl">

      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Books
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Manage your bookstore collection
          </p>
        </div>
        <div>
          <h1>user role:</h1>
          <p>{role}</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:scale-[0.98]"
        >
          + Add New Book
        </button>
      </div>

      {/* Books Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">

            <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Author</th>
                <th className="px-6 py-4">Release Date</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Genre</th>
                <th className="px-6 py-4 text-center">Operations</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">

              {booksList.map((Element: book) => (
                <tr
                  key={Element.id}
                  className="transition hover:bg-gray-50"
                >
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-500">
                    #{Element.id}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 font-semibold text-gray-900">
                    {Element.name}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 text-gray-600">
                    {Element.authorName}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 text-gray-600">
                    {Element.releaseDate}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                    ${Element.price}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4">
                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
                      {Element.genre}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() => handleEditClick(Element)}
                        className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-100"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDeleteClick(Element)}
                        className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100"
                      >
                        Delete
                      </button>

                    </div>
                  </td>
                </tr>
              ))}

              {booksList.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No books found. Add your first book!
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>

      </div>

      {/* Modals */}
      <EditBookModal
        canShow={showEditModal}
        updateModalState={() => setShowEditModal(false)}
        book={selectedBook}
        onSave={handleEdit}
      />

      <AddBookModal
        canShow={showAddModal}
        updateModalState={() => setShowAddModal(false)}
        onAdd={handleAdd}
      />

      <DeleteBookModal
        canShow={showDeleteModal}
        updateModalState={() => setShowDeleteModal(false)}
        book={selectedBook}
        onConfirm={handleDelete}
      />

    </div>
  </div>
);
}