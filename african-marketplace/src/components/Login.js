import React, { useState } from "react";
import { axiosWithAuth } from "../util/axiosWithAuth";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import marketLogin from "../assets/market-login1.jpg";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const Login = (props) => {
  const classes = useStyles();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    //console.log("e.target.value", e.target.value);
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  const login = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/login", credentials)
      .then((res) => {
        localStorage.setItem("token", res.data.payload);
        props.history.push("/dashboard");
      })
      .catch((err) => {
        console.log("error returned from login post request", err);
      });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />

      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className="login-menu">
          <Link to="/dashboard">
            <button>Dashboard</button>
          </Link>
        </div>
        <div className={classes.paper}>
          <h1>Welcome to our African Marketplace!</h1>

          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <form className={classes.form} noValidate onSubmit={login}>
            {/*-------------------User Name----------------------- */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={credentials.username}
              onChange={handleChange}
            />

            {/*-------------------Password----------------------- */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="password"
              value={credentials.password}
              onChange={handleChange}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>
            <ToSignup />
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link to="/" style={{ textDecoration: "none", color: "#757575" }}>
        African Marketplace Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function ToSignup() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <Link to="/signup">Don't have an account? Go to SignUp.</Link>
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${marketLogin})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
