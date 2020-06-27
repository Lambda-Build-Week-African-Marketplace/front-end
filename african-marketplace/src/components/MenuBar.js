import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams, useRouteMatch } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { useSelector, useDispatch } from "react-redux";
import { authMenuBar, setUserProducts } from "../actions/index";
import {
  SET_INITIAL_USER,
  SEARCH_STATE,
  SEARCH_LOCATION_STATE,
  SELECT_LOCATION_STATE,
  SELECTED_SEARCH_BTN,
  SELECTED_ID_STATE,
  TOGGLE_SEARCH_STATE,
  TOGGLE_LOCATION_SEARCH_STATE,
} from "../actions/index";

import { createStyles, fade, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
const MenuBar = (props) => {
  const state = useSelector((state) => state);
  const [searchName, setSearchName] = useState("");
  const [showText, setShowText] = useState("");
  const [searchBy, setSearchBy] = useState("Search by product");
  const [error, setError] = useState("");
  const [desiredLocation, setDesiredLocation] = useState([]);
  const dispatch = useDispatch();
  const { push } = useHistory();
  const classes = useStyles();

  const logout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("userID");
    window.localStorage.removeItem("locUser");
    window.localStorage.removeItem("SignUp-form");
    dispatch(authMenuBar(false));
    dispatch(setUserProducts([]));
    //dispatch(setUser({}));
    dispatch({ type: SET_INITIAL_USER });
  };

  const toUserAccount = () => {
    const userId = window.localStorage.getItem("userID").toString();
    push(`/users/${userId}/account`);
  };

  const handleChange = (e) => {
    dispatch({
      type: SEARCH_STATE,
      value: e.target.value,
    });
  };
  // const handleLocationChange = (e) => {
  //   dispatch({
  //     type: SEARCH_LOCATION_STATE,
  //     value: e.target.value,
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: SELECT_LOCATION_STATE,
      value: state.searchLocation,
    });
  };

  //-------------Handle Search-----------
  const setSearchLocation = (e) => {
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
  const setSearchCategory = (e) => {
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
    dispatch({
      type: SELECTED_SEARCH_BTN,
      payload: 1,
    });
    dispatch({
      type: SEARCH_STATE,
      value: "",
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
          
            <Typography
              variant="h6"
              className={classes.title}
              style={{ fontSize: "1.5rem" }}
            >
              African MarketPlace
            </Typography>
*/}
            <div>
              <SearchIcon />
            </div>
            <Button onClick={setSearchLocation} color="inherit">
              location
            </Button>
            <Button onClick={setSearchCategory} color="inherit">
              category
            </Button>
            <Button onClick={setSearchProduct} color="inherit">
              product
            </Button>

            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <form>
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
              </form>
              {/**************************************************/}
              {error ? (
                <p style={{ color: "red" }}>
                  We do not have this location, please, enter another one.
                </p>
              ) : null}

              {/*************************************************** */}
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
                style={{ fontSize: "1rem", marginLeft: "1rem" }}
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
                <Button color="inherit" style={{ fontSize: "1rem" }}>
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
                <Button color="inherit" style={{ fontSize: "1rem" }}>
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
                <Button color="inherit" style={{ fontSize: "1rem" }}>
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
        width: "12ch",
        "&:focus": {
          width: "18ch",
        },
      },
    },
  })
);

//---------------------------------------------------------------
// const MenuBar = (props) => {
//   const state = useSelector((state) => state);

//   const dispatch = useDispatch();
//   const { push } = useHistory();
//   const classes = useStyles();

//   const logout = () => {
//     window.localStorage.removeItem("token");
//     window.localStorage.removeItem("userID");
//     window.localStorage.removeItem("locUser");
//     window.localStorage.removeItem("SignUp-form");
//     dispatch(authMenuBar(false));
//     dispatch(setUserProducts([]));
//     //dispatch(setUser({}));
//     dispatch({ type: SET_INITIAL_USER });
//   };

//   const toUserAccount = () => {
//     const userId = window.localStorage.getItem("userID").toString();
//     push(`/users/${userId}/account`);
//   };

//   const handleChange = (e) => {
//     dispatch({
//       type: SEARCH_STATE,

//       value: e.target.value,
//     });
//   };

//   return (
//     <div className="menu-bar">
//       <div className={classes.root}>
//         <AppBar position="static">
//           <Toolbar>
//             {/**
//           <IconButton
//             edge="start"
//             className={classes.menuButton}
//             color="inherit"
//             aria-label="open drawer"
//           >
//             Logo
//           </IconButton>
//           */}
//             <Typography
//               variant="h6"
//               className={classes.title}
//               style={{ fontSize: "1.5rem" }}
//             >
//               African MarketPlace
//             </Typography>

//             <div className={classes.search}>
//               <div className={classes.searchIcon}>
//                 <SearchIcon />
//               </div>
//               <InputBase
//                 onChange={handleChange}
//                 placeholder="Search by product"
//                 classes={{
//                   root: classes.inputRoot,
//                   input: classes.inputInput,
//                 }}
//                 inputProps={{ "aria-label": "search" }}
//               />
//             </div>

//             <Link
//               style={{
//                 color: "white",
//                 textDecoration: "none",
//               }}
//               to={"/"}
//             >
//               <Button
//                 color="inherit"
//                 style={{ fontSize: "1rem", marginLeft: "1rem" }}
//               >
//                 Products
//               </Button>
//             </Link>

//             {!state.auth && !window.localStorage.getItem("userID") && (
//               <Link
//                 style={{
//                   color: "white",
//                   textDecoration: "none",
//                   marginLeft: "1rem",
//                 }}
//                 to={"/login"}
//               >
//                 <Button color="inherit" style={{ fontSize: "1rem" }}>
//                   Login
//                 </Button>
//               </Link>
//             )}

//             {(state.auth || window.localStorage.getItem("userID")) && (
//               <Link
//                 style={{
//                   color: "white",
//                   textDecoration: "none",
//                 }}
//                 to={`/dashboard/${window.localStorage.getItem("userID")}`}
//               >
//                 <Button color="inherit" style={{ fontSize: "1rem" }}>
//                   Dashboard
//                 </Button>
//               </Link>
//             )}
//             {(state.auth || window.localStorage.getItem("userID")) && (
//               <IconButton
//                 aria-label="account of current user"
//                 aria-controls="menu-appbar"
//                 aria-haspopup="true"
//                 onClick={toUserAccount}
//                 color="inherit"
//               >
//                 <AccountCircle />
//               </IconButton>
//             )}

//             {(state.auth || window.localStorage.getItem("userID")) && (
//               <Link
//                 onClick={logout}
//                 style={{
//                   color: "white",
//                   textDecoration: "none",
//                   marginRight: "2rem",
//                   marginLeft: "2rem",
//                 }}
//                 to={"/"}
//               >
//                 <Button color="inherit" style={{ fontSize: "1rem" }}>
//                   Logout
//                 </Button>
//               </Link>
//             )}
//           </Toolbar>
//         </AppBar>
//       </div>
//     </div>
//   );
// };
// export default MenuBar;
