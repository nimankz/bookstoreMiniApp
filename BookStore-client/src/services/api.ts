import { jsx } from "react/jsx-runtime";


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


  const roleResponse = await fetch(`${API_URL}/me`, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${data.loginToken}`,
  },
});


const responseText = await roleResponse.text();


const userData = JSON.parse(responseText);


localStorage.setItem("user", JSON.stringify(userData));

  if(!response){
    alert("sth went wrong")
  }
  
  localStorage.setItem("token",data.loginToken);
  
  // const dataRole = await JSON.stringify(roleResponse);
  // alert(roleResponse)
  // alert(dataRole)
  // if(roleResponse) localStorage.setItem("user",dataRole)
}


//=========================================login============================================
//=========================================books============================================
interface addBook

{
    name: string,
    authorName: string,
    price: number,
    releaseDate:string ,
    genre: string
}

interface newBook

{
    id: number,
    name: string,
    authorName: string,
    price: number,
    releaseDate:string ,
    genre: string
}

export async function getBooks() {
  const response = await fetch(API_URL+"/Books",{
    method:"GET",
  })
  const data = await response.json();
  return(data);
}

export async function editBookAsync(newBook:newBook) {
  const token = localStorage.getItem("token")
  if(newBook){
      const response = await fetch(API_URL+"/Books/"+newBook.id.toString(),{
        method: "PUT",
        headers:{
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body:JSON.stringify(newBook)
        
      })
      if (!response.ok) {
        throw new Error(
      response.status === 403
        ? "You are not authorized to edit books."
        : `Failed to edit book. Status: ${response.status}`
    );
  }

  return response.json();
    

  }

}

export async function deleteBookAsync(numberId:number) {
  const token = localStorage.getItem("token");
  if(token || numberId){
    const response = await fetch(API_URL+"/Books/"+numberId.toString(),{
      method:"DELETE",
      headers:{
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
        throw new Error(
      response.status === 403
        ? "You are not authorized to delete books."
        : `Failed to edit book. Status: ${response.status}`
      )}

      return response.json();

  }
  }


  export async function addBookAsync(addBook:addBook) {
  const token = localStorage.getItem("token")
  if(addBook){
      console.log("from api")
      console.log(JSON.stringify(addBook))
      const response = await fetch(API_URL+"/books",{
        method: "POST",
        headers:{
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body:JSON.stringify(addBook)
        
      })
      if (!response.ok) {
        throw new Error(
      response.status === 403
        ? "You are not authorized to add books."
        : `Failed to edit book. Status: ${response.status}`
    );
  }

  return response.json();
    

  }

}

  


//=========================================books============================================