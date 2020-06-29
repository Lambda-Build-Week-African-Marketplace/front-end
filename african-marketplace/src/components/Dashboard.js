import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { USER_STATE, SEARCH_STATE } from "../actions/index";
import { Container, Row, Col } from "reactstrap";
import { Spinner } from "reactstrap";
import * as yup from "yup";
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
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
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
    console.log("newProdict handProductSubmit", newProduct);
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
  // const cancelNewPost = (e) => {
  //   e.preventDefault();
  //   setNewProduct(initialItem);
  //   setNewProduct({
  //     ...newProduct,
  //     user_id: Number(window.localStorage.getItem("userID")),
  //   });
  // };

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
  // const handleCategorySubmit = (e) => {
  //   e.preventDefault();

  //   if (
  //     state.categories.find((itemName) => {
  //       return itemName.category_name
  //         .toLowerCase()
  //         .includes(newCategory.category_name.toLowerCase());
  //     })
  //   ) {
  //     alert(`"${newCategory.category_name}" category has already been added`);
  //   } else {
  //     dispatch(postCategoryData(newCategory));
  //     setNewCategory(initialCategory);
  //     setCatToggle(false);
  //   }
  // };
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
  // const handleLocationSubmit = (e) => {
  //   e.preventDefault();

  //   if (
  //     state.locations.find((itemName) => {
  //       return itemName.location
  //         .toLowerCase()
  //         .includes(newLocation.location.toLowerCase());
  //     })
  //   ) {
  //     alert(`"${newLocation.location}" location has already been added`);
  //   } else {
  //     dispatch(postLocationData(newLocation));
  //     setNewLocation(initialLocation);
  //     setLocationToggle(false);
  //   }
  // };

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
              <ProductCard
                key={el.id}
                product={el}
                // category_id={el.category_id}
                // product_name={el.product_name}
                // price={el.price}
                // description={el.description}
                // location_id={el.location_id}
                // user_id={el.user_id}
                // product_id={el.id}
              />
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

//----------------------------------------
// {id: 1, location: "West"}
// 1: {id: 4, location: "WEST"}
// 2: {id: 5, location: "North"}
// 3: {id: 7, location: "South"}
// 4: {id: 8, location: "South West"}
// 5: {id: 9, location: "South North"}
// 6: {id: 10, location: "Moscow"}
// 7: {id: 11, location: "west"}
// 8: {id: 12, location: "north west"}
// 9: {id: 13, location: "Ithaca"}
// 10: {id: 14, location: "North Sauti"}
// 11: {id: 15, location: "South Sauti"}
// 12: {id: 16, location: "West Sauti"}
// 13: {id: 17, location: "Central Sauti"}
// 14: {id: 18, location: "souti1"}
// 15: {id: 19, location: "suti2"}
// 16: {id: 20, location: "sauti4"}
// 17: {id: 21, location: "location1"}
// 18: {id: 22, location: "location2"}
// 19: {id: 23, location: "loc1"}
// 20: {id: 24, location: "loc2"}
// 21: {id: 25, location: "loc3"}
// 22: {id: 26, location: "loc4"}
// 23: {id: 27, location: "loc5"}
// 24: {id: 28, location: "loc6"}
// 25: {id: 29, location: "loc7"}
// 26: {id: 30, location: "loc8"}
// 27: {id: 31, location: "loc9"}
// 28: {id: 33, location: "loc11"}
// 29: {id: 34, location: "loc12"}
// 30: {id: 35, location: "loc13"}
// 31: {id: 36, location: "l1"}
// 32: {id: 37, location: "l2"}
// 33: {id: 38, location: "l3"}
// 34: {id: 39, location: "a1"}
// 35: {id: 40, location: "a2"}
// 36: {id: 42, location: "a3"}
// 37: {id: 44, location: "a4"}
// 38: {id: 45, location: "a5"}
// 39: {id: 47, location: "a6"}
// 40: {id: 48, location: "a7"}
// 41: {id: 49, location: "b1"}
// 42: {id: 50, location: "b2"}
// 43: {id: 51, location: ""}
// 44: {id: 52, location: "d1"}
// 45: {id: 53, location: "d3"}
// 46: {id: 54, location: "d4"}
// 47: {id: 55, location: "f1"}
// 48: {id: 56, location: "f3"}
// 49: {id: 57, location: "aa1"}
// 50: {id: 58, location: "aa2"}
// 51: {id: 59, location: "aa3"}
// 52: {id: 60, location: "aa4"}
// 53: {id: 61, location: "aa5"}
// 54: {id: 62, location: "as1"}
// 55: {id: 64, location: "a8"}
// 56: {id: 65, location: "a10"}
// 57: {id: 66, location: "a11"}
// 58: {id: 67, location: "aa6"}

