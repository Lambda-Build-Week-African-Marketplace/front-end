import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams, useRouteMatch } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import signupPhoto from "../assets/signup1.jpg";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "../hooks/useForm";
import { Spinner } from "reactstrap";
import { updateUserData, setUser } from "../actions/index";
import userUpdateAcc from "../assets/user-update-acc.jpg";
import * as yup from "yup";
const initialUser = {
  username: "",
  firstname: "",
  lastname: "",
  email: "",
  id: 0,
};

const formSchema = yup.object().shape({
  firstname: yup.string().required("First name is a required field"),
  lastname: yup.string().required("Last name  is a required field"),
  email: yup.string().email().required("Must include an email"),
  username: yup.string().required("Username  is a required field"),
});
const UserUpdateForm = (props) => {
  const classes = useStyles();
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  //const [updateCredentials, setUpdateCredentials] = useState(initialUser);
  const [formState, setFormState] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  let usersCheck = state?.users.length === 0;
  let selectedUser = {};
  useEffect(() => {
    const userId = props.match.params.id;
    selectedUser = state?.users?.find((u) => Number(u.id) === Number(userId));
    console.log("selectedUser", selectedUser);
    //setUpdateCredentials(selectedUser);
    setFormState(selectedUser);
  }, []);

  //const [updateCredentials, setUpdateCredentials] = useState(selectedUser);
  const [updateCredentials, setUpdateCredentials] = useState({
    firstname: selectedUser.firstname,
    lastname: selectedUser.lastname,
    email: selectedUser.email,
    username: selectedUser.username,
  });

  console.log("updateCredentials", updateCredentials);
  console.log("setFormState(selectedUser);", formState);
  //const [formState, setFormState] = useState(selectedUser);
  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [formState]);

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

  //console.log("updateCredentials", updateCredentials);
  const update = (e) => {
    e.preventDefault();
    dispatch(updateUserData(formState, state.users));
    setFormState(initialUser);
    setShowSuccessMessage(true);
    const userId = window.localStorage.getItem("userID");
    props.history.push(`/users/${userId}/account`);
  };

  const inputChange = (e) => {
    e.persist();
    const newFormData = {
      ...formState,
      [e.target.name]: e.target.value,
    };
    validateChange(e);
    setFormState(newFormData);
  };

  const formCancel = (e) => {
    e.preventDefault();
    const userId = window.localStorage.getItem("userID");
    props.history.push(`/users/${userId}/account`);
    setFormState(initialUser);
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
          <Typography component="h1" variant="h5">
            Update Account
          </Typography>
          <form className={classes.form} noValidate onSubmit={update}>
            {/*-------------------First Name----------------------- */}
            <TextField
              autoFocus
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="firstname"
              label="First Name"
              name="firstname"
              autoComplete="firstname"
              value={formState.firstname}
              onChange={inputChange}
            />
            {errors.firstname.length > 0 ? (
              <p className="error" id="firstnameError">
                {errors.firstname}
              </p>
            ) : null}
            {/*-------------------Last Name----------------------- */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lastname"
              label="Last Name"
              name="lastname"
              autoComplete="lastname"
              value={formState.lastname}
              onChange={inputChange}
            />
            {errors.lastname.length > 0 ? (
              <p className="error" id="lastnameError">
                {errors.lastname}
              </p>
            ) : null}
            {/*-------------------Email----------------------- */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={formState.email}
              onChange={inputChange}
            />
            {errors.email.length > 0 ? (
              <p className="error" id="emailError">
                {errors.email}
              </p>
            ) : null}
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
              value={formState.username}
              onChange={inputChange}
            />
            {errors.username.length > 0 ? (
              <p className="error" id="usernameError">
                {errors.username}
              </p>
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

            {/*!state.error && !state.isLoading && <Success />*/}
            {/*state.error && <Fail />*/}
            <Typography variant="body2" color="textSecondary" align="center">
              <Button onClick={formCancel}>Cancel</Button>
            </Typography>

            <Box mt={5}></Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default UserUpdateForm;

function ToMarketplace() {
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

function ToLogin() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <Link to="/login">Have an account? Go to Login.</Link>
    </Typography>
  );
}

function Success() {
  return (
    <Typography
      style={{ marginTop: "2rem", marginBottom: "1rem" }}
      variant="body2"
      color="textSecondary"
      align="center"
    >
      <Link style={{ color: "green" }} to="/login">
        You have registered successfully! Go to Login.
      </Link>
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

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${userUpdateAcc})`,
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
//--------------------------------------------
// const UserUpdateForm = (props) => {
//     const classes = useStyles();
//     const state = useSelector((state) => state);
//     const dispatch = useDispatch();
//     //const [updateCredentials, setUpdateCredentials] = useState(initialUser);

//     const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//     let usersCheck = state?.users.length === 0;
//     let selectedUser = {};
//     useEffect(() => {
//       // const userId = window.localStorage.getItem("userID");

//       const userId = props.match.params.id;
//       selectedUser = state?.users?.find((u) => Number(u.id) === Number(userId));

//       console.log("selectedUser", selectedUser);
//       setUpdateCredentials(selectedUser);

//       //console.log("updateCredentials", updateCredentials);
//       //}, [props.match.params.id, usersCheck]);
//     }, []);
//     //   const [
//     //     newCredentials,
//     //     handleChanges,
//     //     clearForm,
//     //     handleSubmit,
//     //     setValues,
//     //   ] = useForm("Update-user-form", updateCredentials);
//     const [updateCredentials, setUpdateCredentials] = useState(selectedUser);
//     console.log("updateCredentials", updateCredentials);
//     const update = (e) => {
//       e.preventDefault();
//       dispatch(updateUserData(updateCredentials, state.users));
//       setUpdateCredentials(initialUser);
//       setShowSuccessMessage(true);
//       const userId = window.localStorage.getItem("userID");
//       props.history.push(`/users/${userId}/account`);
//     };

//     //------------------------------------------
//     const inputChange = (e) => {
//       const newEditData = {
//         ...updateCredentials,
//         [e.target.name]: e.target.value,
//       };
//       setUpdateCredentials(newEditData);
//     };

//     //   const formSubmit = (e) => {
//     //     e.preventDefault();
//     //     props.updateData(props.editState);

//     //   };

//     const formCancel = (e) => {
//       e.preventDefault();
//       const userId = window.localStorage.getItem("userID");
//       props.history.push(`/users/${userId}/account`);
//       setUpdateCredentials(initialUser);
//     };

//     return (
//       <Grid
//         container
//         component="main"
//         className={classes.root}
//         style={{ marginTop: "4rem" }}
//       >
//         <CssBaseline />
//         <Grid item xs={false} sm={4} md={7} className={classes.image} />

//         <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
//           <div className={classes.paper}>
//             <Typography component="h1" variant="h5">
//               Update Account
//             </Typography>
//             <form className={classes.form} noValidate onSubmit={update}>
//               {/*-------------------First Name----------------------- */}
//               <TextField
//                 autoFocus
//                 variant="outlined"
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="firstname"
//                 label="First Name"
//                 name="firstname"
//                 autoComplete="firstname"
//                 value={updateCredentials.firstname}
//                 onChange={inputChange}
//               />
//               {/*-------------------Last Name----------------------- */}
//               <TextField
//                 variant="outlined"
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="lastname"
//                 label="Last Name"
//                 name="lastname"
//                 autoComplete="lastname"
//                 value={updateCredentials.lastname}
//                 onChange={inputChange}
//               />
//               {/*-------------------Email----------------------- */}
//               <TextField
//                 variant="outlined"
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="email"
//                 label="Email"
//                 name="email"
//                 autoComplete="email"
//                 value={updateCredentials.email}
//                 onChange={inputChange}
//               />
//               {/*-------------------User Name----------------------- */}
//               <TextField
//                 variant="outlined"
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="username"
//                 label="Username"
//                 name="username"
//                 autoComplete="username"
//                 value={updateCredentials.username}
//                 onChange={inputChange}
//               />

//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 color="primary"
//                 className={classes.submit}
//               >
//                 Submit
//               </Button>
//               {state.isLoading ? (
//                 <div style={{ margin: "0 auto" }}>
//                   <Spinner
//                     color="primary"
//                     style={{
//                       width: "3rem",
//                       height: "3rem",
//                       position: "absolute",
//                       top: "67%",
//                       left: "80%",
//                       marginLeft: "-50px",
//                       marginTop: "-50px",
//                     }}
//                   />{" "}
//                 </div>
//               ) : null}

//               {/*!state.error && !state.isLoading && <Success />*/}
//               {/*state.error && <Fail />*/}
//               <Typography variant="body2" color="textSecondary" align="center">
//                 <Button onClick={formCancel}>Cancel</Button>
//               </Typography>

//               <Box mt={5}></Box>
//             </form>
//           </div>
//         </Grid>
//       </Grid>
//     );
//   };

//   export default UserUpdateForm;
