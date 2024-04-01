import React from 'react';
import './App.css';
import FormComponent from './FormComponent';
import { API_KEY } from './config';

function App() {return (
  <div className="App">
    <header className="App-header">
      <FormComponent apiKey={API_KEY}/>
    </header>
  </div>
);
}

export default App;
