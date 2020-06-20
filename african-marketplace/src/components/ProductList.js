import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//import { getData } from "../actions/index";
import {
  getUsersData,
  getProductsData,
  getCategoriesData,
  getLocationsData,
} from "../actions/index";
const ProductList = (props) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLocationsData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProductsData());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getCategoriesData());
  }, [dispatch]);
  console.log("state products", state.products);
  console.log("state categories", state.categories);
  return (
    <div>
      <h2> Our Locations Africa:</h2>
      {state.locations.map((location) => (
        <p key={location.id}> Location:{location.location}</p>
      ))}
    </div>
  );
};
export default ProductList;
