import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ModalForm from "./ModalForm";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

const UserAccount = (props) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleChanges = (event) => {
    // console.log("Edit event ", event.target.value);
    // setTeamMem({ ...teamMem, [event.target.name]: event.target.value });
  };
  const submitForm = (event) => {
    // event.preventDefault();
    // console.log("Edit team member", teamMem);
    // props.toggle();
    // props.editMember(teamMem);
  };
  const cancelForm = (event) => {
    event.preventDefault();
    props.toggle();
  };

  return (
    <div>
      <Card
        style={{
          width: "30rem",
          margin: "auto",
          marginTop: "1rem",
          marginBottom: "1rem",
        }}
      >
        <CardBody>
          <CardTitle>{state.user.username}</CardTitle>
          <CardSubtitle>
            {state.user.firstname} {state.user.lastname}
          </CardSubtitle>
          <CardText>{state.user.email}</CardText>
          <Button onClick={toggle} color="primary" style={{ width: "5rem" }}>
            Edit
          </Button>
          <ModalForm
            isOpen={modal}
            toggle={toggle}
            handleChanges={handleChanges}
            firstName={state.user.firstname}
            lastName={state.user.lastname}
            email={state.user.email}
            submit={submitForm}
            cancel={cancelForm}
          />
        </CardBody>
      </Card>
    </div>
  );
};
export default UserAccount;

// <h2> UserAccount:</h2>
// <p>First Name: {state.user.firstname}</p>
// <p>Last Name: {state.user.lastname}</p>
// <p>Email: {state.user.email}</p>
