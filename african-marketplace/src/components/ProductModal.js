import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
//import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useSelector, useDispatch } from "react-redux";
//import { postCategoryData, getCategoriesData } from "../actions/index";
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
//const initialCategory = "";
const ProductModal = (props) => {
  const classes = useStyles();
  const state = useSelector((state) => state);

  console.log("props.newProduct.location_id", props.newProduct.location_id);
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={props.close}
        closeAfterTransition
        BackdropComponent={props.Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <div className={classes.paper}>
            <div>
              {!props.newProduct.product_name ? (
                <h2>Add New Item</h2>
              ) : (
                <h2>Edit Item</h2>
              )}

              <form onSubmit={props.handleProductSubmit}>
                <input
                  type="text"
                  name="product_name"
                  onChange={props.changeHandler}
                  placeholder="name"
                  defaultValue={props.newProduct.product_name}
                />
                <div className="baseline" />

                <input
                  type="number"
                  name="price"
                  onChange={props.changeHandler}
                  placeholder="Price"
                  defaultValue={props.newProduct.price}
                />
                <div className="baseline" />

                <input
                  type="text"
                  name="description"
                  onChange={props.changeHandler}
                  placeholder="Description"
                  defaultValue={props.newProduct.description}
                />
                <div className="baseline" />
                {/**--------------------location----------------------------------- */}
                <select
                  id="location_id"
                  name="location_id"
                  onChange={props.changeHandler}
                  style={{
                    marginTop: "1rem",
                    width: "100%",
                    height: "2.4rem",
                    marginLeft: "0",
                    fontSize: "1rem",
                    color: "#1c5d76",
                  }}
                >
                  <option value="0">Select location:</option>
                  {state.locations.map((location) => {
                    if (location.id === props.newProduct.location_id) {
                      return (
                        <option
                          key={location.id}
                          defaultValue={location.id}
                          selected="selected"
                        >
                          {location.location}
                        </option>
                      );
                    } else
                      return (
                        <option key={location.id} value={location.id}>
                          {location.location}
                        </option>
                      );
                  })}
                </select>

                {props.locationToggle ? (
                  <div>
                    <input
                      type="text"
                      name="location"
                      onChange={props.changeLocationHandler}
                      placeholder="Location"
                      defaultValue={props.newLocation.location}
                    />
                    <div className="baseline" />
                    <button
                      style={{ background: "#6190a3", fontSize: "0.7rem" }}
                      onClick={props.handleLocationSubmit}
                      className="md-button form-button"
                    >
                      Add New Location
                    </button>
                    <button
                      style={{
                        background: "#6190a3",
                        fontSize: "0.7rem",
                        marginLeft: "1rem",
                      }}
                      onClick={props.handleLocationToggle}
                      className="md-button form-button"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <p style={{ marginTop: "1rem" }}>
                    Don't find a location?{" "}
                    <span
                      onClick={props.handleLocationToggle}
                      className="span-category"
                    >
                      Add a new one
                    </span>{" "}
                  </p>
                )}

                {/*
                  <option value="0">Select location:</option>
                  <option value="1">North</option>
                  <option value="2">South</option>
                  <option value="3">East</option>
                  <option value="4">West</option>
                </select>
*/}
                {/**--------------------category----------------------------------- */}
                <select
                  id="category_id"
                  name="category_id"
                  onChange={props.changeHandler}
                  style={{
                    marginTop: "0.5rem",
                    width: "100%",
                    height: "2.4rem",
                    marginLeft: "0",
                    fontSize: "1rem",
                    color: "#1c5d76",
                  }}
                >
                  {/*  <option value={props.select}>{props.select}</option>*/}
                  <option value="0">Select category:</option>

                  {state.categories.map((category) => {
                    if (category.id === props.newProduct.category_id) {
                      return (
                        <option
                          key={category.id}
                          defaultValue={category.id}
                          selected="selected"
                        >
                          {category.category_name}
                        </option>
                      );
                    } else
                      return (
                        <option key={category.id} value={category.id}>
                          {category.category_name}
                        </option>
                      );
                  })}
                </select>

                {props.catToggle ? (
                  <div>
                    <input
                      type="text"
                      name="category_name"
                      onChange={props.changeCategoryHandler}
                      placeholder="Category"
                      defaultValue={props.newCategory.category_name}
                    />
                    <div className="baseline" />
                    <button
                      style={{ background: "#6190a3", fontSize: "0.7rem" }}
                      onClick={props.handleCategorySubmit}
                      className="md-button form-button"
                    >
                      Add New Category
                    </button>
                    <button
                      style={{
                        background: "#6190a3",
                        fontSize: "0.7rem",
                        marginLeft: "1rem",
                      }}
                      onClick={props.handleCatToggle}
                      className="md-button form-button"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <p style={{ marginTop: "1rem" }}>
                    Don't find a category?{" "}
                    <span
                      onClick={props.handleCatToggle}
                      className="span-category"
                    >
                      Add a new one
                    </span>{" "}
                  </p>
                )}

                <button className="md-button form-button">Submit</button>
                <button
                  style={{ marginLeft: "1rem" }}
                  className="md-button form-button"
                  onClick={props.close}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
export default ProductModal;
