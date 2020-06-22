import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  getProductsData,
  getCategoriesData,
  getLocationsData,
  setUserProducts,
  setUser,
  getUsersData,
  postProductData,
  postCategoryData,
} from "../actions/index";
import ProductModal from "./ProductModal";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useForm } from "../hooks/useForm";
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
const initialUser = {
  //user_id: "0",
  firstname: "",
  lastname: "",
  email: "",
  username: "",
};

const Dashboard = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [catToggle, setCatToggle] = useState(false);
  const state = useSelector((state) => state);
  const [newProduct, setNewProduct] = useState(initialItem);
  const [newCategory, setNewCategory] = useState(initialCategory);
  const [newUser, setNewUser] = useState(initialUser);
  const [
    localUser,
    handleChanges,
    clearForm,
    handleSubmit1,
    handleSetObj,
  ] = useForm("locUser", initialUser);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsersData());
    dispatch(getProductsData());
    dispatch(getCategoriesData());
    dispatch(getLocationsData());
  }, [dispatch]);

  useEffect(() => {
    const selectedUserId = Number(props.match.params.id);
    //const selectedUserId = window.localStorage.getItem("userID");

    const selectedUser = state.users.find(
      (el) => el.id === Number(selectedUserId)
    );
    setNewUser(selectedUser);
    console.log("selectedUser", selectedUser);
    handleSetObj(selectedUser);
    console.log("localUser", localUser);

    //--------------------user's products--------------------------
    dispatch(getProductsData());
    dispatch(getCategoriesData());
    const user_products = state.products.filter(
      (product) => product.user_id === selectedUserId
    );
    dispatch(setUserProducts(user_products));
    setNewProduct({
      ...newProduct,
      user_id: Number(window.localStorage.getItem("userID")),
    });
  }, [
    dispatch,
    props.match.params.id,
    window.localStorage.getItem("userID"),
    localUser,
    // newCategory,
    // newProduct,
  ]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
    setNewProduct(initialItem);
  };

  //------------Product handlers-----------------
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
  const handleSubmit = (e) => {
    console.log("newProduct", newProduct);

    e.preventDefault();
    dispatch(postProductData(newProduct));
    setNewProduct(initialItem);
    setOpen(false);
    dispatch(getProductsData());
  };
  //------------Category handlers-----------------
  const changeCategoryHandler = (ev) => {
    ev.persist();

    setNewCategory({
      ...newCategory,
      [ev.target.name]: ev.target.value,
    });
  };
  const handleCategorySubmit = (e) => {
    console.log("newCategory", newCategory);

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
      <h2>
        {" "}
        User {newUser.firstname} {newUser.lastname} list of products:
      </h2>

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
        handleSubmit={handleSubmit}
        changeHandler={changeHandler}
        newProduct={newProduct}
        setNewProduct={setNewProduct}
        categories={state.categories}
        changeCategoryHandler={changeCategoryHandler}
        handleCategorySubmit={handleCategorySubmit}
        newCategory={newCategory}
        //setCatToggle={setCatToggle}
        catToggle={catToggle}
        handleCatToggle={handleCatToggle}
      />

      <h2> My products:</h2>
      {state.products
        .filter(
          (product) =>
            Number(product.user_id) ===
            Number(window.localStorage.getItem("userID"))
        )
        .map((el) => (
          <p>{el.product_name}</p>
        ))}
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
