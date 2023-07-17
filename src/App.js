import "./App.css";
import AddBooks from "./components/BookComponents/AddBooks";
import Books from "./components/BookComponents/Books";
import {Switch,Route} from "react-router-dom"
import UpdateBooksDetails from "./components/BookComponents/UpdateBooksDetails";
import NoPage from "./components/NoPage/NoPage";
import Dashboard from "./components/Dashboard/Dashboard";


function App() {
  return (

    <div className="App">
      <Switch>
      <Route exact path="/">
          <Dashboard/>
        </Route>
        <Route path="/Library">
        <Books
         />
        </Route>
        <Route path="/add">
          <AddBooks
          />
        </Route>
        <Route path="/edit/:id/">
          <UpdateBooksDetails
         />
        </Route>
        <Route path="**">
          <NoPage/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
