import React, { useState, useEffect } from "react";
import { Col } from "reactstrap";
import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { Spinner } from "reactstrap";
const HomeProductCard = (props) => {
  const state = useSelector((state) => state);
  const [locationName, setLocationName] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const getLocationName = () => {
    const lName = state?.locations?.find(
      (l) => l.id === props.product.location_id
    );
    setLocationName(lName?.location);
  };
  const getCategoryName = () => {
    const cName = state?.categories?.find(
      (c) => c.id === props.product.category_id
    );
    setCategoryName(cName?.category_name);
  };
  let locationCheck = state?.locations.length === 0;
  useEffect(() => {
    getLocationName();
    getCategoryName();
  }, [locationCheck, props.product.location_id, props.product.category_id]);

  return (
    <Col xs="12" md="6" xl="4">
      {state.isLoading && !props.product && (
        <div style={{ margin: "0 auto" }}>
          <Spinner
            color="primary"
            style={{
              width: "3rem",
              height: "3rem",
              position: "absolute",
              top: "67%",
              left: "80%",
              marginLeft: "-50px",
              marginTop: "-50px",
            }}
          />{" "}
        </div>
      )}
      <Card
        style={{
          margin: "0.5rem",
          height: "auto",
          background: "rgb(174, 238, 144)",
          opacity: "0.9",
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
            {`${props.product.product_name}`}
          </CardTitle>
          <CardSubtitle
            style={{ marginBottom: "0.5rem" }}
          >{`Price: $${props.product.price}`}</CardSubtitle>
          <CardSubtitle>{`Description: ${props.product.description}`}</CardSubtitle>

          <CardSubtitle>Location: {locationName}</CardSubtitle>
          <CardSubtitle>Category: {categoryName}</CardSubtitle>
        </CardBody>
      </Card>
    </Col>
  );
};

export default HomeProductCard;
