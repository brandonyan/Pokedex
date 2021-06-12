import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";  
import {
  withStyles,
  makeStyles,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DetailsRoundedIcon from "@material-ui/icons/DetailsRounded";

const useStyles = makeStyles({
  paper: {
    width: '100%',
  },
  container: {
    maxHeight: 670,
  },
});
function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1);
}

const BootstrapButton = withStyles({
  root: {
    boxShadow: "none",
    textTransform: "none",
    fontSize: 15,
    padding: "6px 12px",
    lineHeight: 1.5,
    background: 'linear-gradient(45deg, #222224 30%, #f00000 90%)',
    fontFamily: "Segoe UI",
    "&:hover": {
      backgroundColor: "#0069d9",
      borderColor: "#0062cc",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#0062cc",
      borderColor: "#005cbf",
    },
    "&:focus": {
      boxShadow: "-1px 1px 15px 3px rgba(50,50,50,1);",
    },
  },
})(Button);

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
          <Paper className={classes.paper}>
      <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell align="right"></TableCell>
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
                    <Typography variant="h5">{capitalize(pokemonData[pokemonId].name)}</Typography>
                      
                    </TableCell>
                    <TableCell align="center">
                      <img
                        src={pokemonData[pokemonId].sprite}
                        alt={pokemonData[pokemonId].name}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <BootstrapButton
                        startIcon={<DetailsRoundedIcon />}
                        onClick={() => verPokemon(pokemonData[pokemonId].id)}
                        variant="contained"
                        color="primary"
                        disableRipple
                      >
                        Detalles
                      </BootstrapButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </Paper>
      ) : (
        <h1>cargando</h1>
      )}
    </>
  );
};
const mapStateToProps = (state) => ({
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
