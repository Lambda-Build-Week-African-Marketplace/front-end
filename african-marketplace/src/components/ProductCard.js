import React from "react";
import { connect } from "react-redux";
import { Col, CardImg } from "reactstrap";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { Link } from "react-router-dom";

const ProductCard = (props) => {
  //   const handleSearchToggle = () => {
  //     props.setSearchToggle(true);
  //     props.setSearchTerm("");
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

          <CardActions style={{ marginLeft: "center" }}>
            <Button size="small" color="primary">
              Edit
            </Button>
            <Button size="small" color="primary">
              Delete
            </Button>
          </CardActions>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ProductCard;
