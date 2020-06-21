import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { useSelector, useDispatch } from "react-redux";
import { authMenuBar } from "../actions/index";
import {
  createStyles,
  fade,
  Theme,
  makeStyles,
} from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
const MenuBar = (props) => {
  const state = useSelector((state) => state);

  const dispatch = useDispatch();
  const { push } = useHistory();
  const classes = useStyles();

  const logout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("userID");
    dispatch(authMenuBar(false));
  };

  const toUserAccount = () => {
    const userId = window.localStorage.getItem("userID").toString();
    //console.log("userId in menubar", userId);
    push(`/users/${userId}`);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/** 
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            Logo
          </IconButton>
          */}
          <Typography
            className={classes.title}
            variant="h6"
            noWrap
            style={{
              fontSize: "2rem",
              color: "white",
              textDecoration: "none",
              marginLeft: "2rem",
            }}
          >
            African MarketPlace
          </Typography>

          <div className={classes.search} style={{ marginRight: "3rem" }}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>

          <Link
            style={{
              color: "white",
              textDecoration: "none",
              marginRight: "2rem",
              marginRight: "3rem",
            }}
            to={"/"}
          >
            <h2>Products</h2>
          </Link>

          {(!state.auth || !window.localStorage.getItem("userID")) && (
            <Link
              style={{
                color: "white",
                textDecoration: "none",
                marginRight: "2rem",
              }}
              to={"/login"}
            >
              <h2>Login</h2>
            </Link>
          )}

          {(state.auth || window.localStorage.getItem("userID")) && (
            <Link
              style={{
                color: "white",
                textDecoration: "none",
                marginRight: "2rem",
              }}
              to={"/dashboard"}
            >
              <h2>Dashboard</h2>
            </Link>
          )}
          {(state.auth || window.localStorage.getItem("userID")) && (
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={toUserAccount}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          )}

          {(state.auth || window.localStorage.getItem("userID")) && (
            <Link
              onClick={logout}
              style={{
                color: "white",
                textDecoration: "none",
                marginRight: "2rem",
                marginLeft: "2rem",
              }}
              to={"/"}
            >
              <h2>Logout</h2>
            </Link>
          )}

          {/*
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
            */}
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default MenuBar;

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  })
);
