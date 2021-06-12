import App from "../components/App";
import Pokemon from "../components/Pokemon";
import VistaPokemon from "../components/VistaPokemon";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

const Index = () => {
  const classes = useStyles();
  return (
    <App>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8} lg={8}>
            <Paper className={classes.paper}>
              <Pokemon />
            </Paper>
          </Grid>
          <Grid position="fixed" item xs={12} md={4} lg={4}>
            <Paper className={classes.paper}>
              <VistaPokemon />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </App>
  );
};
export default Index;
