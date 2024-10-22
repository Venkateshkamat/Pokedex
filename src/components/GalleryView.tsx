import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './GalleryView.css'; 

const proxyUrl = 'https://thingproxy.freeboard.io/fetch/';

interface PokemonType {
  type: { name: string };
}

interface Pokemon {
  name: string;
  url: string;
  sprites: { front_default: string };
  types: PokemonType[];
}

const GalleryView: React.FC = () => {
  const [gallery, setGallery] = useState<Pokemon[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemon = async () => {
      const pokemonPromises = [];
      for (let i = 1; i <= 100; i++) {
        pokemonPromises.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`));
      }
      const responses = await Promise.all(pokemonPromises);
      setGallery(responses.map((res) => res.data));
    };
    fetchPokemon();
  }, []);

  const toggleType = (type: string) => {
    setSelectedTypes((prevTypes) =>
      prevTypes.includes(type)
        ? prevTypes.filter((t) => t !== type)
        : [...prevTypes, type]
    );
  };

  const clearFilters = () => setSelectedTypes([]);

  const filteredGallery =
    selectedTypes.length === 0
      ? gallery
      : gallery.filter((pokemon) =>
          pokemon.types.some((t) => selectedTypes.includes(t.type.name))
        );

  return (
    <div className="gallery-container">
      <h2>Filter by Type</h2>
      <div className="type-filters">
        {['fire', 'water', 'grass', 'electric'].map((type) => (
          <button
            key={type}
            className={`type-button ${selectedTypes.includes(type) ? 'selected' : ''}`}
            onClick={() => toggleType(type)}
          >
            {type}
          </button>
        ))}
        <button className="clear-button" onClick={clearFilters}>
          Clear Filters
        </button>
      </div>

      <div className="gallery-grid">
        {filteredGallery.map((pokemon) => (
          <div
            key={pokemon.name}
            className="pokemon-card"
            onClick={() => navigate(`/mp2/pokemon/${pokemon.name}`)}
          >
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p>{pokemon.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryView;
