import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import LinearProgress from '@material-ui/core/LinearProgress';
import Divider from "@material-ui/core/Divider";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "auto",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
  },
  content: {
    textAlign: "center",
    padding: 15,
  },
  divider: {
    margin: `15px 0 0 ${theme.spacing(2)}px`,
  },
}));
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
      <Card className={classes.card}>
        <CardMedia
          component="img"
          alt={pokemonData.name}
          height="100%"
          padding="20px"
          image={pokemonData.fullImageUrl}
          title={pokemonData.name}
        />
        <CardContent className={classes.content}>
          <Typography align="center" variant="h3">
            {pokemonData.name}
          </Typography>
          <Typography
            align="center"
            variant="h5"
            color="textSecondary"
            component="p"
          >
            Tipo: {pokemonData.tipo}
          </Typography>
          <Divider className={classes.divider} light />
          <Typography
            align="center"
            variant="h6"
            color="textSecondary"
            component="p"
          >
            Hp: {pokemonData.hp}
          </Typography>
          <BorderLinearProgress variant="determinate" value={pokemonData.hp} />
          <Divider className={classes.divider} light />
          <Typography
            align="center"
            variant="h6"
            color="textSecondary"
            component="p"
          >
            Ataque: {pokemonData.attack}
          </Typography>
          <BorderLinearProgress variant="determinate" value={pokemonData.attack} />
          <Divider className={classes.divider} light />
          <Typography
            align="center"
            variant="h6"
            color="textSecondary"
            component="p"
          >
            Defensa: {pokemonData.defense}
          </Typography>
          <BorderLinearProgress variant="determinate" value={pokemonData.defense} />
        </CardContent>
      </Card>
    </>
  );
};
const mapStateToProps = (state) => ({
  vista: state.vista,
});

const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(VistaPokemon);
