import React, { Component } from 'react';
import {Navbar, NavbarBrand} from 'reactstrap';
import './App.css';
import Menu from './components/MenuComponent'; 
import {DISHES} from './shared/dishes'

class App extends Component{ 
  render(){
    return (
      <div>
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">
              Ristorante con Fusion
            </NavbarBrand>
          </div>
        </Navbar>
        <Menu dishes = {DISHES}/>
      </div>
    );
  }
}

export default App;
