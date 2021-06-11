import axios from "axios";
import React,  { useEffect, useState } from "react";
import { connect } from "react-redux";

const Pokedex = ({verPokemon}) => {
  const [pokemonData, setPokemonData] = useState({});

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=150`)
      .then(function (response) {
        const { data } = response;
        const { results } = data;
        const newPokemonData = {};
        results.forEach((pokemon, index) => {
          newPokemonData[index + 1] = {
            id: index + 1,
            name: pokemon.name,
            url: pokemon.url,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              index + 1
            }.png`,
          };
        });
        setPokemonData(newPokemonData);
      });
  }, []);
  return (
    <>
      {pokemonData ? (
        <div>
          {Object.keys(pokemonData).map(
            (pokemonId) =>(
              <article className="pokemon" key={pokemonData[pokemonId].name}>
                <img src={pokemonData[pokemonId].sprite} alt={pokemonData[pokemonId].name} />
                <h3>{pokemonData[pokemonId].name}</h3>
                <div>
                  <button onClick={() => verPokemon(pokemonData[pokemonId].id)}>View</button>
                </div>
              </article>            
          ))}
        </div>
        
      ) : (
        <h1>cargando</h1>
      )}
    </>
  );
};
const mapStateToProps = (state) => ({
  pokemones: state.pokemones,
});

const mapDispatchToProps = (dispatch) => ({
  verPokemon(id){
    dispatch({
      type: "VER_POKEMON",
      id
    })
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Pokedex);