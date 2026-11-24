
// import { useState, type FormEvent } from "react";
// import { useNavigate } from "react-router-dom";
// import { LockKeyhole, BookOpen } from "lucide-react";
// import { toast } from "sonner";

import { useState, type FormEvent } from "react"
import { loginRequestAsync } from "../services/api";
import { useNavigate } from "react-router-dom";

// import { useAuth } from "../context/useAuth";

// const API_URL = import.meta.env.VITE_API_URL;

// export default function LoginPage() {

//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const [userName, setUserName] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (event: FormEvent) => {

//     event.preventDefault();

//     if (!userName.trim() || !password) {
//       toast.error("Please enter your username and password.");
//       return;
//     }

//     try {

//       setLoading(true);

//       const response = await fetch(`${API_URL}/login`, {
//         method: "POST",

//         headers: {
//           "Content-Type": "application/json",
//         },

//         body: JSON.stringify({
//           userName,
//           password,
//         }),
//       });

//       if (response.status === 401) {
//         toast.error("Invalid username or password.");
//         return;
//       }

//       if (!response.ok) {
//         throw new Error("Something went wrong.");
//       }

//         const data = await response.json();

//         console.log("Login response:", data);

//         if (!data.loginToken) {
//         throw new Error("The server did not return a token.");
//         }

//         login(data.loginToken, userName);
//         localStorage.setItem("token", data.loginToken);


//         toast.success("Welcome to BookStore!");
//         navigate("/books");

//     } catch (error) {

//       console.error(error);

//       toast.error(
//         "Unable to connect to the server. Please try again."
//       );

//     } finally {

//       setLoading(false);

//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">

//       <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

//         <div className="flex flex-col items-center mb-8">

//           <div className="bg-blue-100 p-4 rounded-full mb-4">
//             <BookOpen className="w-9 h-9 text-blue-600" />
//           </div>

//           <h1 className="text-3xl font-bold text-slate-800">
//             BookStore
//           </h1>

//           <p className="text-slate-500 mt-2">
//             Sign in to your account
//           </p>

//         </div>

//         <form onSubmit={handleSubmit} className="space-y-5">

//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-2">
//               Username
//             </label>

//             <input
//               type="text"
//               value={userName}
//               onChange={(e) => setUserName(e.target.value)}
//               placeholder="Enter your username"
//               className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-2">
//               Password
//             </label>

//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter your password"
//               className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold rounded-lg py-3 transition"
//           >
//             {loading ? "Signing in..." : "Sign In"}
//           </button>

//         </form>

//         <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-400">
//           <LockKeyhole size={15} />
//           Secure JWT authentication
//         </div>

//       </div>

//     </div>
//   );
// }




export default function LoginPage(){

  const [username, updateUsername] = useState<string>("");
  const [password, updatePassword] = useState<string>("");
  const navigate = useNavigate();

  
  const myrequest= async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
      const result = await loginRequestAsync({
        username, password
      })
      console.log("login successful:", result);
      
      navigate("/books");

    } catch(error){
      console.error("login failed:", error);
    }

  };
  
  // return(
  //   <>
  //     <form onSubmit={myrequest}>
  //       <label>user name</label>
  //       <input type="text" onChange={(e) => updateUsername(e.target.value)} value={username}/>
  //       <br></br>
  //       <label>password</label>
  //       <input type="password" onChange={(e) => updatePassword(e.target.value)} value={password}/>
  //       <button type="submit">login</button>
  //     </form>
  //   </>
  // )

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          BookStore
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Sign in to manage your bookstore
        </p>
      </div>

      <form onSubmit={myrequest} className="space-y-5">

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => updateUsername(e.target.value)}
            placeholder="Enter your username"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => updatePassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 active:scale-[0.98]"
        >
          Sign in
        </button>

      </form>

      <p className="mt-6 text-center text-xs text-gray-400">
        BookStore Management System
      </p>

    </div>
  </div>
);
}