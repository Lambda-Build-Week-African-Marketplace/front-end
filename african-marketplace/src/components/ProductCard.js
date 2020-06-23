import React from "react";
import { connect } from "react-redux";
import { Col, CardImg } from "reactstrap";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteProductData } from "../actions/index";

const ProductCard = (props) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  // const deleteProduct = ((props.productId) =>
  //     dispatch(deleteProductData(props.productId, state.products))
  //   );

  const deleteProduct = (e) => {
    e.preventDefault();
    dispatch(deleteProductData(props.product_id, state.products));
  };

  // const deleteProduct = (productId) => {
  //     dispatch(deleteProductData(productId, state.products));
  //   };
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

          {props.dashboard_flag ? (
            <CardActions style={{ marginLeft: "center" }}>
              <Button size="small" color="primary">
                Edit
              </Button>
              <Button onClick={deleteProduct} size="small" color="primary">
                Delete
              </Button>
            </CardActions>
          ) : null}
        </CardBody>
      </Card>
    </Col>
  );
};

export default ProductCard;
