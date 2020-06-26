import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../util/axiosWithAuth";
import * as yup from "yup";
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
import { useSelector, useDispatch } from "react-redux";
import { authMenuBar } from "../actions/index";
import { Spinner } from "reactstrap";
import { postLoginData } from "../actions/index";

const formSchema = yup.object().shape({
  username: yup.string().required("Username  is a required field"),
  password: yup.string().min(6, "Password must be at least 6 characters"),
});

const Login = (props) => {
  const classes = useStyles();
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    formSchema.isValid(credentials).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [credentials]);

  const validateChange = (e) => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setErrors({
          ...errors,
          [e.target.name]: "",
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors,
        });
      });
  };

  const handleChange = (e) => {
    e.persist();
    const newFormData = {
      ...credentials,
      [e.target.name]: e.target.value,
    };
    validateChange(e);
    setCredentials(newFormData);
  };

  const login = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/login", credentials)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userID", res.data.user_id);
        dispatch(authMenuBar(true));
        const userId = window.localStorage.getItem("userID");
        setCredentials({
          username: "",
          password: "",
        });

        props.history.push(`/dashboard/${userId}`);
      })
      .catch((err) => {
        console.log("error returned from login post request", err);
      });
  };

  return (
    <Grid
      container
      component="main"
      className={classes.root}
      style={{ marginTop: "4rem" }}
    >
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />

      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <h1 style={{ textAlign: "center" }}>
            Welcome to our African Marketplace!
          </h1>
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
            {errors.username.length > 0 ? (
              <p className="error" id="usernameError">
                {errors.username}
              </p>
            ) : null}

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
            {errors.password.length > 0 ? (
              <p className="error">{errors.password}</p>
            ) : null}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={buttonDisabled}
            >
              Submit
            </Button>
            {state.isLoading ? (
              <div style={{ margin: "0 auto" }}>
                <Spinner
                  color="primary"
                  style={{
                    width: "3rem",
                    height: "3rem",
                    position: "absolute",
                    top: "67%",
                    left: "80%",
                    marginLeft: "-50px",
                    marginTop: "-50px",
                  }}
                />{" "}
              </div>
            ) : null}
            {state.error && <Fail />}
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

function Fail() {
  return (
    <Typography
      style={{ marginTop: "2rem", marginBottom: "1rem" }}
      variant="body2"
      color="textSecondary"
      align="center"
    >
      <Link style={{ color: "red" }} to="/signup">
        Something wrong, try it again.
      </Link>
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
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
