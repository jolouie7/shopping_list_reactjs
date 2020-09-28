import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { connect } from "react-redux";

import { getItems, deleteItem } from "../actions/itemActions";
import ItemModal from "./itemModal";

const ShoppingList = ({ getItems, items, deleteItem, isAuthenticated }) => {
  useEffect(() => {
    getItems();
  }, [items.items, getItems]);

  const handleClickDelete = (id) => {
    deleteItem(id);
  };

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
              {isAuthenticated && <th>Delete Item?</th>}
            </tr>
          </thead>
          <tbody>
            {listItems.map((item) => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.name}</td>
                {isAuthenticated && (
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleClickDelete(item._id)}
                    >
                      Delete
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  items: state.itemReducer,
  isAuthenticated: state.authReducer.isAuthenticated,
});

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);
