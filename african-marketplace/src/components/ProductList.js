import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import HomeProductCard from "./HomeProductCard";
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
        <div>
          <h2> Our Products:</h2>
          <Row>
            {state.products.map((el) => {
              return (
                <HomeProductCard
                  key={el.id}
                  category_id={el.category_id}
                  product_name={el.product_name}
                  price={el.price}
                  description={el.description}
                  location_id={el.location_id}
                  user_id={el.user_id}
                  product={el}
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
