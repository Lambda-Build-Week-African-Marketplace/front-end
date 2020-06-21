import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
//import { getData } from "../actions/index";
import {
  updateUserData,
  deleteUserData,
  postUserData,
  getUsersData,
} from "../actions/index";
const UserAccount = (props) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

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
