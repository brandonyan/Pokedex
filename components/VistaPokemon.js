import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  media: {
    width: 80,
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  card: {
    maxWidth: 500,
    margin: "auto",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
    content: {
      textAlign: "left",
      padding: 3,
    },
    heading: {
      fontWeight: "bold",
    },
  },
});

const VistaPokemon = ({ vista }) => {
  const classes = useStyles();
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
        <Card className={classes.card}>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="350"
            padding="20px"
            image={pokemonData.fullImageUrl}
            title={pokemonData.name}
          />
          <CardContent className={classes.content}>
            <Typography
              className={"MuiTypography--heading"}
              variant={"h3"}
              gutterBottom
            >
              {pokemonData.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <h3>Tipo: {pokemonData.tipo}</h3>
              <h4>Hp: {pokemonData.hp}</h4>
              <h4>Ataque: {pokemonData.attack}</h4>
              <h4>Defensa: {pokemonData.defense}</h4>
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <h1>cargando</h1>
      )}
    </>
  );
};
const mapStateToProps = (state) => ({
  vista: state.vista,
});

const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(VistaPokemon);
