import {
  DATA_START,
  DATA_USERS_SUCCESS,
  DATA_CATEGORIES_SUCCESS,
  DATA_PRODUCTS_SUCCESS,
  DATA_LOCATIONS_SUCCESS,
  DATA_FAILURE,
  EDITING_STATE,
  AUTH_STATE,
} from "../actions";

const initialState = {
  isLoading: false,
  users: [],
  categories: [],
  products: [],
  locations: [],
  error: "",
  auth: false,
  editing: false,
  user: {
    user_id: 0,
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    password: "",
  },

  category: {
    category_id: 0,
    categoryName: "",
  },

  product: {
    product_id: 0,
    category_id: 0,
    productName: "",
    price: 0.0,
    description: "",
    location: "",
    user_id: 0,
  },
};

export const marketReducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_START:
      return {
        ...state,
        isLoading: true,
      };
    case DATA_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        isLoading: false,
        error: "",
      };
    case DATA_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        isLoading: false,
        error: "",
      };
    case DATA_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        isLoading: false,
        error: "",
      };
    case DATA_LOCATIONS_SUCCESS:
      return {
        ...state,
        locations: action.payload,
        isLoading: false,
        error: "",
      };
    case DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case EDITING_STATE:
      return {
        ...state,
        editing: !state.editing,
      };
    case AUTH_STATE:
      return {
        ...state,
        auth: action.payload,
      };

    default:
      return state;
  }
};
