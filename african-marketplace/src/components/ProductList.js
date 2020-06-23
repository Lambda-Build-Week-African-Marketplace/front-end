import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "./ProductCard";
import { Container, Row } from "reactstrap";
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
    dispatch(getUsersData());
    dispatch(getProductsData());
    dispatch(getCategoriesData());
    dispatch(getLocationsData());
  }, [dispatch]);

  return (
    <div>
      <Container style={{ marginTop: "1rem" }}>
        {/**
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

         */}
        <div>
          <h2> Our Products:</h2>
          <Row>
            {state.products.map((el) => {
              return (
                <ProductCard
                  key={el.id}
                  category_id={el.category_id}
                  product_name={el.product_name}
                  price={el.price}
                  description={el.description}
                  location_id={el.location_id}
                  user_id={el.user_id}
                  dashboard_flag={false}
                />
              );
            })}
          </Row>
        </div>
      </Container>
    </div>
  );
};
export default ProductList;
// {state.products.map((product) => (
//     <p key={product.id}> Product Name:{product.product_name}</p>
//     <p key={product.id}> Product Name:{product.price}</p>

//   ))}
