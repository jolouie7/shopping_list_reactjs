import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Alert from "react-bootstrap/Alert";

import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

function LoginModal({ isAuthenticated, error, login, clearErrors }) {
  const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    // Clear input fields
    setUsername("");
    setPassword("");

    // Clear errors
    clearErrors();
    setShow(true);
  };

  useEffect(() => {
    // Check for register error
    if (error.id === "LOGIN_FAIL") {
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
  }, [error, isAuthenticated, show]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      username,
      password
    }

    // Attempt to login
    login(user);
  };

  const handleChangeUsername = (e) => setUsername(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);

  return (
    <>
      <Nav.Link onClick={handleShow} href="#">
        Login
      </Nav.Link>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {msg ? <Alert variant="danger">{msg}</Alert> : null}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
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
            </Form.Group>
            <Button variant="dark" type="submit" block>
              Login
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  error: state.errorReducer,
});

export default connect(mapStateToProps, { login, clearErrors })(
  LoginModal
);
