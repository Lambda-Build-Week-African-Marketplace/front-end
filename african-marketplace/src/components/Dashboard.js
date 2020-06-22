import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  getProductsData,
  getCategoriesData,
  getLocationsData,
  setUserProducts,
  setUser,
  postProductData,
} from "../actions/index";
import ProductModal from "./ProductModal";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
const initialItem = {
  user_id: 0,
  category_id: 0,
  product_name: "",
  price: "",
  description: "",
  location_id: 0,
};

const Dashboard = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const state = useSelector((state) => state);
  const [newProduct, setNewProduct] = useState(initialItem);
  const dispatch = useDispatch();

  useEffect(() => {
    //const selectedUserId = Number(window.localStorage.getItem("userID"));
    const selectedUserId = Number(props.match.params.id);
    dispatch(getProductsData());
    const user_products = state.products.filter(
      (product) => product.user_id === selectedUserId
    );
    const selectedUser = state.users.find((el) => el.id === selectedUserId);
    dispatch(setUserProducts(user_products));

    dispatch(setUser(selectedUser));

    setNewProduct({
      ...newProduct,
      user_id: Number(props.match.params.id),
    });
  }, [dispatch, props.match.params.id]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
    setNewProduct(initialItem);
  };

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
  };

  return (
    <div>
      <h2>
        {" "}
        User {state.user.firstname} {state.user.lastname} list of products:
      </h2>
      {state.userProducts.map((product) => (
        <p>{product.product_name}</p>
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
        handleSubmit={handleSubmit}
        changeHandler={changeHandler}
        newProduct={newProduct}
        setNewProduct={setNewProduct}
        categories={state.categories}
      />
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
