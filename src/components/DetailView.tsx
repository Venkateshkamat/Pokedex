import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./DetailView.css"; /// Import the CSS file

const proxyUrl = "https://thingproxy.freeboard.io/fetch/";

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
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(
          `${proxyUrl}https://pokeapi.co/api/v2/pokemon/${name}`
        );
        setPokemon(response.data);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      }
    };
    fetchPokemon();
  }, [name]);

  const handleNavigation = (direction: "prev" | "next") => {
    if (!pokemon) return;
    const newId = direction === "prev" ? pokemon.id - 1 : pokemon.id + 1;

    if (newId < 1 || newId > 1010) return;

    navigate(`/mp2/pokemon/${newId}`);
  };

  if (!pokemon) return <p>Loading...</p>;

  return (
    <div className="detail-container">
      <h1 className="title">Pokemon Details</h1>
      <div className="layout-container">
        {/* image container */}
        <div className="Image-container">
          <img
            className="pokemon-image"
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
          />
        </div>

        {/* deatils container */}
        <div className="details">
          <h1 className="pokemon-name">{pokemon.name.toUpperCase()}</h1>
          <h2 className="subtitle">Details</h2>
          <p className="info">Height: {pokemon.height / 10} m</p>
          <p className="info">Weight: {pokemon.weight / 10} kg</p>

          <h3 className="subtitle">Types</h3>          
          {pokemon.types.map((t) => (
            <p key={t.type.name} className="info">
              {t.type.name}
            </p>
          ))}

          <h3 className="subtitle">Abilities</h3>
          <ul className="ability-list">
            {pokemon.abilities.map((a) => (
              <li key={a.ability.name}>{a.ability.name}</li>
            ))}
          </ul>

          <h3 className="subtitle">Stats</h3>
          <ul className="stat-list">
            {pokemon.stats.map((s) => (
              <li key={s.stat.name}>
                <strong>{s.stat.name}:</strong> {s.base_stat}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="navigation-buttons">
        <button onClick={() => handleNavigation("prev")}>Previous</button>
        <button onClick={() => handleNavigation("next")}>Next</button>
      </div>
    </div>
  );
};

export default DetailView;
