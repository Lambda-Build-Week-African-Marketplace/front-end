import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { useSelector, useDispatch } from "react-redux";
import { authMenuBar, setUserProducts } from "../actions/index";
import {
  SET_INITIAL_USER,
  SEARCH_STATE,
  SELECT_LOCATION_STATE,
  SELECTED_SEARCH_BTN,
  SELECTED_ID_STATE,
  TOGGLE_SEARCH_STATE,
  TOGGLE_LOCATION_SEARCH_STATE,
} from "../actions/index";

import { createStyles, fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
const MenuBar = (props) => {
  const state = useSelector((state) => state);
  const [searchBy, setSearchBy] = useState("Search by product");
  const dispatch = useDispatch();
  const { push } = useHistory();
  const classes = useStyles();

  const logout = (e) => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("userID");
    window.localStorage.removeItem("locUser");
    window.localStorage.removeItem("SignUp-form");
    dispatch(authMenuBar(false));
    dispatch(setUserProducts([]));
    dispatch({ type: SET_INITIAL_USER });
  };

  const toUserAccount = (e) => {
    e.preventDefault();
    const userId = window.localStorage.getItem("userID").toString();
    push(`/users/${userId}/account`);
  };

  const handleChange = (e) => {
    e.preventDefault();
    dispatch({
      type: SEARCH_STATE,
      value: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: SELECT_LOCATION_STATE,
      value: state.searchLocation,
    });
  };

  //-------------Handle Search-----------
  const setSearchLocation = (e) => {
    e.preventDefault();
    dispatch({
      type: SELECTED_SEARCH_BTN,
      payload: 3,
    });
    dispatch({
      type: SELECTED_ID_STATE,
      payload: 0,
    });
    dispatch({
      type: TOGGLE_LOCATION_SEARCH_STATE,
      payload: true,
    });
    dispatch({
      type: TOGGLE_SEARCH_STATE,
      payload: false,
    });
    setSearchBy("Search by Location");
  };
  const setProductsPage = (e) => {
    e.preventDefault();
    dispatch({
      type: SELECTED_SEARCH_BTN,
      payload: 1,
    });
    dispatch({
      type: TOGGLE_LOCATION_SEARCH_STATE,
      payload: false,
    });
    dispatch({
      type: TOGGLE_SEARCH_STATE,
      payload: false,
    });
    dispatch({
      type: SELECTED_ID_STATE,
      payload: 0,
    });
  };
  const setSearchCategory = (e) => {
    e.preventDefault();
    dispatch({
      type: SELECTED_SEARCH_BTN,
      payload: 2,
    });
    dispatch({
      type: SELECTED_ID_STATE,
      payload: 0,
    });
    dispatch({
      type: SEARCH_STATE,
      value: "",
    });
    dispatch({
      type: TOGGLE_SEARCH_STATE,
      payload: true,
    });
    dispatch({
      type: TOGGLE_LOCATION_SEARCH_STATE,
      payload: false,
    });

    setSearchBy("Search by Category");
  };
  const setSearchProduct = (e) => {
    e.preventDefault();
    dispatch({
      type: SELECTED_SEARCH_BTN,
      payload: 1,
    });
    // dispatch({
    //   type: SEARCH_STATE,
    //   value: "",
    // });
    dispatch({
      type: SELECTED_ID_STATE,
      payload: 0,
    });
    dispatch({
      type: SEARCH_STATE,
      value: "",
    });
    dispatch({
      type: TOGGLE_LOCATION_SEARCH_STATE,
      payload: false,
    });
    dispatch({
      type: TOGGLE_SEARCH_STATE,
      payload: false,
    });
    setSearchBy("Search by Product");
  };

  return (
    <div className="menu-bar">
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar style={{ margin: "0 auto" }}>
            <div>
              <SearchIcon />
            </div>
            <Button
              onClick={setSearchLocation}
              color="inherit"
              style={{ fontSize: "0.75rem" }}
            >
              location
            </Button>
            <div>
              <SearchIcon />
            </div>
            <Button
              onClick={setSearchCategory}
              color="inherit"
              style={{ fontSize: "0.75rem" }}
            >
              category
            </Button>

            <div>
              <SearchIcon />
            </div>
            <Button
              onClick={setSearchProduct}
              color="inherit"
              style={{ fontSize: "0.75rem" }}
            >
              product
            </Button>

            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>

              <InputBase
                type="text"
                onChange={handleChange}
                placeholder={searchBy}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                value={state.searchTerm}
                inputProps={{ "aria-label": "search" }}
              />
            </div>

            <Link
              style={{
                color: "white",
                textDecoration: "none",
              }}
              to={"/"}
            >
              <Button
                color="inherit"
                style={{ fontSize: "1.3rem", marginLeft: "3rem" }}
              >
                Products
              </Button>
            </Link>

            {!state.auth && !window.localStorage.getItem("userID") && (
              <Link
                style={{
                  color: "white",
                  textDecoration: "none",
                  marginLeft: "1rem",
                }}
                to={"/login"}
              >
                <Button color="inherit" style={{ fontSize: "1.3rem" }}>
                  Login
                </Button>
              </Link>
            )}

            {(state.auth || window.localStorage.getItem("userID")) && (
              <Link
                style={{
                  color: "white",
                  textDecoration: "none",
                }}
                to={`/dashboard/${window.localStorage.getItem("userID")}`}
              >
                <Button color="inherit" style={{ fontSize: "1.3rem" }}>
                  Dashboard
                </Button>
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

                  marginLeft: "2rem",
                }}
                to={"/"}
              >
                <Button color="inherit" style={{ fontSize: "1.3rem" }}>
                  Logout
                </Button>
              </Link>
            )}
          </Toolbar>
        </AppBar>
      </div>
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
        width: "22ch",
        "&:focus": {
          width: "26ch",
        },
      },
    },
  })
);
