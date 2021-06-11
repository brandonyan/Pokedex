import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Pokedex = ({ verPokemon }) => {
  const classes = useStyles();
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
          <TableContainer component={Paper}>
            <Table
              className={classes.table}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell align="right">Imagen</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(pokemonData).map((pokemonId) => (
                  <TableRow key={pokemonData[pokemonId].name}>
                    <TableCell component="th" scope="row">
                      {pokemonData[pokemonId].id}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {pokemonData[pokemonId].name}
                    </TableCell>
                    <TableCell align="right">
                      <img
                        src={pokemonData[pokemonId].sprite}
                        alt={pokemonData[pokemonId].name}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <button
                        onClick={() => verPokemon(pokemonData[pokemonId].id)}
                      >
                        View
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
  verPokemon(id) {
    dispatch({
      type: "VER_POKEMON",
      id,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Pokedex);
