import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Pokemon {
  name: string;
  base_experience: number;
}

const ListView: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortField, setSortField] = useState<string>('name'); // Sorting field (default: name)
  const [sortOrder, setSortOrder] = useState<string>('asc'); // Sorting order (default: ascending)

  // Fetch Pokémon data
  useEffect(() => {
    const fetchPokemon = async () => {
      const pokemonPromises = [];
      for (let i = 1; i <= 20; i++) {
        pokemonPromises.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`));
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
    // Sort by the selected field
    if (sortField === 'name') {
      if (sortOrder === 'asc') return a.name.localeCompare(b.name);
      return b.name.localeCompare(a.name);
    } else if (sortField === 'base_experience') {
      if (sortOrder === 'asc') return a.base_experience - b.base_experience;
      return b.base_experience - a.base_experience;
    }
    return 0;
  });

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
          <li key={pokemon.name}>
            {pokemon.name} - Base Experience: {pokemon.base_experience}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListView;
