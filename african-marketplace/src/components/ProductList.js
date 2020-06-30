import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import HomeProductCard from "./HomeProductCard";
import { Container, Row, Col } from "reactstrap";
import { Spinner } from "reactstrap";
import {
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
      <Row style={{ marginTop: "4rem" }}>
        <Col xs="12" md="12" xl="12">
          <h2 className="username" style={{ fontSize: "3rem" }}>
            {" "}
            Products of African Marketplace
          </h2>
        </Col>
      </Row>
      <Row
        style={{
          margin: "1rem",
          background: "rgb(174, 238, 144)",
          opacity: "0.9",
        }}
      >
        <Col xs="12" md="12" xl="12">
          <p
            className="username"
            style={{ fontSize: "1.2rem", color: "#2C2C27" }}
          >
            {" "}
            Click on search by product, category, location for searching
            products, categories, and locations
          </p>
        </Col>
      </Row>
      {state.isLoading ? (
        <div style={{ margin: "0 auto" }}>
          <Spinner
            color="primary"
            style={{
              width: "3rem",
              height: "3rem",
              position: "absolute",
              top: "50%",
              left: "50%",
              marginLeft: "-50px",
              marginTop: "-50px",
            }}
          />{" "}
        </div>
      ) : null}
      {/***************Search by CAtegtory*************************** */}
      {(state.searchTerm && state.selectedSearchBtn === 2) ||
        (state.toggleSearch && (
          <Row>
            <Col xs="12" md="12" xl="12">
              <h2 className="username" style={{ fontSize: "3rem" }}>
                {" "}
                Search by Category
              </h2>
            </Col>
          </Row>
        ))}

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
                <div className="search-p" key={index}>
                  <p
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
        (state.toggleLocationSearch && (
          <Row>
            <Col xs="12" md="12" xl="12">
              <h2 className="username" style={{ fontSize: "3rem" }}>
                {" "}
                Search by Location
              </h2>
            </Col>
          </Row>
        ))}

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
                <div className="search-l" key={index}>
                  <p
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
      <Container style={{ marginTop: "2rem" }}>
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
            })
            .map((el) => {
              return <HomeProductCard key={el.id} product={el} />;
            })}
        </Row>
      </Container>

      {/*************** end of Search Location *************************** */}
    </div>
  );
};
export default ProductList;
