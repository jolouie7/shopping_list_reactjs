import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";

import { addItem } from "../actions/itemActions";

function ItemModal({addItem, isAuthenticated}) {
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      name: name,
    };

    // Add item using addItem action
    addItem(newItem);

    // Close modal
    handleClose();

    // Reset input field
    setName("")
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div>
      {isAuthenticated ?
      <Button variant="dark" onClick={handleShow} className="my-4">
        Add Item
      </Button> :
      <h4 className="my-3">Please login to manage items</h4>
      }

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add to Shopping List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label for="item">Item</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter item"
                name="name"
                onChange={handleChange}
                value={name}
              />
              <Form.Text className="text-muted">
                Check out your shopping list again after saving your changes!
              </Form.Text>
            </Form.Group>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" onClick={handleClose}>
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
});

export default connect(mapStateToProps, { addItem })(ItemModal);
