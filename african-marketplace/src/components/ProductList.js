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
  // const [locationName, setLocationName] = useState("");
  // const [categoryName, setCategoryName] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersData());
    dispatch(getProductsData());
    dispatch(getCategoriesData());
    dispatch(getLocationsData());
  }, [dispatch]);

  // const getLocationName = (locId) => {
  //   const lName = state.locations.find((l) => Number(l.id) === Number(locId));
  //    setLocationName(lName.location);
  // };
  // const getCategoryName = (catId) => {
  //   const cName = state.categories.find((c) => Number(c.id) === Number(catId));
  //   console.log("cName", cName.category_name);
  //   setCategoryName(cName.category_name);
  // };

  return (
    <div>
      <Container style={{ marginTop: "1rem" }}>
        <div>
          <h2> Our Products:</h2>
          <Row>
            {state.products.map((el) => {
              // const locFunction = () => getLocationName(el.location_id);
              // const catFunction = () => getCategoryName(el.category_id);

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
                  // locFunction={locFunction}
                  // catFunction={catFunction}
                  // locationName={locationName}
                  // categoryName={categoryName}
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
