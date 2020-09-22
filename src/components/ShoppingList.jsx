import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { v4 as uuidv4 } from "uuid";

const ShoppingList = () => {
  const [items, setItems] = useState([
    { id: uuidv4(), name: "Eggs" },
    { id: uuidv4(), name: "Milk" },
    { id: uuidv4(), name: "Chips" },
    { id: uuidv4(), name: "Sour Cream" },
  ]);

  const handleClick = () => {
    const name = prompt("Enter Item");
    if (name) {
      setItems([...items, { id: uuidv4(), name }]);
    }
  };

  const handleClickDelete = (id) => {
    setItems(items.filter(item => item.id !== id))
  }

  return (
    <div>
      <Container>
        <Button variant="outline-dark" onClick={handleClick}>
          Add a Item
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Item Name</th>
              <th>Delete Item?</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  <Button variant="danger" onClick={() => handleClickDelete(item.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default ShoppingList;
