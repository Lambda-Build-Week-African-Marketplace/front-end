import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { USER_STATE } from "../actions/index";
const UserAccount = (props) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  useEffect(() => {
    const selectedUserId = Number(props.match.params.id);
    //const selectedUserId = window.localStorage.getItem("userID");

    const selectedUser = state.users.find(
      (el) => el.id === Number(selectedUserId)
    );
    dispatch({ type: USER_STATE, payload: selectedUser });
  }, [dispatch, props.match.params.id, window.localStorage.getItem("userID")]);

  return (
    <div>
      <h2> UserAccount:</h2>
      <p>First Name: {state.user.firstname}</p>
      <p>Last Name: {state.user.lastname}</p>
      <p>Email: {state.user.email}</p>
    </div>
  );
};
export default UserAccount;
