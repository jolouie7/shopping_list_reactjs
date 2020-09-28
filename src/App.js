import React, {useEffect} from 'react';
import { connect } from "react-redux";

import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import { loadUser } from "./actions/authActions";

function App({ isLoggedIn }) {
  useEffect(() => {
    console.log(isLoggedIn);
    loadUser()
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
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
