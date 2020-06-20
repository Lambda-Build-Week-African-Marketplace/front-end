import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import PrivateRoute from "./components/PrivateRoute";
import { marketReducer as reducer } from "./reducers/marketReducer";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ProductList from "./components/ProductList";
import Dashboard from "./components/Dashboard";
import MenuBar from "./components/MenuBar";
import thunk from "redux-thunk";
import logger from "redux-logger";
import "./App.css";
const store = createStore(reducer, applyMiddleware(thunk, logger));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <MenuBar />

        <Switch>
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <Route exact path="/" component={ProductList} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
