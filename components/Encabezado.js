import { AppBar, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    alignItems: "flex-start",
    paddingBottom: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    alignSelf: "flex-end",
  },
}));

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const Encabezado = (props) => {
  const classes = useStyles();
  const displayDesktop = () => {
    return (
      <Toolbar className={classes.toolbar} >
        <Typography className={classes.title} variant="h5" noWrap>
            Pokedex
        </Typography>
      </Toolbar>
    );
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar>{displayDesktop()}</AppBar>
      </HideOnScroll>
      <Toolbar />
    </React.Fragment>
  );
};
export default Encabezado;
