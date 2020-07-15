import React, { useState } from "react";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";

import Login from "./Login";
import SignUp from "./SignUp";

const AuthDialog = ({ authDialogOpen, setAuthDialogOpen }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [loginForm, setLoginForm] = useState(true);

  return (
    <Dialog
      fullScreen={fullScreen}
      open={authDialogOpen}
      onClose={() => setAuthDialogOpen(false)}
    >
      {loginForm ? (
        <Login
          setAuthDialogOpen={setAuthDialogOpen}
          setLoginForm={setLoginForm}
        />
      ) : (
        <SignUp
          setAuthDialogOpen={setAuthDialogOpen}
          setLoginForm={setLoginForm}
        />
      )}
    </Dialog>
  );
};

export default AuthDialog;
