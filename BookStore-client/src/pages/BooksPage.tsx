import { useEffect, useState } from "react"
import { getBooks } from "../services/api"
import AddBookModal from "../components/modal/AddBookModal"
import DeleteBookModal from "../components/modal/DeleteConfirmModal"
import EditBookModal from "../components/modal/EditBookModal"
import type { NewBook } from "../components/modal/AddBookModal";

interface book {
  id:number,
  name:string,
  price:number
}

export default function BooksPage(){

  const [booksList, updateBooksList] = useState<book[]>([]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedBook, setSelectedBook] = useState<Book | null>(null);



  const handleEditClick = (book: book) => {
    setSelectedBook(book);
    setShowEditModal(true);
  };

  const handleDeleteClick = (book: book) => {
    setSelectedBook(book);
    setShowDeleteModal(true);
  };

  const handleEdit = (updatedBook: book) => {
    console.log("Book to edit:", updatedBook);
    // Your API request goes here.
  };

  const handleAdd = (newBook: NewBook) => {
    console.log("Book to add:", newBook);
    // Your API request goes here.
  };

  const handleDelete = (id: number) => {
    console.log("Book ID to delete:", id);
    // Your API request goes here.
  };

  useEffect(() => {

    async function loadBooks(){
      const result = await getBooks();

      if(result){
        updateBooksList(result);
      }
    }
    loadBooks();
  }, []);
    
  return(
    <>
      <h1>hello this is books page</h1>
      <table>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>price</th>
          <th>operations</th>
        </tr>
        {
        booksList.map((Element : book)=> (
          <tr>
            <td>{Element.id}</td>
            <td>{Element.name}</td>
            <td>{Element.price}</td>
            <td> <button onClick={() => handleEditClick(Element)}>edit</button> <button onClick={() => handleDeleteClick(Element)}>delete</button> </td>
          </tr>
        ))

      }

      </table>

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
      
    </>
  )
}