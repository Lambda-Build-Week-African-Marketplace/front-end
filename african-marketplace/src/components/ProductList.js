import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getProductsData,
  getCategoriesData,
  getLocationsData,
} from "../actions/index";
const ProductList = (props) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  return <div>ProductList page</div>;
};
export default ProductList;
