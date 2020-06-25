import React, { useState, useEffect } from "react";
import { Col, CardImg } from "reactstrap";
import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { getCategoriesData, getLocationsData } from "../actions/index";

const HomeProductCard = (props) => {
  const state = useSelector((state) => state);
  const [locationName, setLocationName] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const dispatch = useDispatch();

  // useEffect(() => {
  //   getLocationName();
  // }, []);
  // useEffect(() => {
  //   getCategoryName();
  // }, []);

  const getLocationName = () => {
    const lName = state.locations.find((l) => l.id === props.location_id);
    setLocationName(lName.location);
  };
  const getCategoryName = () => {
    const cName = state.categories.find((c) => c.id === props.category_id);
    setCategoryName(cName.category_name);
  };

  return (
    <Col xs="12" md="6" xl="4">
      <Card
        style={{
          margin: "0.5rem",
          height: "auto",
          // height: "38rem",
          // overflowY: "scroll",
          background: "#F4F4F4",
        }}
      >
        <CardBody>
          <CardTitle
            style={{
              fontSize: "1.5rem",
              borderBottom: "1px solid grey",
              color: "#4154B3",
            }}
          >
            {`${props.product_name}`}
          </CardTitle>
          <CardSubtitle
            style={{ marginBottom: "0.5rem" }}
          >{`Price: ${props.price}`}</CardSubtitle>
          <CardSubtitle>{`Description: ${props.description}`}</CardSubtitle>

          <CardSubtitle>Location: {locationName}</CardSubtitle>
          <CardSubtitle>Category: {categoryName}</CardSubtitle>
        </CardBody>
      </Card>
    </Col>
  );
};

export default HomeProductCard;
