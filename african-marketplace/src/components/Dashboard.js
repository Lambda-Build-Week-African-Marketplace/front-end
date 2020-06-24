import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { USER_STATE } from "../actions/index";
import { Container, Row } from "reactstrap";
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
  }, [dispatch, window.localStorage.getItem("userID")]);

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
  const cancelNewPost = (e) => {
    e.preventDefault();
    setNewProduct(initialItem);
    setNewProduct({
      ...newProduct,
      user_id: Number(window.localStorage.getItem("userID")),
    });
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
  const handleCategorySubmit = (e) => {
    e.preventDefault();
    dispatch(postCategoryData(newCategory));
    setNewCategory(initialCategory);
    setCatToggle(false);
  };
  const handleCatToggle = (e) => {
    e.preventDefault();
    setCatToggle(!catToggle);
    setNewCategory(initialCategory);
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
    dispatch(postLocationData(newLocation));
    setNewLocation(initialLocation);
    setLocationToggle(false);
  };
  const handleLocationToggle = (e) => {
    e.preventDefault();
    setLocationToggle(!locationToggle);
    setNewLocation(initialLocation);
  };
  //-----------------Location handlers-------------------
  // useEffect(() => {
  //   let userProducts = state.products.filter(
  //     (product) => Number(product.user_id) === Number(localUser.id)
  //   );
  //   console.log("useProducts", userProducts);
  //   let userLocations = [];
  //   userProducts.forEach((el) =>
  //     userLocations.push(
  //       state.locations.filter(
  //         (loc) => Number(loc.id) === Number(el.location_id)
  //       )
  //     )
  //   );

  //   const uniqueLocationsSet = [
  //     ...new Set(userLocations.map((item) => item.id)),
  //   ];

  //   console.log("userLocations", userLocations);
  //   console.log("uniqueLocationsSet", uniqueLocationsSet);
  // }, [newProduct]);

  return (
    <div>
      <Container style={{ marginTop: "1rem" }}>
        {state.users
          .filter(
            (user) =>
              Number(user.id) === Number(window.localStorage.getItem("userID"))
          )
          .map((el) => (
            <p key={el.id}>
              User First Name: {el.firstname} User Last Name: {el.lastname}
            </p>
          ))}

        <button
          type="button"
          onClick={handleOpen}
          className="md-button form-button"
        >
          Add Product
        </button>
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

        <h2> My products:</h2>
        <Row>
          {state.products
            .filter(
              (product) =>
                Number(product.user_id) ===
                Number(window.localStorage.getItem("userID"))
            )
            .map((el) => (
              <ProductCard
                key={el.id}
                product={el}
                category_id={el.category_id}
                product_name={el.product_name}
                price={el.price}
                description={el.description}
                location_id={el.location_id}
                user_id={el.user_id}
                dashboard_flag={true}
                product_id={el.id}
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
