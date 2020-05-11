import React,{ useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from 'react-router-dom';
import ReactSearchBox from 'react-search-box'
import ContactPost from "./ContactPost.js"
import ContactService from './services/ContactService';
// import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap'
// import Home from './Home';
// import AboutUs from './AboutUs';
// import ContactUs from './ContactUs';

function NavBar(){
  
  return(
      <div className="NavBar">
        <div className="Brand"><p>ContactBook</p></div>
        <div className="SearchBar"><input id="SearchBox" type="text" placeholder="Search.."/><button id="SearchButton"><img id ="SearchIcon"src="https://img.icons8.com/material-outlined/24/000000/search.png"/></button></div>
        <div className="About"><button id="AboutButton">About</button></div>
                 
      </div>
  )  
}

function Body(){
  const [contacts, setcontacts] = useState(null);

  useEffect(() => {
    if(!contacts) {
      getContacts();
    }
  })
  const getContacts = async () => {
    let res = await ContactService.getAll();
    console.log(res);
    setcontacts(res);
  }

  const renderContact = contact => {
    return (
      <li><ContactPost name={contact.name} number={contact.number}/></li>
      // <li key={product._id} className="list__item product">
      //   {/* <h3 className="product__name">{contact.name}</h3>
      //   <p className="product__description">{contact.number}</p> */}
      // </li>
    );
  };
  return(
    <div className="Body">
      <div className="LeftBar"></div>
      <div className="Contacts">
        <div id="Functions">
          
          <button id="ExportButton">
            <img src="https://img.icons8.com/offices/30/000000/export-csv.png"/>EXPORT
          </button>
          <button id="AddNewButton">
            <img id="AddNewIcon" src="https://img.icons8.com/color/50/000000/add.png"/>ADD NEW
          </button>
        </div>
        <ul id="ListContacts">
          {console.log("into the list")}
          
          {(contacts && contacts.length > 0) ? (
            contacts.map(contact => renderContact(contact))
          ) : (
            <p>No contacts found</p>
          )}
          {/* <li><ContactPost name="Rohan" number="9998887776"/></li>
          <li><ContactPost name="Raghav" number="9998887776"/></li>
          <li><ContactPost name="Qurram" number="9998887776"/></li>
          <li><ContactPost name="Anchit" number="9998887776"/></li> */}

        </ul>
      </div>
      <div className="RightBar"></div>
    </div>
  )
}




function App() {
  return (
    <div className="App">
      <NavBar/>
      <Body/>
      
    </div>
  );
}

export default App;
