import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { PokemonProvider } from './PokemonContext'; // Import the provider

ReactDOM.render(
  <PokemonProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </PokemonProvider>,
  document.getElementById('root')
);
