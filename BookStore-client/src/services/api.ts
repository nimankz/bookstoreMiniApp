import { Loader } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;



//=========================================login============================================
interface loginRequest  {
  username:string,
  password:string
}
interface LoginResponse{
  loginToken : string
}

export async function loginRequestAsync(info:loginRequest){
  const response = await fetch(API_URL+"/login",{
    method:"POST",
    body:JSON.stringify({username:info.username, password:info.password}),
    headers:{"Content-Type":"application/json"},
  })
  if(!response){
    alert("sth went wrong")
  }
  const data:LoginResponse = await response.json();
    localStorage.setItem("token",data.loginToken);
}


//=========================================login============================================
//=========================================books============================================



export async function getBooks() {
  const response = await fetch(API_URL+"/Books",{
    method:"GET",
  })
  const data = await response.json();
  return(data);
}

//=========================================books============================================