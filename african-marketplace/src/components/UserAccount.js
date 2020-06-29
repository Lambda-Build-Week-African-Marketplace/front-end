import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";

import userAccountPhoto from "../assets/user-account.jpg";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { setUser, getUsersData } from "../actions/index";
const useStyles = makeStyles({
  root: {
    maxWidth: 600,
  },
});

const initialUser = {
  firstname: "",
  lastname: "",
  email: "",
  username: "",
};

const UserAccount = (props) => {
  const classes = useStyles();
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [newUser, setNewUser] = useState(initialUser);

  useEffect(() => {
    const selectedUserId = Number(props.match.params.id);
    const selectedUser = state.users.find(
      (el) => el.id === Number(selectedUserId)
    );

    dispatch(setUser(selectedUser));
    setNewUser(selectedUser);
  }, [dispatch, props.match.params.id, window.localStorage.getItem("userID")]);

  useEffect(() => {
    dispatch(getUsersData());
  }, [newUser]);

  const toUpdateUserAccount = (e) => {
    e.preventDefault();
    const userId = window.localStorage.getItem("userID");
    props.history.push(`/users/${userId}/account/update`);
  };

  return (
    <div>
      {state.users
        .filter(
          (user) =>
            Number(user.id) === Number(window.localStorage.getItem("userID"))
        )
        .map((el) => {
          return (
            <React.Fragment>
              <CssBaseline />
              <Container maxWidth="sm" style={{ marginTop: "6rem" }}>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="Contemplative Reptile"
                      height="300"
                      image={userAccountPhoto}
                      title="Contemplative Reptile"
                    />
                    <CardContent style={{ textAlign: "center" }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        User Name: {el.username}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="h3">
                        First Name: {el.firstname}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="h3">
                        Last Name: {el.lastname}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="h3">
                        Email: {el.email}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions style={{ marginLeft: "center" }}>
                    <Button
                      onClick={toUpdateUserAccount}
                      size="small"
                      color="primary"
                    >
                      Edit Account
                    </Button>
                  </CardActions>
                </Card>
              </Container>
            </React.Fragment>
          );
        })}
    </div>
  );
};
export default UserAccount;
