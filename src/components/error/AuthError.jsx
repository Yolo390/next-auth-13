"use client";

import { forwardRef, useState } from "react";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AuthError = ({ error, reset = null, setError = () => {} }) => {
  const [open, setOpen] = useState(Boolean(true));

  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;

    setOpen(Boolean(false));
    setError({});
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {error?.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AuthError;
