import { axiosWithAuth } from "../util/axiosWithAuth";

export const DATA_START = "DATA_START";
export const DATA_USERS_SUCCESS = "DATA_USERS_SUCCESS";
export const DATA_CATEGORIES_SUCCESS = "DATA_CATEGORIES_SUCCESS";
export const DATA_PRODUCTS_SUCCESS = "DATA_PRODUCTS_SUCCESS";
export const DATA_LOCATIONS_SUCCESS = "DATA_LOCATIONS_SUCCESS";
export const DATA_FAILURE = "DATA_FAILURE";
export const EDITING_STATE = "EDITING_STATE";
export const AUTH_STATE = "AUTH_STATE";
export const USER_PRODUCTS_STATE = "USER_PRODUCTS_STATE";
export const USER_STATE = "USER_STATE";
export const SET_INITIAL_USER = "SET_INITIAL_USER";
export const POST_PRODUCTS_SUCCESS = "POST_PRODUCTS_SUCCESS";
export const POST_CATEGORIES_SUCCESS = "POST_CATEGORIES_SUCCESS";
export const POST_LOCATIONS_SUCCESS = "POST_LOCATIONS_SUCCESS";
export const DATA_LOGIN_SUCCESS = "DATA_LOGIN_SUCCESS";

//---------------GET USER DATA----------------------------
export const getUsersData = () => (dispatch) => {
  dispatch({ type: DATA_START });

  axiosWithAuth()
    .get("/users")
    .then((res) => {
      console.log("get user data", res);
      dispatch({ type: DATA_USERS_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      console.error("fetching data error: ", err);
      dispatch({ type: DATA_FAILURE, payload: err });
    });
};
//---------------GET CATEGORY DATA----------------------------
export const getCategoriesData = () => (dispatch) => {
  dispatch({ type: DATA_START });

  axiosWithAuth()
    .get("/category")
    .then((res) => {
      console.log("get categories", res);
      dispatch({ type: DATA_CATEGORIES_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      console.error("fetching data error: ", err);
      dispatch({ type: DATA_FAILURE, payload: err });
    });
};
//---------------GET PRODUCT DATA----------------------------
export const getProductsData = () => (dispatch) => {
  dispatch({ type: DATA_START });

  axiosWithAuth()
    .get("/products")
    .then((res) => {
      console.log("get products", res);
      dispatch({ type: DATA_PRODUCTS_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      console.error("fetching data error: ", err);
      dispatch({ type: DATA_FAILURE, payload: err });
    });
};
//---------------GET LOCATION DATA----------------------------
export const getLocationsData = () => (dispatch) => {
  dispatch({ type: DATA_START });

  axiosWithAuth()
    .get("/locations")
    .then((res) => {
      console.log("get locations data", res);
      dispatch({ type: DATA_LOCATIONS_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      console.error("fetching data error: ", err);
      dispatch({ type: DATA_FAILURE, payload: err });
    });
};
//---------------POST DATA----------------------------
//---------------POST USER DATA----------------------------
export const postUserData = (user) => (dispatch) => {
  dispatch({ type: DATA_START });

  axiosWithAuth()
    .post("/register", user)
    .then((res) => {
      console.log("post data", res.data);
      dispatch({
        type: DATA_USERS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.error("post data error: ", err);
      dispatch({
        type: DATA_FAILURE,
        payload: err,
      });
    });
};
//----------------POST LOGIN DATA------------------------------
export const postLoginData = (credentials) => (dispatch) => {
  dispatch({ type: DATA_START });

  axiosWithAuth()
    .post("/login", credentials)
    .then((res) => {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userID", res.data.user_id);
      dispatch({
        type: DATA_LOGIN_SUCCESS,
      });
    })
    .catch((err) => {
      console.error("post data error: ", err);
      dispatch({
        type: DATA_FAILURE,
        payload: err,
      });
    });
};
//---------------POST CATEGORY DATA----------------------------
export const postCategoryData = (category) => (dispatch) => {
  dispatch({ type: DATA_START });

  axiosWithAuth()
    .post("/category", category)
    .then((res) => {
      // getCategoriesData();
      // console.log("post category data", res.data);
      dispatch({
        type: POST_CATEGORIES_SUCCESS,
        payload: [res.data.id, category],
      });
    })
    .catch((err) => {
      console.error("post data error: ", err);
      dispatch({
        type: DATA_FAILURE,
        payload: err.response,
      });
    });
};
//---------------POST PRODUCT DATA----------------------------
export const postProductData = (product) => (dispatch) => {
  dispatch({ type: DATA_START });

  axiosWithAuth()
    .post("/products", product)
    .then((res) => {
      //getProductsData();
      console.log("post data.id11111", res.data[0].id);
      dispatch({
        type: POST_PRODUCTS_SUCCESS,
        payload: [res.data[0].id, product],
      });
    })

    .catch((err) => {
      console.error("post data error: ", err);
      dispatch({
        type: DATA_FAILURE,
        payload: err.response,
      });
    });
};
//---------------POST LOCATION DATA----------------------------
export const postLocationData = (location) => (dispatch) => {
  dispatch({ type: DATA_START });

  axiosWithAuth()
    .post("/locations", location)
    .then((res) => {
      console.log("post LOCATION data", res);
      dispatch({
        type: POST_LOCATIONS_SUCCESS,
        payload: [res.data.id, location],
      });
    })
    .catch((err) => {
      console.error("post data error: ", err);
      dispatch({
        type: DATA_FAILURE,
        payload: err.response,
      });
    });
};

//---------------DELETE DATA----------------------------

export const deleteUserData = (delId) => (dispatch) => {
  dispatch({ type: DATA_START });

  axiosWithAuth()
    .delete(`/users/${delId}`)
    .then((res) => {
      console.log("delete user data", res);

      // const newUsers = users.filter((item) => item.id !== delId);

      // dispatch({ type: DATA_USERS_SUCCESS, payload: newUsers });
    })
    .catch((err) => {
      console.error("delete data error: ", err);
      dispatch({
        type: DATA_FAILURE,
        payload: err.response,
      });
    });
};

export const deleteCategoryData = (delId, categories) => (dispatch) => {
  dispatch({ type: DATA_START });

  axiosWithAuth()
    .delete(`/categories/${delId}`)
    .then((res) => {
      console.log("delete data", res);

      const newCategories = categories.filter((item) => item.id !== delId);

      dispatch({ type: DATA_CATEGORIES_SUCCESS, payload: newCategories });
    })
    .catch((err) => {
      console.error("delete data error: ", err);
      dispatch({
        type: DATA_FAILURE,
        payload: err.response,
      });
    });
};

export const deleteProductData = (delId, products) => (dispatch) => {
  dispatch({ type: DATA_START });

  axiosWithAuth()
    .delete(`/products/${delId}`)
    .then((res) => {
      console.log("delete product data", res);

      const newProducts = products.filter((item) => item.id !== delId);

      dispatch({ type: DATA_PRODUCTS_SUCCESS, payload: newProducts });
    })
    .catch((err) => {
      console.error("delete data error: ", err);
      dispatch({
        type: DATA_FAILURE,
        payload: err.response,
      });
    });
};

export const deleteLocationData = (delId, locations) => (dispatch) => {
  dispatch({ type: DATA_START });

  axiosWithAuth()
    .delete(`/locations/${delId}`)
    .then((res) => {
      console.log("delete data", res);

      const newLocations = locations.filter((item) => item.id !== delId);

      dispatch({ type: DATA_LOCATIONS_SUCCESS, payload: newLocations });
    })
    .catch((err) => {
      console.error("delete data error: ", err);
      dispatch({
        type: DATA_FAILURE,
        payload: err.response,
      });
    });
};

//---------------UPDATE DATA----------------------------
export const updateUserData = (user, users) => (dispatch) => {
  dispatch({ type: DATA_START });

  axiosWithAuth()
    .put(`/users/${user.id}`, user)
    .then((res) => {
      console.log("update user data", res);

      const newUsers = users.map((el) => {
        if (el.id === user.id) {
          return user;
        }
        return el;
      });

      dispatch({ type: DATA_USERS_SUCCESS, payload: newUsers });
    })
    .catch((err) => {
      console.error("update data error: ", err);
      dispatch({
        type: DATA_FAILURE,
        payload: err.response,
      });
    });
};

export const updateCategoryData = (category, categories) => (dispatch) => {
  dispatch({ type: DATA_START });

  axiosWithAuth()
    .put(`/categories/${category.id}`, category)
    .then((res) => {
      console.log("update category data", res);

      const newCategories = categories.map((el) => {
        if (el.id === category.id) {
          return category;
        }
        return el;
      });

      dispatch({ type: DATA_CATEGORIES_SUCCESS, payload: newCategories });
    })
    .catch((err) => {
      console.error("update data error: ", err);
      dispatch({
        type: DATA_FAILURE,
        payload: err.response,
      });
    });
};

export const updateProductData = (product, products) => (dispatch) => {
  dispatch({ type: DATA_START });

  axiosWithAuth()
    .put(`/products/${product.id}`, product)
    .then((res) => {
      console.log("update product data", res);

      const newProducts = products.map((el) => {
        if (el.id === product.id) {
          return product;
        }
        return el;
      });

      dispatch({ type: DATA_PRODUCTS_SUCCESS, payload: newProducts });
    })
    .catch((err) => {
      console.error("update data error: ", err);
      dispatch({
        type: DATA_FAILURE,
        payload: err.response,
      });
    });
};

export const updateLocationData = (location, locations) => (dispatch) => {
  dispatch({ type: DATA_START });

  axiosWithAuth()
    .put(`/locations/${location.id}`, location)
    .then((res) => {
      console.log("update location data", res);

      const newLocations = locations.map((el) => {
        if (el.id === location.id) {
          return location;
        }
        return el;
      });

      dispatch({ type: DATA_LOCATIONS_SUCCESS, payload: newLocations });
    })
    .catch((err) => {
      console.error("update data error: ", err);
      dispatch({
        type: DATA_FAILURE,
        payload: err.response,
      });
    });
};

//--------------USER_PRODUCTS_STATE-------------------

export const setUserProducts = (user_prod) => (dispatch) => {
  dispatch({ type: USER_PRODUCTS_STATE, payload: user_prod });
};
//--------------AUTH_STATE-------------------
export const authMenuBar = (togg) => (dispatch) => {
  dispatch({ type: AUTH_STATE, payload: togg });
};

//----------------USER_STATE------------------
export const setUser = (user) => (dispatch) => {
  dispatch({ type: USER_STATE, payload: user });
};
