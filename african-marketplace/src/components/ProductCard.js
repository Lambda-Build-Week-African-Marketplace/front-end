import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Col, CardImg } from "reactstrap";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Backdrop from "@material-ui/core/Backdrop";
import {
  deleteProductData,
  postProductData,
  getCategoriesData,
  postCategoryData,
  getLocationsData,
  postLocationData,
  updateProductData,
} from "../actions/index";
import ProductModal from "./ProductModal";

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

const ProductCard = (props) => {
  const state = useSelector((state) => state);
  const [openEdit, setEditOpen] = React.useState(false);
  const [catEditToggle, setCatEditToggle] = useState(false);
  const [locationEditToggle, setLocationEditToggle] = useState(false);
  const [newEditProduct, setNewEditProduct] = useState(props.product);
  const [newEditCategory, setNewEditCategory] = useState(initialCategory);
  const [newEditLocation, setNewEditLocation] = useState(initialLocation);
  const [locationName, setLocationName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const dispatch = useDispatch();

  const handleOpenEdit = () => {
    setEditOpen(true);
  };

  const handleCloseEdit = (e) => {
    e.preventDefault();
    setEditOpen(false);
    setNewEditProduct(initialItem);
  };
  //------------Product handlers-----------------
  const changeHandler = (ev) => {
    ev.persist();
    let value = ev.target.value;
    if (ev.target.name === "price") {
      value = parseInt(value, 10);
    }
    setNewEditProduct({
      ...newEditProduct,
      [ev.target.name]: value,
    });
  };
  const handleProductSubmit = (e) => {
    e.preventDefault();
    // if (
    //   newEditProduct.category_id &&
    //   newEditProduct.product_name &&
    //   newEditProduct.price &&
    //   newEditProduct.description &&
    //   newEditProduct.location_id
    // ) {
    //   dispatch(updateProductData(newEditProduct, state.products));
    //   setNewEditProduct({
    //     ...newEditProduct,
    //     user_id: Number(window.localStorage.getItem("userID")),
    //     category_id: 0,
    //     product_name: "",
    //     price: "",
    //     description: "",
    //     location_id: 0,
    //   });
    //   setEditOpen(false);
    // } else {
    //   alert("All fields must be filled");
    //   console.log("newEditProduct", newEditProduct);
    // }
    //--------------------------------------
    dispatch(updateProductData(newEditProduct, state.products));

    setNewEditProduct({
      ...newEditProduct,
      user_id: Number(window.localStorage.getItem("userID")),
      category_id: 0,
      product_name: "",
      price: "",
      description: "",
      location_id: 0,
    });
    setEditOpen(false);
  };
  //------------Category handlers-----------------
  useEffect(() => {
    dispatch(getCategoriesData());
  }, [newEditCategory]);

  const changeCategoryHandler = (ev) => {
    ev.persist();
    setNewEditCategory({
      ...newEditCategory,
      [ev.target.name]: ev.target.value,
    });
  };
  const handleCategorySubmit = (e) => {
    e.preventDefault();

    if (
      state.categories.find((itemName) => {
        return itemName.category_name
          .toLowerCase()
          .includes(newEditCategory.category_name.toLowerCase());
      })
    ) {
      alert(
        `"${newEditCategory.category_name}" category has already been added`
      );
    } else {
      dispatch(postCategoryData(newEditCategory));
      setNewEditCategory(initialCategory);
      setCatEditToggle(false);
    }
  };
  const handleCatEditToggle = (e) => {
    e.preventDefault();
    setCatEditToggle(!catEditToggle);
    setNewEditCategory(initialCategory);
  };
  //------------Location handlers-----------------
  useEffect(() => {
    dispatch(getLocationsData());
  }, [newEditLocation]);

  const changeLocationHandler = (ev) => {
    ev.persist();
    setNewEditLocation({
      ...newEditLocation,
      [ev.target.name]: ev.target.value,
    });
  };
  const handleLocationSubmit = (e) => {
    e.preventDefault();

    if (
      state.locations.find((itemName) => {
        return itemName.location
          .toLowerCase()
          .includes(newEditLocation.location.toLowerCase());
      })
    ) {
      alert(`"${newEditLocation.location}" location has already been added`);
    } else {
      dispatch(postLocationData(newEditLocation));
      setNewEditLocation(initialLocation);
      setLocationEditToggle(false);
    }
  };
  const handleEditLocationToggle = (e) => {
    e.preventDefault();
    setLocationEditToggle(!locationEditToggle);
    setNewEditLocation(initialLocation);
  };

  //--------------delete product ----------------------
  const deleteProduct = (e) => {
    e.preventDefault();
    dispatch(deleteProductData(props.product_id, state.products));
  };
  //-------------------categories and locations handlers----------

  const getLocationName = () => {
    const lName = state?.locations?.find((l) => l.id === props.location_id);
    setLocationName(lName?.location);
  };
  const getCategoryName = () => {
    const cName = state?.categories?.find((c) => c.id === props.category_id);
    setCategoryName(cName?.category_name);
  };
  let locationCheck = state?.locations.length === 0;

  useEffect(() => {
    getLocationName();
    getCategoryName();
  }, [locationCheck]);

  return (
    <Col xs="12" md="6" xl="4">
      <Card
        style={{
          margin: "0.5rem",
          height: "auto",
          // height: "38rem",
          // overflowY: "scroll",
          background: "rgb(236, 236, 51)",
          opacity: "0.9",
        }}
      >
        <CardBody>
          <CardTitle
            style={{
              fontSize: "1.5rem",
              borderBottom: "1px solid grey",
              color: "rgb(236, 22, 22)",
            }}
          >
            {`${props.product_name}`}
          </CardTitle>
          <CardSubtitle
            style={{ marginBottom: "0.5rem" }}
          >{`Price: ${props.price}`}</CardSubtitle>
          <CardSubtitle>{`Description: ${props.description}`}</CardSubtitle>
          {/** */}
          <CardSubtitle>Location: {locationName}</CardSubtitle>
          <CardSubtitle>Category: {categoryName}</CardSubtitle>

          <CardActions style={{ marginLeft: "center" }}>
            <Button onClick={handleOpenEdit} size="small" color="primary">
              Edit
            </Button>
            <ProductModal
              open={openEdit}
              Backdrop={Backdrop}
              close={handleCloseEdit}
              handleProductSubmit={handleProductSubmit}
              changeHandler={changeHandler}
              newProduct={props.product}
              setNewProduct={setNewEditProduct}
              changeCategoryHandler={changeCategoryHandler}
              handleCategorySubmit={handleCategorySubmit}
              newCategory={newEditCategory}
              changeLocationHandler={changeLocationHandler}
              handleLocationSubmit={handleLocationSubmit}
              catToggle={catEditToggle}
              locationToggle={locationEditToggle}
              handleCatToggle={handleCatEditToggle}
              handleLocationToggle={handleEditLocationToggle}
              newLocation={newEditLocation}
            />
            <Button onClick={deleteProduct} size="small" color="primary">
              Delete
            </Button>
          </CardActions>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ProductCard;
