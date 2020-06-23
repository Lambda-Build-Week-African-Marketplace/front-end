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
  //const [catToggle, setCatToggle] = useState(false);
  //const [newCategory, setNewCategory] = useState(initialCategory);
  // const dispatch = useDispatch();
  //   const handleCategoryClose = (e) => {
  //     e.preventDefault();
  //     setCatToggle(false);
  //     setNewCategory(initialCategory);
  //   };

  //   const changeCategoryHandler = (ev) => {
  //     ev.persist();

  //     setNewCategory({
  //       ...newCategory,
  //       [ev.target.name]: ev.target.value,
  //     });
  //   };
  //   const handleCategorySubmit = (e) => {
  //     console.log("newCategory", newCategory);

  //     e.preventDefault();
  //     dispatch(postCategoryData(newCategory));
  //     setNewCategory(initialCategory);
  //     setCatToggle(false);
  //   };

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
              <h2>Add New Item</h2>
              <form onSubmit={props.handleSubmit}>
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
                  type="string"
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
                  {/*  <option value={props.select}>{props.select}</option>*/}
                  <option value="0">Select location:</option>
                  <option value="1">North</option>
                  <option value="2">South</option>
                  <option value="3">East</option>
                  <option value="4">West</option>
                </select>
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

                  {state.categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.category_name}
                    </option>
                  ))}
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
                  <p>
                    Don't find a category?{" "}
                    <span
                      onClick={props.handleCatToggle}
                      className="span-category"
                    >
                      Add a new one
                    </span>{" "}
                  </p>
                )}

                <button className="md-button form-button">Add New Item</button>
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
