import React, { Component } from "react";


class Form extends React.Component{
  
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    }
  }

  fetchJale = async () => {
    let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.state.name}`)
    let data = await res.json()
    this.setState({
      img: data.sprites.front_default
    })
  }
  

  handleName = event => {
    this.setState({
      name: event.target.value
    })
  }
  

  handleSubmit = event =>{
    var jeje = this.state.name;
    this.fetchJale()
    this.setState({
      name: '',
    })
    event.preventDefault()
  }
  
    

    render() {
        return (
        <div className="card text-center">
          <div className="card-header">
            Pokedex
          </div>
          <div className="card-body">
        <form onSubmit={this.handleSubmit}>    
            <label>Ingrese el pokemon</label><br/>
            <input 
                type="text"
                placeholder="nombre"
                value={this.state.name}
                onChange={this.handleName}
            /><br/><br/>
            <button type="submit" className="btn btn-primary">submit</button>
        </form>
        <img src={this.state.img}/>
          </div>
        </div>
        );
    }

}


export default Form