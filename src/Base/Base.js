import { Button, ButtonGroup } from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";

const Base = ({ title, description, children }) => {
  const history = useHistory();
  return (
    <div className="main-component base-component">
      <header>
        <h1 className="heading">{title}</h1>
        <div>
          <ButtonGroup variant="text" aria-label="text button group" margin="10px">
            <Button onClick={() => history.push("/")}>Home</Button>
            <Button onClick={() => history.push("/Library")}>
              Library Dashboard
            </Button>
            <Button onClick={() => history.push("/add")}>Add New Book</Button>
           
          </ButtonGroup>
        </div>
      </header>
      <main className="main-segment">
        <h2 style={{ color: "gray" ,margin:"15px"}}>{description}</h2>
        <br />
        <div>{children}</div>
      </main>
    </div>
  );
};

export default Base;
