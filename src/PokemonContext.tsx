import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';


interface Pokemon {
  name: string;
  url: string;
}

interface PokemonContextType {
  pokemonList: Pokemon[];
}

const PokemonContext = createContext<PokemonContextType>({ pokemonList: [] });

export const usePokemon = () => useContext(PokemonContext);

export const PokemonProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  useEffect(() => {
    const proxyUrl = 'https://thingproxy.freeboard.io/fetch/';
    axios.get(`${proxyUrl}https://pokeapi.co/api/v2/pokemon?limit=100`).then((response) => {
      setPokemonList(response.data.results);
    });
  }, []);

  return (
    <PokemonContext.Provider value={{ pokemonList }}>
      {children}
    </PokemonContext.Provider>
  );
};
