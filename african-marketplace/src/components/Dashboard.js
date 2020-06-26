import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { USER_STATE, SEARCH_STATE } from "../actions/index";
import { Container, Row, Col } from "reactstrap";
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

  //-----------------------------------------
  // const handleProductSubmit = (e) => {
  //   e.preventDefault();
  //   if (
  //     newProduct.category_id &&
  //     newProduct.product_name &&
  //     newProduct.price &&
  //     newProduct.description &&
  //     newProduct.location_id
  //   ) {
  //     dispatch(postProductData(newProduct));
  //     setNewProduct({
  //       ...newProduct,
  //       user_id: Number(window.localStorage.getItem("userID")),
  //       category_id: 0,
  //       product_name: "",
  //       price: "",
  //       description: "",
  //       location_id: 0,
  //     });
  //     setOpen(false);
  //   } else {
  //     alert("All fields must be filled");
  //   }
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
  const handleCategorySubmit = (e) => {
    e.preventDefault();

    if (
      state.categories.find((itemName) => {
        return itemName.category_name
          .toLowerCase()
          .includes(newCategory.category_name.toLowerCase());
      })
    ) {
      alert(`"${newCategory.category_name}" category has already been added`);
    } else {
      dispatch(postCategoryData(newCategory));
      setNewCategory(initialCategory);
      setCatToggle(false);
    }
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

    if (
      state.locations.find((itemName) => {
        return itemName.location
          .toLowerCase()
          .includes(newLocation.location.toLowerCase());
      })
    ) {
      alert(`"${newLocation.location}" location has already been added`);
    } else {
      dispatch(postLocationData(newLocation));
      setNewLocation(initialLocation);
      setLocationToggle(false);
    }
  };
  const handleLocationToggle = (e) => {
    e.preventDefault();
    setLocationToggle(!locationToggle);
    setNewLocation(initialLocation);
  };

  return (
    <div className="dashboard" style={{ marginTop: "4rem" }}>
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
                category_id={el.category_id}
                product_name={el.product_name}
                price={el.price}
                description={el.description}
                location_id={el.location_id}
                user_id={el.user_id}
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

// const formSchema = yup.object().shape({
//   category_id: yup.string().required(),
//   product_name: yup.string().required("Product name is a required field"),
//   price: yup.number().required().positive().integer(),
//   description: yup.string().required("Description is a required field"),
//   location_id: yup.string().required(),
// });

// const Dashboard = (props) => {
//   const classes = useStyles();
//   const [open, setOpen] = React.useState(false);
//   const [catToggle, setCatToggle] = useState(false);
//   const [locationToggle, setLocationToggle] = useState(false);
//   const state = useSelector((state) => state);
//   const [newProduct, setNewProduct] = useState(initialItem);

//   const [newUser, setNewUser] = useState(initialUser);
//   const [newCategory, setNewCategory] = useState(initialCategory);
//   const [newLocation, setNewLocation] = useState(initialLocation);

//   const dispatch = useDispatch();

//   const [errors, setErrors] = useState({
//     category_id: "",
//     product_name: "",
//     price: "",
//     description: "",
//     location_id: "",
//   });
//   const [buttonDisabled, setButtonDisabled] = useState(true);
//   useEffect(() => {
//     formSchema.isValid(newProduct).then((valid) => {
//       setButtonDisabled(!valid);
//     });
//   }, [newProduct]);

//   useEffect(() => {
//     const selectedUserId = Number(props.match.params.id);

//     const selectedUser = state.users.find(
//       (el) => el.id === Number(selectedUserId)
//     );

//     dispatch(setUser(selectedUser));

//     setNewUser(selectedUser);
//     const user_products = state.products.filter(
//       (product) => product.user_id === selectedUserId
//     );
//     dispatch(setUserProducts(user_products));
//     setNewProduct({
//       ...newProduct,
//       user_id: Number(window.localStorage.getItem("userID")),
//     });
//   }, [dispatch, window.localStorage.getItem("userID")]);

//   const validateChange = (e) => {
//     yup
//       .reach(formSchema, e.target.name)
//       .validate(e.target.value)
//       .then((valid) => {
//         setErrors({
//           ...errors,
//           [e.target.name]: "",
//         });
//       })
//       .catch((err) => {
//         setErrors({
//           ...errors,
//           [e.target.name]: err.errors,
//         });
//       });
//   };

//   useEffect(() => {
//     dispatch(getUsersData());
//   }, [newUser]);

//   const handleOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = (e) => {
//     e.preventDefault();
//     setOpen(false);
//     setNewProduct(initialItem);
//   };

//   //------------Product handlers-----------------

//   useEffect(() => {
//     dispatch(getProductsData());
//   }, [newProduct]);
//   const changeHandler = (ev) => {
//     ev.persist();

//     // const newFormData = {
//     //   ...newProduct,
//     //   [ev.target.name]: ev.target.value,
//     // };
//     // validateChange(ev);
//     // setNewProduct(newFormData);

//     let value = ev.target.value;
//     if (ev.target.name === "price") {
//       value = parseInt(value, 10);
//     }
//     validateChange(ev);
//     setNewProduct({
//       ...newProduct,
//       [ev.target.name]: value,
//     });
//   };
//   const handleProductSubmit = (e) => {
//     e.preventDefault();
//     dispatch(postProductData(newProduct));

//     setNewProduct({
//       ...newProduct,
//       user_id: Number(window.localStorage.getItem("userID")),
//       category_id: 0,
//       product_name: "",
//       price: "",
//       description: "",
//       location_id: 0,
//     });
//     setOpen(false);
//   };
//   const cancelNewPost = (e) => {
//     e.preventDefault();
//     setNewProduct(initialItem);
//     setNewProduct({
//       ...newProduct,
//       user_id: Number(window.localStorage.getItem("userID")),
//     });
//   };

//   //-----------------------------------------
//   // const handleProductSubmit = (e) => {
//   //   e.preventDefault();
//   //   if (
//   //     newProduct.category_id &&
//   //     newProduct.product_name &&
//   //     newProduct.price &&
//   //     newProduct.description &&
//   //     newProduct.location_id
//   //   ) {
//   //     dispatch(postProductData(newProduct));
//   //     setNewProduct({
//   //       ...newProduct,
//   //       user_id: Number(window.localStorage.getItem("userID")),
//   //       category_id: 0,
//   //       product_name: "",
//   //       price: "",
//   //       description: "",
//   //       location_id: 0,
//   //     });
//   //     setOpen(false);
//   //   } else {
//   //     alert("All fields must be filled");
//   //   }
//   // };

//   //------------Category handlers-----------------
//   useEffect(() => {
//     dispatch(getCategoriesData());
//   }, [newCategory]);

//   const changeCategoryHandler = (ev) => {
//     ev.persist();
//     setNewCategory({
//       ...newCategory,
//       [ev.target.name]: ev.target.value,
//     });
//   };
//   const handleCategorySubmit = (e) => {
//     e.preventDefault();

//     if (
//       state.categories.find((itemName) => {
//         return itemName.category_name
//           .toLowerCase()
//           .includes(newCategory.category_name.toLowerCase());
//       })
//     ) {
//       alert(`"${newCategory.category_name}" category has already been added`);
//     } else {
//       dispatch(postCategoryData(newCategory));
//       setNewCategory(initialCategory);
//       setCatToggle(false);
//     }
//   };
//   const handleCatToggle = (e) => {
//     e.preventDefault();
//     setCatToggle(!catToggle);
//     setNewCategory(initialCategory);
//   };

//   //------------Location handlers-----------------
//   useEffect(() => {
//     dispatch(getLocationsData());
//   }, [newLocation]);

//   const changeLocationHandler = (ev) => {
//     ev.persist();
//     setNewLocation({
//       ...newLocation,
//       [ev.target.name]: ev.target.value,
//     });
//   };
//   const handleLocationSubmit = (e) => {
//     e.preventDefault();

//     if (
//       state.locations.find((itemName) => {
//         return itemName.location
//           .toLowerCase()
//           .includes(newLocation.location.toLowerCase());
//       })
//     ) {
//       alert(`"${newLocation.location}" location has already been added`);
//     } else {
//       dispatch(postLocationData(newLocation));
//       setNewLocation(initialLocation);
//       setLocationToggle(false);
//     }
//   };
//   const handleLocationToggle = (e) => {
//     e.preventDefault();
//     setLocationToggle(!locationToggle);
//     setNewLocation(initialLocation);
//   };
//   console.log("newProduct", newProduct);
//   return (
//     <div className="dashboard" style={{ marginTop: "4rem" }}>
//       <Container style={{ marginTop: "1rem" }}>
//         <Row>
//           <Col xs="12" md="6" xl="6">
//             {state.users
//               .filter(
//                 (user) =>
//                   Number(user.id) ===
//                   Number(window.localStorage.getItem("userID"))
//               )
//               .map((el) => (
//                 <h3 key={el.id} className="username">
//                   Products of {el.firstname} {el.lastname}
//                 </h3>
//               ))}
//           </Col>
//           <Col xs="12" md="6" xl="6">
//             <button
//               type="button"
//               onClick={handleOpen}
//               className="md-button form-button dash-button"
//             >
//               Add Product
//             </button>
//           </Col>
//         </Row>

//         <ProductModal
//           open={open}
//           Backdrop={Backdrop}
//           close={handleClose}
//           handleProductSubmit={handleProductSubmit}
//           changeHandler={changeHandler}
//           newProduct={newProduct}
//           setNewProduct={setNewProduct}
//           changeCategoryHandler={changeCategoryHandler}
//           handleCategorySubmit={handleCategorySubmit}
//           newCategory={newCategory}
//           handleCatToggle={handleCatToggle}
//           catToggle={catToggle}
//           locationToggle={locationToggle}
//           changeLocationHandler={changeLocationHandler}
//           handleLocationSubmit={handleLocationSubmit}
//           newLocation={newLocation}
//           handleLocationToggle={handleLocationToggle}
//           errors={errors}
//           buttonDisabled={buttonDisabled}
//         />

//         <Row>
//           {state.products
//             .filter(
//               (product) =>
//                 Number(product.user_id) ===
//                 Number(window.localStorage.getItem("userID"))
//             )
//             .map((el) => (
//               <ProductCard
//                 key={el.id}
//                 product={el}
//                 category_id={el.category_id}
//                 product_name={el.product_name}
//                 price={el.price}
//                 description={el.description}
//                 location_id={el.location_id}
//                 user_id={el.user_id}
//                 product_id={el.id}
//               />
//             ))}
//         </Row>
//       </Container>
//     </div>
//   );
// };
// export default Dashboard;
