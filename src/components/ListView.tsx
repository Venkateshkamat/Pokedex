import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import axios from 'axios';
const proxyUrl = 'https://thingproxy.freeboard.io/fetch/'; // Public CORS proxy

interface Pokemon {
  name: string;
  base_experience: number;
  id: number; // Add the ID to be used for navigation
}

const ListView: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortField, setSortField] = useState<string>('name'); // Sorting field (default: name)
  const [sortOrder, setSortOrder] = useState<string>('asc'); // Sorting order (default: ascending)

  const navigate = useNavigate(); // Initialize navigation function

  // Fetch Pokémon data
  useEffect(() => {
    const fetchPokemon = async () => {
      const pokemonPromises = [];
      for (let i = 1; i <= 20; i++) {
        pokemonPromises.push(axios.get(`${proxyUrl}https://pokeapi.co/api/v2/pokemon/${i}`));
      }
      const responses = await Promise.all(pokemonPromises);
      setPokemonList(responses.map((res) => res.data));
    };
    fetchPokemon();
  }, []);

  // Handle search query
  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort the filtered Pokémon list
  const sortedPokemon = [...filteredPokemon].sort((a, b) => {
    if (sortField === 'name') {
      return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    } else if (sortField === 'base_experience') {
      return sortOrder === 'asc'
        ? a.base_experience - b.base_experience
        : b.base_experience - a.base_experience;
    }
    return 0;
  });

  // Handle click on a Pokémon to navigate to the Detail View
  const handlePokemonClick = (id: number) => {
    navigate(`/mp2/pokemon/${id}`); // Navigate to the detail view with the Pokémon's ID
  };

  return (
    <div>
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search Pokémon"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: '20px' }}
      />

      {/* Sort by field dropdown */}
      <select value={sortField} onChange={(e) => setSortField(e.target.value)}>
        <option value="name">Name</option>
        <option value="base_experience">Base Experience</option>
      </select>

      {/* Sort order dropdown */}
      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      {/* Pokémon List */}
      <ul style={{ marginTop: '20px' }}>
        {sortedPokemon.map((pokemon) => (
          <li
            key={pokemon.id}
            onClick={() => handlePokemonClick(pokemon.id)} // On click, navigate to detail view
            style={{ cursor: 'pointer', marginBottom: '10px' }}
          >
            {pokemon.name} - Base Experience: {pokemon.base_experience}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListView;
