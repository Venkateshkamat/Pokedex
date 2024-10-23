import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./DetailView.css";

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
          `https://pokeapi.co/api/v2/pokemon/${name}`
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

    navigate(`/pokemon/${newId}`);
  };

  if (!pokemon) return <p>Loading...</p>;

  return (
    <div className="detail-container">
      
      <div className="layout-container">
        {/* image container */}
        <div className="Image-container">
        <h1 className="pokemon-name">{pokemon.name.toUpperCase()}</h1>
          <img
            className="pokemon-image"
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
          />
        </div>
        {/* deatils container */}
        <div className="details">
          <div className="info-container">
            <div className="subtitle-container">
            <h2 className="subtitle">Details</h2>
            </div>
            <div className="info-container-container">
              <p className="info">Height: {pokemon.height / 10} m</p>
              <p className="info">Weight: {pokemon.weight / 10} kg</p>
            </div>
          </div>

          <div className="info-container">
            <div className="subtitle-container">
            <h3 className="subtitle">Types</h3>
            </div>
            <div className="info-container-container">
              {pokemon.types.map((t) => (
                <p key={t.type.name} className="info">
                  {t.type.name}
                </p>
              ))}
            </div>
          </div>
          <div className="info-container">
            <div className="subtitle-container">
              <h3 className="subtitle">Abilities</h3>
            </div>
            <div className="info-container-container">
              {pokemon.abilities.map((a) => (
                <p key={a.ability.name} className="info">
                  {a.ability.name}
                </p>
              ))}
            </div>
          </div>

          <div className="info-container">
            <div className="subtitle-container">
              <h3 className="subtitle">Stats</h3>
            </div>
            <div className="info-container-container">
              {pokemon.stats.map((s) => (
                <p key={s.stat.name} className="info">
                  {s.stat.name} : {s.base_stat}
                </p>
              ))}
            </div>
          </div>
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
