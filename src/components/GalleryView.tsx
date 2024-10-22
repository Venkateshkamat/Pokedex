import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Define the structure of the Pokémon's type data
interface PokemonType {
  type: { name: string };
}

// Define the main Pokémon object structure
interface Pokemon {
  name: string;
  url: string;
  sprites: { front_default: string };
  types: PokemonType[];
}

const GalleryView: React.FC = () => {
  const [gallery, setGallery] = useState<Pokemon[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]); // Track selected types
  const navigate = useNavigate();

  // Fetch Pokémon data
  useEffect(() => {
    const fetchPokemon = async () => {
      const pokemonPromises = [];
      for (let i = 1; i <= 70; i++) {
        pokemonPromises.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`));
      }
      const responses = await Promise.all(pokemonPromises);
      setGallery(responses.map((res) => res.data));
    };
    fetchPokemon();
  }, []);

  // Toggle type selection
  const toggleType = (type: string) => {
    setSelectedTypes((prevTypes) =>
      prevTypes.includes(type)
        ? prevTypes.filter((t) => t !== type) // Remove if already selected
        : [...prevTypes, type] // Add if not selected
    );
  };

  // Clear all filters
  const clearFilters = () => setSelectedTypes([]);

  // Filter Pokémon based on selected types
  const filteredGallery =
    selectedTypes.length === 0
      ? gallery // No filter applied
      : gallery.filter((pokemon) =>
          pokemon.types.some((t) => selectedTypes.includes(t.type.name))
        );

  return (
    <div>
      <h2>Filter by Type</h2>
      <div style={{ marginBottom: '10px' }}>
        {/* Type Buttons */}
        {['fire', 'water', 'grass', 'electric'].map((type) => (
          <button
            key={type}
            onClick={() => toggleType(type)}
            style={{
              marginRight: '5px',
              backgroundColor: selectedTypes.includes(type) ? 'lightblue' : 'white',
              border: '1px solid black',
              borderRadius: '5px',
              padding: '5px 10px',
              cursor: 'pointer',
            }}
          >
            {type}
          </button>
        ))}

        {/* Clear Filters Button */}
        <button
          onClick={clearFilters}
          style={{
            marginLeft: '10px',
            padding: '5px 10px',
            backgroundColor: 'lightcoral',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Clear Filters
        </button>
      </div>

      {/* Gallery of Pokémon */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
        {filteredGallery.map((pokemon) => (
          <div
            key={pokemon.name}
            style={{ cursor: 'pointer', textAlign: 'center' }}
            onClick={() => navigate(`/mp2/pokemon/${pokemon.name}`)} // Navigate to DetailView
          >
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              style={{ width: '100px', height: '100px' }}
            />
            <p>{pokemon.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryView;
