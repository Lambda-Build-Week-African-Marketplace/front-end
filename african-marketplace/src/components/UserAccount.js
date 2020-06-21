import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

const UserAccount = (props) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

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
