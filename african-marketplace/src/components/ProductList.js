import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import HomeProductCard from "./HomeProductCard";
import { Container, Row, Col } from "reactstrap";
import {
  SEARCH_LOCATION_STATE,
  SELECT_LOCATION_STATE,
  SELECTED_ID_STATE,
  SEARCH_STATE,
  TOGGLE_SEARCH_STATE,
  TOGGLE_LOCATION_SEARCH_STATE,
} from "../actions/index";
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
      {/***************Search by CAtegtory*************************** */}
      {(state.searchTerm && state.selectedSearchBtn === 2) || state.toggleSearch
        ? state.categories
            .filter((cat) =>
              cat.category_name
                .toLowerCase()
                .includes(state.searchTerm.toLowerCase())
            )
            .map((item, index) => {
              const categorySubmit = () => {
                dispatch({
                  type: SELECTED_ID_STATE,
                  payload: item.id,
                });
                dispatch({
                  type: TOGGLE_SEARCH_STATE,
                  payload: false,
                });

                dispatch({
                  type: SEARCH_STATE,
                  value: "",
                });
              };
              return (
                <div className="search-p">
                  <p
                    key={index}
                    style={{
                      cursor: "pointer",
                      color: "white",
                      fontSize: "1.5rem",
                      margin: "0",
                    }}
                    onClick={categorySubmit}
                  >
                    {item.category_name}
                  </p>
                </div>
              );
            })
        : null}
      {/***************end of Search by CAtegtory*************************** */}
      {/***************Search Location*************************** */}

      {(state.searchTerm && state.selectedSearchBtn === 3) ||
      state.toggleLocationSearch
        ? state.locations
            .filter((loc) =>
              loc.location
                .toLowerCase()
                .includes(state.searchTerm.toLowerCase())
            )
            .map((item, index) => {
              const locationSubmit = () => {
                //rememberLocation = item.id;
                dispatch({
                  type: SELECTED_ID_STATE,
                  payload: item.id,
                });
                dispatch({
                  type: TOGGLE_LOCATION_SEARCH_STATE,
                  payload: false,
                });

                dispatch({
                  type: SEARCH_STATE,
                  value: "",
                });
              };
              return (
                <div className="search-l">
                  <p
                    key={index}
                    style={{
                      cursor: "pointer",
                      color: "white",
                      fontSize: "1.5rem",
                      margin: "0",
                    }}
                    onClick={locationSubmit}
                  >
                    {item.location}
                  </p>
                </div>
              );
            })
        : null}
      {/***************************************************** */}
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
              // return prod.product_name
              // .toLowerCase()
              // .includes(state.searchTerm.toLowerCase());

              if (
                state.selectedSearchBtn === 1 ||
                state.selectedSearchBtn === 0
              ) {
                return prod.product_name
                  .toLowerCase()
                  .includes(state.searchTerm.toLowerCase());
              } else if (state.selectedSearchBtn === 3) {
                return prod.location_id === state.selectedId;
              } else {
                return prod.category_id === state.selectedId;
              }

              //return prod.location_id === state.selectedLocation;
              // return prod.location_id === state.selectedId;

              // if (state.searchLocation) {
              //   console.log("prod.locatioin_id", prod.location_id);
              //   return prod.location_id === state.selectedLocation;
              // } else {
              //   return prod;
              // }
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

      {/*************** end of Search Location *************************** */}
    </div>
  );
};
export default ProductList;
