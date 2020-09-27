import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import Nav from 'react-bootstrap/Nav'
import Alert from "react-bootstrap/Alert";

import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";;

function RegisterModal({ isAuthenticated, error, register, clearErrors }) {
  // const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    // Clear input fields
    setName("");
    setUsername("");
    setEmail("");
    setPassword("");

    // Clear errors
    clearErrors();
    setShow(true);
  }

  useEffect(() => {
    // Check for register error
    if (error.id === "REGISTER_FAIL") {
      setMsg(error.msg.msg);
    } else {
      setMsg(null);
    }

    // If authenticated, close modal
    if (show) {
      if (isAuthenticated) {
        handleClose();
      }
    }
  }, [error, handleClose, isAuthenticated, show]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create user object
    const newUser = {
      name,
      username,
      email,
      password,
    };

    // Attempt to register
    register(newUser);
  };

  const handleChangeName = (e) => setName(e.target.value);
  const handleChangeUsername = (e) => setUsername(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);
  const handleChangeEmail = (e) => setEmail(e.target.value);

  return (
    <>
      <Nav.Link onClick={handleShow} href="#">
        Register
      </Nav.Link>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { msg ? <Alert variant="danger">{msg}</Alert> : null }
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label for="name">Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                onChange={handleChangeName}
                value={name}
                className="mb-3"
              />
              <Form.Label for="username">Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                onChange={handleChangeUsername}
                value={username}
                className="mb-3"
              />
              <Form.Label for="password">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChangePassword}
                value={password}
                className="mb-3"
              />
              {/* <Form.Label for="passwordConfirmation">Confirm Pssword</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password again"
                name="passwordConfirmation"
                onChange={handleChange}
                value={name}
              /> */}
              <Form.Label for="email">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChangeEmail}
                value={email}
                className="mb-3"
              />
            </Form.Group>
            <Button variant="dark" type="submit" block>
              Register
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  error: state.errorReducer
})

export default connect(mapStateToProps, { register, clearErrors })(
  RegisterModal
);
