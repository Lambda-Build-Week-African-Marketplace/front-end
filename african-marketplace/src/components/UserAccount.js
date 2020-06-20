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
  const userId = window.localStorage.getItem("userID").toString();

  const user = state.users.find((us) => `${us.id}` === userId);
  console.log("user from userAccount", user);
  // useEffect(() => {
  //   dispatch(getLocationsData());
  // }, [dispatch]);

  //   useEffect(() => {
  //     dispatch(getProductsData());
  //   }, [dispatch]);
  // console.log("state", state.locations);

  return (
    <div>
      <h2> UserAccount:</h2>
    </div>
  );
};
export default UserAccount;
