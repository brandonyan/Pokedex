import React, { Component } from 'react';
import axios from 'axios';

export default class PokemonList extends Component {
  state = {
    url: 'https://pokeapi.co/api/v2/pokemon',
    pokemon: null
  };

  async componentDidMount() {
    const res = await axios.get(this.state.url);
    this.setState({ pokemon: res.data['results'] });
  }

  render() {
    return (
        <React.Fragment>
            
        {this.state.pokemon ? (
          <div>
            {this.state.pokemon.map(pokemon => (  
                            
                <h3 key={pokemon.name} >{pokemon.name}</h3>                
            ))}
          </div>
        ) : (
          <h1>Cargando pokemon{console.log(this.state.pokemon)}</h1>
        )}
        </React.Fragment>
    );
  }
}