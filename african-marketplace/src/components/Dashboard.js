import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//import { getData } from "../actions/index";
import {
  getProductsData,
  getCategoriesData,
  getLocationsData,
  setUserProducts,
  setUser,
} from "../actions/index";
const Dashboard = (props) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const selectedUserId = Number(window.localStorage.getItem("userID"));
  //console.log("selectedUserId", selectedUserId);

  useEffect(() => {
    dispatch(getProductsData());
    const user_products = state.products.filter(
      (product) => product.user_id === selectedUserId
    );
    const selectedUser = state.users.find((el) => el.id === selectedUserId);
    dispatch(setUserProducts(user_products));
    dispatch(setUser(selectedUser));
  }, [dispatch, props.match.params.id]);
  // console.log("props.match.params.id", props.match.params.id);

  return (
    <div>
      <h2>
        {" "}
        User {state.user.firstname} {state.user.lastname} list of products:
      </h2>
      {state.userProducts.map((product) => (
        <p>{product.product_name}</p>
      ))}
      <button>Add Product</button>
    </div>
  );
};
export default Dashboard;
