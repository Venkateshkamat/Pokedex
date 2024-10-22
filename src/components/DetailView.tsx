import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
const proxyUrl = 'https://thingproxy.freeboard.io/fetch/';

// Define types for Pokemon attributes
interface PokemonType {
  type: { name: string };
}

interface Ability {
  ability: { name: string };
}

interface Stat {
  stat: { name: string };
  base_stat: number;
}

interface Pokemon {
  id: number;
  name: string;
  sprites: { front_default: string };
  height: number;
  weight: number;
  types: PokemonType[];
  abilities: Ability[];
  stats: Stat[];
}

const DetailView: React.FC = () => {
  const { name } = useParams<{ name: string }>(); // Get Pokémon name from route params
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  // Fetch Pokémon details by name from API
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(`${proxyUrl}https://pokeapi.co/api/v2/pokemon/${name}`);
        setPokemon(response.data);
      } catch (error) {
        console.error('Error fetching Pokémon details:', error);
      }
    };
    fetchPokemon();
  }, [name]);

  // Navigate to the previous or next Pokémon using its ID
  const handleNavigation = (direction: 'prev' | 'next') => {
    if (!pokemon) return;
    const newId = direction === 'prev' ? pokemon.id - 1 : pokemon.id + 1;

    // Handle edge cases: Pokémon IDs start at 1, and PokeAPI has 1010 Pokémon
    if (newId < 1) return;
    if (newId > 1010) return;

    // Navigate to the new Pokémon using its ID
    navigate(`/mp2/pokemon/${newId}`);
  };

  if (!pokemon) return <p>Loading...</p>;

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>{pokemon.name.toUpperCase()}</h1>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        style={{ width: '200px', height: '200px' }}
      />

      <h2>Details</h2>
      <p><strong>Height:</strong> {pokemon.height / 10} m</p>
      <p><strong>Weight:</strong> {pokemon.weight / 10} kg</p>

      <h3>Types</h3>
      <ul>
        {pokemon.types.map((t) => (
          <li key={t.type.name}>{t.type.name}</li>
        ))}
      </ul>

      <h3>Abilities</h3>
      <ul>
        {pokemon.abilities.map((a) => (
          <li key={a.ability.name}>{a.ability.name}</li>
        ))}
      </ul>

      <h3>Stats</h3>
      <ul>
        {pokemon.stats.map((s) => (
          <li key={s.stat.name}>
            <strong>{s.stat.name}:</strong> {s.base_stat}
          </li>
        ))}
      </ul>

      <div style={{ marginTop: '20px' }}>
        <button
          onClick={() => handleNavigation('prev')}
          style={{ marginRight: '10px', padding: '10px', cursor: 'pointer' }}
        >
          Previous
        </button>
        <button
          onClick={() => handleNavigation('next')}
          style={{ padding: '10px', cursor: 'pointer' }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DetailView;
