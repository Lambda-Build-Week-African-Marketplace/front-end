import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { USER_STATE, SEARCH_STATE } from "../actions/index";
import { Container, Row, Col } from "reactstrap";
import { Spinner } from "reactstrap";

import {
  getProductsData,
  getCategoriesData,
  setUserProducts,
  setUser,
  getUsersData,
  postProductData,
  postCategoryData,
  deleteProductData,
  getLocationsData,
  postLocationData,
  deleteLocationData,
} from "../actions/index";
import ProductModal from "./ProductModal";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import ProductCard from "./ProductCard";

const initialItem = {
  user_id: 0,
  category_id: 0,
  product_name: "",
  price: "",
  description: "",
  location_id: 0,
};
const initialCategory = {
  category_name: "",
};
const initialLocation = {
  location: "",
};
const initialUser = {
  // id: 0,
  firstname: "",
  lastname: "",
  email: "",
  username: "",
};

const Dashboard = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [catToggle, setCatToggle] = useState(false);
  const [locationToggle, setLocationToggle] = useState(false);
  const state = useSelector((state) => state);
  const [newProduct, setNewProduct] = useState(initialItem);
  const [newUser, setNewUser] = useState(initialUser);
  const [newCategory, setNewCategory] = useState(initialCategory);
  const [newLocation, setNewLocation] = useState(initialLocation);

  const dispatch = useDispatch();

  useEffect(() => {
    const selectedUserId = Number(props.match.params.id);

    const selectedUser = state.users.find(
      (el) => el.id === Number(selectedUserId)
    );

    dispatch(setUser(selectedUser));

    setNewUser(selectedUser);
    const user_products = state.products.filter(
      (product) => product.user_id === selectedUserId
    );
    dispatch(setUserProducts(user_products));
    setNewProduct({
      ...newProduct,
      user_id: Number(window.localStorage.getItem("userID")),
    });
  }, [dispatch, props.match.params.id, window.localStorage.getItem("userID")]);

  useEffect(() => {
    dispatch(getUsersData());
  }, [newUser]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
    setNewProduct(initialItem);
  };

  //------------Product handlers-----------------

  useEffect(() => {
    dispatch(getProductsData());
  }, [newProduct]);
  const changeHandler = (ev) => {
    ev.persist();
    let value = ev.target.value;
    if (ev.target.name === "price") {
      value = parseInt(value, 10);
    }
    setNewProduct({
      ...newProduct,
      [ev.target.name]: value,
    });
  };
  const handleProductSubmit = (e) => {
    e.preventDefault();
    dispatch(postProductData(newProduct));

    setNewProduct({
      ...newProduct,
      user_id: Number(window.localStorage.getItem("userID")),
      category_id: 0,
      product_name: "",
      price: "",
      description: "",
      location_id: 0,
    });
    setOpen(false);
  };

  //------------Category handlers-----------------
  useEffect(() => {
    dispatch(getCategoriesData());
  }, [newCategory]);

  const changeCategoryHandler = (ev) => {
    ev.persist();
    setNewCategory({
      ...newCategory,
      [ev.target.name]: ev.target.value,
    });
  };

  const handleCatToggle = (e) => {
    e.preventDefault();
    setCatToggle(!catToggle);
    setNewCategory(initialCategory);
  };
  const handleCategorySubmit = (e) => {
    e.preventDefault();

    // if (
    //   state.categories.find((itemName) => {
    //     return itemName.category_name
    //       .toLowerCase()
    //       .includes(newCategory.category_name.toLowerCase());
    //   })
    // ) {
    //   alert(`"${newCategory.category_name}" category has already been added`);
    // } else {
    dispatch(postCategoryData(newCategory));
    setNewCategory(initialCategory);
    setCatToggle(false);
    // }
  };

  //------------Location handlers-----------------
  useEffect(() => {
    dispatch(getLocationsData());
  }, [newLocation]);

  const changeLocationHandler = (ev) => {
    ev.persist();
    setNewLocation({
      ...newLocation,
      [ev.target.name]: ev.target.value,
    });
  };

  const handleLocationSubmit = (e) => {
    e.preventDefault();

    // if (
    //   state.locations.find((itemName) => {
    //     return itemName.location
    //       .toLowerCase()
    //       .includes(newLocation.location.toLowerCase());
    //   })
    // ) {
    //   alert(`"${newLocation.location}" location has already been added`);
    // } else {
    dispatch(postLocationData(newLocation));
    setNewLocation(initialLocation);
    setLocationToggle(false);
    // }
  };

  const handleLocationToggle = (e) => {
    e.preventDefault();
    setLocationToggle(!locationToggle);
    setNewLocation(initialLocation);
  };

  //--------------delete location ----------------------
  const deleteLocation = (locId) => {
    dispatch(deleteLocationData(locId, state.locations));
  };

  return (
    <div className="dashboard" style={{ marginTop: "4rem" }}>
      {/** 
      <Container style={{ marginTop: "1rem", backgroundColor: "white" }}>
        <Row>
          locations:
          <Col>
            {state.locations.map((l) => (
              <div
                key={l.id}
                onClick={() => deleteLocation(l.id)}
                style={{ cursor: "pointer" }}
              >
                {l.location} {l.id}
              </div>
            ))}
          </Col>
        </Row>
        <Row>
          categories:
          <Col>
            {state.categories.map((c) => (
              <div>{c.category_name}</div>
            ))}
          </Col>
        </Row>
      </Container>
*/}

      {(!props.users || !state.isLoading) && (
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
      )}
      {/****************************************** */}
      {state.isLoading && !state.users ? (
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
      <Container style={{ marginTop: "1rem" }}>
        <Row>
          <Col xs="12" md="6" xl="6">
            {state.users
              .filter(
                (user) =>
                  Number(user.id) ===
                  Number(window.localStorage.getItem("userID"))
              )
              .map((el) => (
                <h3 key={el.id} className="username">
                  Products of {el.firstname} {el.lastname}
                </h3>
              ))}
          </Col>
          <Col xs="12" md="6" xl="6">
            <button
              type="button"
              onClick={handleOpen}
              className="md-button form-button dash-button"
            >
              Add Product
            </button>
          </Col>
        </Row>

        <ProductModal
          open={open}
          Backdrop={Backdrop}
          close={handleClose}
          handleProductSubmit={handleProductSubmit}
          changeHandler={changeHandler}
          newProduct={newProduct}
          setNewProduct={setNewProduct}
          changeCategoryHandler={changeCategoryHandler}
          handleCategorySubmit={handleCategorySubmit}
          newCategory={newCategory}
          handleCatToggle={handleCatToggle}
          catToggle={catToggle}
          locationToggle={locationToggle}
          changeLocationHandler={changeLocationHandler}
          handleLocationSubmit={handleLocationSubmit}
          newLocation={newLocation}
          handleLocationToggle={handleLocationToggle}
        />

        {state.isLoading && !state.products ? (
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

        <Row>
          {state.products
            .filter(
              (product) =>
                Number(product.user_id) ===
                Number(window.localStorage.getItem("userID"))
            )
            .filter((prod) => {
              return prod.product_name
                .toLowerCase()
                .includes(state.searchTerm.toLowerCase());
            })
            .map((el) => (
              <ProductCard key={el.id} product={el} />
            ))}
        </Row>
      </Container>
    </div>
  );
};
export default Dashboard;
const useStyles = makeStyles((theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);
