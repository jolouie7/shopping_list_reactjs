import React, {useEffect} from 'react';
import { connect } from "react-redux";

import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import { loadUser } from "./actions/authActions";


function App() {
  useEffect(() => {
    loadUser();
  }, [])

  return (
    <div>
      <AppNavbar />
      <ShoppingList />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  loadUser: () => dispatch(loadUser()),
});

export default connect(null, mapDispatchToProps)(App);
