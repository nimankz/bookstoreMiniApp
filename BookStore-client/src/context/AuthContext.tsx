
import {
  createContext,
  useState,
  type ReactNode,
} from "react";

import { jwtDecode } from "jwt-decode";

interface User {
  userName: string;
  role: string;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  login: (token: string, fallbackUserName: string) => void;
  logout: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {

  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem("token")
  );

  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");

    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (newToken: string, fallbackUserName: string) => {

    const payload = jwtDecode<Record<string, unknown>>(newToken);

    const role =
      payload.role ??
      payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    const userName =
      payload.unique_name ??
      payload.name ??
      payload.sub ??
      fallbackUserName;

    const newUser: User = {
      userName: String(userName),
      role: String(role),
    };

    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));

    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// export function useAuth() {

//   const context = useContext(AuthContext);

//   if (!context) {
//     throw new Error("useAuth must be used inside AuthProvider");
//   }

//   return context;
// }