//--------------------------------
// {id: 1, category_name: "Animal Product"}
// 1: {id: 2, category_name: "Bird Product"}
// 2: {id: 3, category_name: "Beans"}
// 3: {id: 4, category_name: "meet"}
// 4: {id: 5, category_name: "vegetables"}
// 5: {id: 6, category_name: "Poultry"}
// 6: {id: 7, category_name: "beans"}
// 7: {id: 8, category_name: "beans"}
// 8: {id: 9, category_name: "Cereals"}
// 9: {id: 10, category_name: "Flour"}
// 10: {id: 11, category_name: "wheat"}
// 11: {id: 12, category_name: "rice"}
// 12: {id: 13, category_name: "Fruit"}
// 13: {id: 14, category_name: "Berry"}
// 14: {id: 15, category_name: "Peas"}
// 15: {id: 16, category_name: "cow product"}
// 16: {id: 17, category_name: "beef"}
// 17: {id: 18, category_name: "wine"}
// 18: {id: 19, category_name: "onio"}
// 19: {id: 20, category_name: "poultry1"}
// 20: {id: 21, category_name: "poultry2"}
// 21: {id: 22, category_name: "ham"}
// 22: {id: 23, category_name: "bread"}
// 23: {id: 24, category_name: "cat1"}
// 24: {id: 25, category_name: "cat2"}
// 25: {id: 26, category_name: "cat3"}
// 26: {id: 27, category_name: "cat4"}
// 27: {id: 28, category_name: "cat5"}
// 28: {id: 29, category_name: "cat6"}
// 29: {id: 30, category_name: "cat8"}
// 30: {id: 31, category_name: "root"}
// 31: {id: 32, category_name: "nuts"}
// 32: {id: 33, category_name: "cat9"}
// 33: {id: 34, category_name: "cat10"}
// 34: {id: 35, category_name: "cat12"}
// 35: {id: 36, category_name: "c1"}
// 36: {id: 37, category_name: "c2"}
// 37: {id: 38, category_name: "c3"}
// 38: {id: 39, category_name: "a1"}
// 39: {id: 40, category_name: "a2"}
// 40: {id: 41, category_name: "a3"}
// 41: {id: 42, category_name: "a4"}
// 42: {id: 43, category_name: "a6"}
// 43: {id: 44, category_name: "a6"}
// 44: {id: 45, category_name: "a7"}
// 45: {id: 46, category_name: "b1"}
// 46: {id: 47, category_name: "b2"}
// 47: {id: 48, category_name: "b3"}
// 48: {id: 49, category_name: "d1"}
// 49: {id: 50, category_name: "d3"}
// 50: {id: 51, category_name: "d4"}
// 51: {id: 52, category_name: "f1"}
// 52: {id: 53, category_name: "f3"}
// 53: {id: 54, category_name: "bb1"}
// 54: {id: 55, category_name: "aa4"}
// 55: {id: 56, category_name: "aa5"}
// 56: {id: 57, category_name: "as1"}
// 57: {id: 58, category_name: "a8"}
// 58: {id: 59, category_name: "a9"}
// 59: {id: 60, category_name: "a10"}
// 60: {id: 61, category_name: "a11"}
// 61: {id: 62, category_name: "aa9"}
