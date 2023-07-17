import React, { useState } from "react";
import Base from "../../Base/Base";
import { useHistory } from "react-router-dom";
import { Button, TextField,Snackbar, IconButton  } from "@mui/material";
import * as yup from 'yup'
import { useFormik } from "formik";
// import { toast } from "react-toastify";
import { BookAppStates } from "../../Context/BookContext.js";
// form validation
export const filedValidationScheme=yup.object({
  name:yup.string().required("Please fill book name"),
  author:yup.string(),
  Price:yup.number().required("Please fill book price")
  })

const AddBooks = () => {
  const{books,setBooks}=BookAppStates();
  const{handleSubmit,values,handleChange,handleBlur,touched,errors}=useFormik({
    initialValues:{
      name:"",
      author:"",
      Price:""
    },
    validationSchema:filedValidationScheme,
    onSubmit:(newBook)=>{
      // console.log("onsubmit",newBooks)
      createBook(newBook)
    }
  })
 
  const history = useHistory();

  // ---------------------------------------------------------------------------------------------------------------------------------------
  // pop-up message 
 const [open,setOpen]=useState(false);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    history.push("/Library");
  };
  const action=(
    <React.Fragment> 
     <IconButton size="small"
     aria-label="close"
     color="inherit"
     onClick={handleClose}>close</IconButton>
    </React.Fragment>
  );
// pop-up end------------------------------------------------------------------------------------------------------------------------------------------------


  const createBook = async (newBookData) => {

    const response = await fetch(
      "https://64b53221f3dbab5a95c6e907.mockapi.io/Books",
      {
        method: "POST",
        body: JSON.stringify(newBookData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setBooks([...books, data]);
    // history.push("/books");
    handleClick();
  };
  return (
    <Base
      title={"Add New Book Details"}
      description={"We can able to add new books details here... "}
    >
      <div>
        <form onSubmit={handleSubmit} className="cards">
      <TextField
          label="Enter Name"
          id="outlined-size-small"
          name="name"
          type="name"
          size="small"
          onBlur={handleBlur}
          value={values.name}
          onChange={handleChange}
        />
       <div style={{color:"crimson",fontSize:"small"}}>{touched.name && errors ? errors.name:""}</div> 
       <TextField
          label="Author"
          id="outlined-size-small"
          name="author"
          type="author"
          size="small"
          onBlur={handleBlur}
          value={values.author}
          onChange={handleChange}
        />
          <div style={{color:"crimson",fontSize:"small"}}>{touched.author &&errors ? errors.author:""}</div>
       <TextField
          label="Price"
          id="outlined-size-small"
          name="Price"
          type="Price"
          onBlur={handleBlur}
          size="small"
          value={values.Price}
          onChange={handleChange}
        />
          <div style={{color:"crimson",fontSize:"small"}}>{touched.Price &&errors ? errors.Price:""}</div>
        <Button variant="text"type="submit" >Add Book Detail</Button>
        {/* pop-up message */}
     <Snackbar open={open} autoHideDuration={3000}  onClose={handleClose} message="Added Successfully" action={action}/>
     </form>
      </div>
    </Base>
  );
};

export default AddBooks;
