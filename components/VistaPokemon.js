import axios from "axios"
import React,  { useEffect, useState } from 'react'
import { connect } from 'react-redux'

const VistaPokemon = ({vista}) =>{ 
    const [pokemonData, setPokemonData] = useState({});

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${vista}/`)
      .then((response) => {
        const { data } = response;
        console.log(data);
        var newPokemonData = {
              id: vista, 
              name: data.name,
              fullImageUrl: `https://pokeres.bastionbot.org/images/pokemon/${vista}.png`, 
              tipo: data.types[0].type.name, 
              hp: data.stats[0].base_stat,
              attack: data.stats[1].base_stat,
              defense: data.stats[2].base_stat,  
            };
        setPokemonData(newPokemonData);
      });
  }, [vista]);
    
    return (
        <>
        {pokemonData ? (
          <div>
              <h1>{pokemonData.name}</h1>
              <img src={pokemonData.fullImageUrl} />
              <h3>Tipo: {pokemonData.tipo}</h3>
              <h4>Hp: {pokemonData.hp}</h4>
              <h4>Ataque: {pokemonData.attack}</h4>
              <h4>Defensa: {pokemonData.defense}</h4>                  
          </div>
          
        ) : (
          <h1>cargando</h1>
        )}
      </>
)}
const mapStateToProps = (state) => ({
    vista: state.vista,
  });
  
  const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(VistaPokemon)