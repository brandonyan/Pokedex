import { AppBar, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  appBar: {
    centerTitle: true,
    alignItems: "center",
  },
  toolbar: {
    alignItems: "flex-start",
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    alignSelf: "flex-end",
    centerTitle: true,
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
      <Toolbar className={classes.toolbar}>
        <Typography className={classes.title} variant="h3" noWrap>
          Pokedex
        </Typography>
      </Toolbar>
    );
  };
  return (
    <React.Fragment>
      <HideOnScroll {...props}>
        <AppBar className={classes.appBar}>{displayDesktop()}</AppBar>
      </HideOnScroll>
      <Toolbar />
      <Toolbar/>
    </React.Fragment>
  );
};
export default Encabezado;
