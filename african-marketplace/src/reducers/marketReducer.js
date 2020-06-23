import {
  DATA_START,
  DATA_USERS_SUCCESS,
  DATA_CATEGORIES_SUCCESS,
  DATA_PRODUCTS_SUCCESS,
  DATA_LOCATIONS_SUCCESS,
  DATA_FAILURE,
  EDITING_STATE,
  AUTH_STATE,
  USER_PRODUCTS_STATE,
  USER_STATE,
  SET_INITIAL_USER,
  POST_PRODUCTS_SUCCESS,
  POST_CATEGORIES_SUCCESS,
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
    id: 0,
    firstname: "",
    lastname: "",
    email: "",
    username: "",
  },

  category: {
    id: 0,
    category_name: "",
  },

  product: {
    id: 0,
    category_id: 0,
    product_name: "",
    price: "",
    description: "",
    location_id: 0,
    user_id: 0,
  },
  userProducts: [],
  location: {
    id: 0,
    location: "",
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
    //------------------------
    case POST_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: [
          ...state.products,
          {
            id: action.payload[0],
            category_id: action.payload[1].category_id,
            description: action.payload[1].description,
            location_id: action.payload[1].location_id,
            price: action.payload[1].price,
            product_name: action.payload[1].product_name,
            user_id: action.payload[1].user_id,
          },
        ],

        isLoading: false,
        error: "",
      };
    //-------------------------
    case DATA_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        isLoading: false,
        error: "",
      };
    case POST_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: [
          ...state.categories,
          {
            id: action.payload[0],
            category_name: action.payload[1].category_name,
          },
        ],

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
    case USER_PRODUCTS_STATE:
      return {
        ...state,
        userProducts: action.payload,
      };
    case USER_STATE:
      return {
        ...state,
        user: action.payload,
      };

    case SET_INITIAL_USER:
      return {
        ...state,
        user: {
          id: 0,
          firstname: "",
          lastname: "",
          email: "",
          username: "",
        },
      };

    default:
      return state;
  }
};
