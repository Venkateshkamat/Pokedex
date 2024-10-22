import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ListView.css";

interface Pokemon {
  name: string;
  base_experience: number;
  id: number;
  sprites: { front_default: string };
}

const ListView: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortField, setSortField] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemon = async () => {
      const pokemonPromises = [];
      for (let i = 1; i <= 50; i++) {
        pokemonPromises.push(
          axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
        );
      }
      const responses = await Promise.all(pokemonPromises);
      setPokemonList(responses.map((res) => res.data));
    };
    fetchPokemon();
  }, []);

  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedPokemon = [...filteredPokemon].sort((a, b) => {
    if (sortField === "name") {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
    return sortOrder === "asc"
      ? a.base_experience - b.base_experience
      : b.base_experience - a.base_experience;
  });

  const handlePokemonClick = (id: number) => {
    navigate(`/mp2/pokemon/${id}`);
  };

  return (
    <div className="list-container">
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search Pokémon"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />

      {/* Sort Field */}
      <select
        value={sortField}
        onChange={(e) => setSortField(e.target.value)}
        className="select-field"
      >
        <option value="name">Name</option>
        <option value="base_experience">Base Experience</option>
      </select>

      {/* Sort Order */}
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="select-field"
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      {/* Pokémon List */}
      <div className="list-box">
        {sortedPokemon.map((pokemon) => (
          <div
            key={pokemon.id}
            className="list-item"
            onClick={() => handlePokemonClick(pokemon.id)}
          >
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <div className="pokemon-info">
              <div className="pokemon-name">{pokemon.name}</div>
              <div className="pokemon-experience">
                Base Experience: {pokemon.base_experience}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListView;
