import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Home from "./Pages/Home/Home.component";
import { selectCurrentUser } from "./Redux/User/user.selector";
import SignUpSignIn from "./Pages/SignUpSignIn/SignUpSignIn.component";
import "./App.css";

function App(props) {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/signup"
          exact
          render={() =>
            props.user ? <Redirect to="/home" /> : <SignUpSignIn />
          }
        />
        <Route
          path="/home"
          exact
          render={() => (props.user ? <Home /> : <Redirect to="/signup" />)}
        />
      </Switch>
    </BrowserRouter>
  );
}

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser
});
export default connect(mapStateToProps)(App);
