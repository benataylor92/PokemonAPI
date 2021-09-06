import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [pokemon, setPokemon] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`)
      .then((response) => response.json())
      .then((results) => {
        setPokemon(results.results);
      });
  }, []);

  const searchPokemon = (searchValue) => {
    setSearchInput(searchValue)
    if (searchInput !== '') {
        const filteredData = pokemon.filter((item) => {
            return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
        })
        setFilteredResults(filteredData)
    }
    else{
        setFilteredResults(pokemon)
    }
}

  return (
    <div className="App">
        <label for="fname">Pokemon Name: </label>
        <input type="text" id="fname" name="fname" onChange={(e) => searchPokemon(e.target.value)} /><br></br>

      {searchInput.length > 1 ? filteredResults.map(a => <tr>{a.name}</tr>) : pokemon.map(a => <tr>{a.name}</tr>) }
    </div>
  );
}

export default App;
