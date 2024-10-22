import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, ListItem, ListItemButton, ListItemText, Select, MenuItem, TextField } from '@mui/material';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import './ListView.css'; // Import the external CSS file

const proxyUrl = 'https://thingproxy.freeboard.io/fetch/';

interface Pokemon {
  name: string;
  base_experience: number;
  id: number;
}

const ListView: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortField, setSortField] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const navigate = useNavigate();


  useEffect(() => {
    const fetchPokemon = async () => {
      const pokemonPromises = [];
      for (let i = 1; i <= 50; i++) {
        pokemonPromises.push(axios.get(`${proxyUrl}https://pokeapi.co/api/v2/pokemon/${i}`));
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
    if (sortField === 'name') {
      return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    }
    return sortOrder === 'asc' ? a.base_experience - b.base_experience : b.base_experience - a.base_experience;
  });

  const handlePokemonClick = (id: number) => {
    navigate(`/mp2/pokemon/${id}`);
  };

  const renderRow = (props: ListChildComponentProps) => {
    const { index, style } = props;
    const pokemon = sortedPokemon[index];

    return (
      <ListItem style={style} key={pokemon.id} component="div" disablePadding>
        <ListItemButton onClick={() => handlePokemonClick(pokemon.id)}>
          <ListItemText
            primary={`${pokemon.name} - Base Experience: ${pokemon.base_experience}`}
          />
        </ListItemButton>
      </ListItem>
    );
  };

  return (
    <div className="list-container">
      {/* Search bar */}
      <TextField
        label="Search Pokémon"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />

      {/* Sort Field */}
      <Select value={sortField} onChange={(e) => setSortField(e.target.value)} className="select-field">
        <MenuItem value="name">Name</MenuItem>
        <MenuItem value="base_experience">Base Experience</MenuItem>
      </Select>

      {/* Sort Order */}
      <Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="select-field">
        <MenuItem value="asc">Ascending</MenuItem>
        <MenuItem value="desc">Descending</MenuItem>
      </Select>

      {/* Virtualized List */}
      <Box className="list-box">
        <FixedSizeList
          height={800}
          width={560}
          itemSize={50}
          itemCount={sortedPokemon.length}
          overscanCount={5}
        >
          {renderRow}
        </FixedSizeList>
      </Box>
    </div>
  );
};

export default ListView;
