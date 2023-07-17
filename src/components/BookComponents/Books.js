// import React, { useState } from "react";
import Base from "../../Base/Base";
import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import { toast } from "react-toastify";
import { BookAppStates } from "../../Context/BookContext.js";

const Books = () => {
  const{books,setBooks}=BookAppStates();
  // console.log(books)
  const history = useHistory();
  //  Delete functions


  const deleteStudDetail = async (bookid) => {
    // console.log(bookid);
      // toast message
    toast('Deleted Successfully',{position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    icon: '👍',
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark"});
    const response = await fetch(
      `https://64b53221f3dbab5a95c6e907.mockapi.io/Books/${bookid}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    if (data) {
      const remainingBooks = books.filter(
        (books, id) => books.id !== bookid
      );
      setBooks(remainingBooks);
    }
  };


  return (
    <Base
      title={"Books Dashboard"}
      description={"This page content all Book data"}
    >
      <p>
        <b>Note:</b>If you make any <b>changes</b> go to Home/Dashboard and
        refresh the tab to see changes...
      </p>
      <br />
      <div className="card-container">
        {books.sort((a, b) => a.name.localeCompare(b.name)).map((books, id) => (
          <div className="card" key={id} >
            <div className="content">
              <h3 style={{ color: "gray" }}>{books.name}</h3>
              <div className="value">
                <p>
                  <b>Author:</b> {books.author}
                </p>
                <p>
                  <b>Price: </b>
                  {books.Price}
                </p>
              </div>
            </div>
            <div className="control">
              <Button  variant="outlined" startIcon={<EditNoteOutlinedIcon /> } onClick={() => history.push(`/edit/${id}`)}>
                Edit
              </Button>{" "}
              <Button  variant="outlined" startIcon={<DeleteOutlineOutlinedIcon /> } onClick={()=>  deleteStudDetail(books.id)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Base>
  );
};

export default Books;
