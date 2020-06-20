import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../actions/index";
import {
  getProductsData,
  getCategoriesData,
  getLocationsData,
} from "../actions/index";
const Dashboard = (props) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLocationsData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProductsData());
  }, [dispatch]);
  // console.log("state", state.locations);

  return (
    <div>
      <h2> Our Locations:</h2>
      {state.locations.map((location) => (
        <p key={location.id}> Location:{location.location}</p>
      ))}
    </div>
  );
};
export default Dashboard;
