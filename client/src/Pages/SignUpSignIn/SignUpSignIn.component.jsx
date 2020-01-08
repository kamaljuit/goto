import React, { useEffect } from "react";
import { connect } from "react-redux";
import SignUp from "../../Components/SignUp/SignUp.component";
import SignIn from "../../Components/SignIn/SignIn.component";
import { Container } from "@material-ui/core";
import Header from "../../Components/Header/Header.component";

import { setLoginError } from "../../Redux/User/user.action";

function SignUpSignIn(props) {
  useEffect(() => {
    props.dispatch(setLoginError(undefined));
  }, []);

  return (
    <div>
      <Header />
      <Container maxWidth="sm">
        <br />
        <SignIn />
        <br />
        <SignUp />
      </Container>
    </div>
  );
}

export default connect()(SignUpSignIn);
