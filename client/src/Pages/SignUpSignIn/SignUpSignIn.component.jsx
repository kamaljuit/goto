import React from "react";
import SignUp from "../../Components/SignUp/SignUp.component";
import SignIn from "../../Components/SignIn/SignIn.component";
import { Container } from "@material-ui/core";
import Header from "../../Components/Header/Header.component";
function SignUpSignIn() {
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

export default SignUpSignIn;
