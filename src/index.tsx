import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { PokemonProvider } from './PokemonContext'; 


const rootElement = document.getElementById('root');


if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <PokemonProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PokemonProvider>
    </React.StrictMode>
  );
} else {
  console.error('Root element not found!');
}
