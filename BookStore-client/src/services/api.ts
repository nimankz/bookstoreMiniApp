
const API_URL = import.meta.env.VITE_API_URL;

interface loginRequest  {
  username:string,
  password:string
}






export async function getBooks() {
  const response = await fetch(API_URL+"/Books",{
    method:"GET",
  })
  const data = await response.json();
  return(data);
}