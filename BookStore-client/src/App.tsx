import { Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import BooksPage from "./pages/BooksPage";
import ProtectedRoute from "./components/protectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/books" element={<BooksPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/books" replace />} />
    </Routes>
  );
}

export default App;