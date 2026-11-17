import { BookOpen, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const isAdmin = user?.role.toLowerCase() === "admin";

  return (
    <header className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Branding */}
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <BookOpen className="text-blue-600" size={25} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-800">
              BookStore
            </h1>
            <p className="text-xs text-slate-500">
              Book management system
            </p>
          </div>
        </div>

        {/* User information */}
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-800">
              {user?.userName}
            </p>

            <span
              className={`text-xs font-medium ${
                isAdmin ? "text-blue-600" : "text-slate-500"
              }`}
            >
              {user?.role}
            </span>
          </div>

          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="font-bold text-blue-700">
              {user?.userName.charAt(0).toUpperCase()}
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}