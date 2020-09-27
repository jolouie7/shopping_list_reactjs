import React from 'react';
import { connect } from "react-redux";
import Nav from "react-bootstrap/Nav";

import { logout } from "../../actions/authActions";

const Logout = ({ logout }) => {
  return (
    <>
      <Nav.Link onClick={logout} href="#">
        Logout
      </Nav.Link>
    </>
  );
}

export default connect(null, { logout })(Logout);
