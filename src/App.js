import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Calendar from './components/Calendar/Calendar';

class App extends Component {

      render() {
          return (
        <div>
            <NavBar />

            <Calendar />

        </div>
      );
    }
}

export default App;
