import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import HomeProductCard from "./HomeProductCard";
import { Container, Row, Col } from "reactstrap";
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
    <div className="home-bg" style={{ marginTop: "4rem" }}>
      <Container>
        <Row>
          <Col xs="12" md="12" xl="12">
            <h2 className="username" style={{ fontSize: "3rem" }}>
              {" "}
              Products of African Marketplace
            </h2>
          </Col>
        </Row>
        <Row>
          {state.products
            .filter((prod) => {
              return prod.product_name
                .toLowerCase()
                .includes(state.searchTerm.toLowerCase());
            })
            .map((el) => {
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
      </Container>
    </div>
  );
};
export default ProductList;
