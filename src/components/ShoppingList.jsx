import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getItems, deleteItem } from "../actions/itemActions";
import ItemModal from "./itemModal"

const ShoppingList = ({getItems, items, deleteItem}) => {

  useEffect(() => {
    getItems();
  }, [items.items]);

  // const handleClick = () => {
  //   const name = prompt("Enter Item");
  //   if (name) {
  //     setItems([...items, { id: uuidv4(), name }]);
  //   }
  // };

  const handleClickDelete = (id) => {
    console.log("hit")
    deleteItem(id);
  }

  const listItems = items.items;
  return (
    <div>
      <Container>
        <ItemModal />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Item Name</th>
              <th>Delete Item?</th>
            </tr>
          </thead>
          <tbody>
            {listItems.map((item) => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.name}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleClickDelete(item._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  items: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  items: state.itemReducer,
})

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);
