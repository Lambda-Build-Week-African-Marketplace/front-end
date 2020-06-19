import { axiosWithAuth } from "../util/axiosWithAuth";

export const DATA_START = "DATA_START";
export const DATA_USERS_SUCCESS = "DATA_USERS_SUCCESS";
export const DATA_CATEGORIES_SUCCESS = "DATA_CATEGORIES_SUCCESS";
export const DATA_PRODUCTS_SUCCESS = "DATA_PRODUCTS_SUCCESS";
export const DATA_LOCATIONS_SUCCESS = "DATA_LOCATIONS_SUCCESS";
export const DATA_FAILURE = "DATA_FAILURE";
export const EDITING_STATE = "EDITING_STATE";

//---------------GET DATA----------------------------
export const getUsersData = () => (dispatch) => {
  dispatch({ type: DATA_START });

  axiosWithAuth()
    .get("/users")
    .then((res) => {
      // console.log("get data", res);
      dispatch({ type: DATA_USERS_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      console.error("fetching data error: ", err);
      dispatch({ type: DATA_FAILURE, payload: err });
    });
};
export const getCategoriesData = () => (dispatch) => {
  dispatch({ type: DATA_START });

  axiosWithAuth()
    .get("/categories")
    .then((res) => {
      // console.log("get data", res);
      dispatch({ type: DATA_CATEGORIES_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      console.error("fetching data error: ", err);
      dispatch({ type: DATA_FAILURE, payload: err });
    });
};
export const getProductsData = () => (dispatch) => {
  dispatch({ type: DATA_START });

  axiosWithAuth()
    .get("/products")
    .then((res) => {
      // console.log("get data", res);
      dispatch({ type: DATA_PRODUCTS_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      console.error("fetching data error: ", err);
      dispatch({ type: DATA_FAILURE, payload: err });
    });
};
export const getLocationsData = () => (dispatch) => {
  dispatch({ type: DATA_START });

  axiosWithAuth()
    .get("/locations")
    .then((res) => {
      // console.log("get data", res);
      dispatch({ type: DATA_LOCATIONS_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      console.error("fetching data error: ", err);
      dispatch({ type: DATA_FAILURE, payload: err });
    });
};
//---------------POST DATA----------------------------
export const postUserData = (user) => (dispatch) => {
  dispatch({ type: DATA_START });
  //{"firstname":"user1fn","lastname":"user1fn","email":"user1fn","username":"user1fn","password":"user1fn"}
  axiosWithAuth()
    .post("/register", user)
    .then((res) => {
      console.log("post data", res.config.data);
      console.log(
        "JSON.parse('res.config.data')",
        JSON.parse(`${res.config.data}`)
      );

      dispatch({
        type: DATA_USERS_SUCCESS,
        payload: JSON.parse(`${res.config.data}`),
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
export const postCategoryData = (category) => (dispatch) => {
  dispatch({ type: DATA_START });

  axiosWithAuth()
    .post("/categories", category)
    .then((res) => {
      console.log("post data", res);
      dispatch({ type: DATA_CATEGORIES_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      console.error("post data error: ", err);
      dispatch({
        type: DATA_FAILURE,
        payload: err.response,
      });
    });
};
export const postProductData = (product) => (dispatch) => {
  dispatch({ type: DATA_START });

  axiosWithAuth()
    .post("/products", product)
    .then((res) => {
      console.log("post data", res);
      dispatch({ type: DATA_PRODUCTS_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      console.error("post data error: ", err);
      dispatch({
        type: DATA_FAILURE,
        payload: err.response,
      });
    });
};

export const postLocationData = (location) => (dispatch) => {
  dispatch({ type: DATA_START });

  axiosWithAuth()
    .post("/locations", location)
    .then((res) => {
      console.log("post data", res);
      dispatch({ type: DATA_LOCATIONS_SUCCESS, payload: res.data });
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

export const deleteUserData = (delId, users) => (dispatch) => {
  dispatch({ type: DATA_START });

  axiosWithAuth()
    .delete(`/users/${delId}`)
    .then((res) => {
      console.log("delete data", res);

      const newUsers = users.filter((item) => item.id !== delId);

      dispatch({ type: DATA_USERS_SUCCESS, payload: newUsers });
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
      console.log("delete data", res);

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
      console.log("update data", res);

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
      console.log("update data", res);

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
      console.log("update data", res);

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
      console.log("update data", res);

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
