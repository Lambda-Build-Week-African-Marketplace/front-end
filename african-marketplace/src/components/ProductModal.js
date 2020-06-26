import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

import Fade from "@material-ui/core/Fade";
import { useSelector } from "react-redux";

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

const ProductModal = (props) => {
  const classes = useStyles();
  const state = useSelector((state) => state);
  console.log("props.product in product Modal", props.newProduct);
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
                  required
                  type="text"
                  name="product_name"
                  onChange={props.changeHandler}
                  placeholder="product name"
                  defaultValue={props.newProduct.product_name}
                />

                <div className="baseline" />

                <input
                  required
                  type="number"
                  min="0.01"
                  step="0.01"
                  name="price"
                  onChange={props.changeHandler}
                  placeholder="Price"
                  defaultValue={props.newProduct.price}
                />

                <div className="baseline" />
                {/**--------------Description -------------------------- */}
                <input
                  required
                  type="text"
                  name="description"
                  onChange={props.changeHandler}
                  placeholder="Description"
                  defaultValue={props.newProduct.description}
                />

                <div className="baseline" />
                {/**--------------------location----------------------------------- */}
                <select
                  required
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
                  <option value="">Select location:</option>
                  {state.locations
                    .sort((a, b) =>
                      a.location.toLowerCase() > b.location.toLowerCase()
                        ? 1
                        : -1
                    )
                    .map((location) => {
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
                      required
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

                {/**--------------------category----------------------------------- */}
                <select
                  required
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
                  <option value="">Select category:</option>

                  {state.categories
                    .sort((a, b) =>
                      a.category_name.toLowerCase() >
                      b.category_name.toLowerCase()
                        ? 1
                        : -1
                    )
                    .map((category) => {
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
                      required
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

// {props.errors.product_name.length > 0 ? (
//   <p className="error" id="nameError">
//     {props.errors.product_name}
//   </p>
// ) : null}
