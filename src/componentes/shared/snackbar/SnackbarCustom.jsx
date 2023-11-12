import React from "react";

import { Alert, Snackbar } from "@mui/material";

function SnackbarCustom({ snackbarOpen, setSnackbarOpen, severity, message, time }) {
  React.useEffect(() => {
    if (snackbarOpen) {
      setTimeout(() => {
        setSnackbarOpen(false);
      }, time || 5000);
    }
  }, [snackbarOpen]);

  return (
    <Snackbar
      open={snackbarOpen}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Alert
        onClose={setSnackbarOpen}
        sx={{ width: "100%" }}
        severity={severity}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default SnackbarCustom;
