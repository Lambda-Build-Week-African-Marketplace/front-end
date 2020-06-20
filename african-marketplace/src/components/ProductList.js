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
  //   useEffect(() => {
  //     dispatch(getLocationsData());
  //   }, [dispatch]);

  useEffect(() => {
    dispatch(getProductsData());
    dispatch(getCategoriesData());
    dispatch(getLocationsData());
  }, [dispatch]);
  //   useEffect(() => {
  //     dispatch(getCategoriesData());
  //   }, [dispatch]);

  useEffect(() => {
    dispatch(getUsersData());
  }, [dispatch]);
  //console.log("state products", state.products);
  //console.log("state categories", state.categories);
  return (
    <div>
      <div>
        <h2> Our Locations:</h2>
        {state.locations.map((location) => (
          <p key={location.id}> Location:{location.location}</p>
        ))}
      </div>

      <div>
        <h2> Our Categories:</h2>
        {state.categories.map((category) => (
          <p key={category.id}> Categories:{category.category_name}</p>
        ))}
      </div>

      {/** */}
      <div>
        <h2> Our Products:</h2>
        {state.products.map((product) => {
          return (
            <div key={product.id}>
              <p>
                {" "}
                Product Name:{product.product_name} Price:
                {product.price}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ProductList;
// {state.products.map((product) => (
//     <p key={product.id}> Product Name:{product.product_name}</p>
//     <p key={product.id}> Product Name:{product.price}</p>

//   ))}
