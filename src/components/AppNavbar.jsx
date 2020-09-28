import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { connect } from "react-redux";

import RegisterModal from "../components/auth/RegisterModal";
import LoginModal from "../components/auth/LoginModal";
import Logout from "../components/auth/Logout";

const AppNavbar = (props) => {
  const {isAuthenticated, user} = props.auth

  // User is logged in
  const authLinks = (
    <>
    <span className="navbar-text mr-3">
      <strong>{ user ? `Welcome ${user.username}` : "" }</strong>
    </span>
      <Logout />
    </>
  );

  // User is not logged in
  const guestLinks = (
    <>
      <RegisterModal />
      <LoginModal />
    </>
  );
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Shopping List</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              { isAuthenticated ? authLinks : guestLinks }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps)(AppNavbar);
