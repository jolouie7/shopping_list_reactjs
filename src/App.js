import React, {useEffect} from 'react';
import { connect } from "react-redux";

import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import { loadUser } from "./actions/authActions";
import { getAllUsers } from "./actions/usersActions";

function App({ isLoggedIn }) {
  useEffect(() => {
    loadUser()
    // getAllUsers();
  }, []);

  return (
    <div>
      <AppNavbar />
      <ShoppingList />
    </div>
  );
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.authReducer.user
});

const mapDispatchToProps = (dispatch) => ({
  loadUser: () => dispatch(loadUser()),
  getAllUsers: () => dispatch(getAllUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
