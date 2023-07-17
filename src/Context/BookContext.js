import React, { createContext, useContext, useEffect, useState } from "react";
const LibraryCtx=createContext(null);
const LibraryProvider = ({children}) => {
    const [books,setBooks]=useState([]);
    useEffect (()=>{
   
        const getBookData=async()=>{
            
          const response=await fetch("https://64b53221f3dbab5a95c6e907.mockapi.io/Books",{
              method:"GET",
             })
               const data=await response.json();
              //  console.log (data)
              if(data){
                setBooks(data);
              }
            }
            getBookData();
      },[])
    return (
       <LibraryCtx.Provider 
       value={{books,setBooks}}
       >
        {children}
       </LibraryCtx.Provider>
        
      );
}
 export const BookAppStates=()=>{
    return useContext(LibraryCtx)
 }
export default LibraryProvider;