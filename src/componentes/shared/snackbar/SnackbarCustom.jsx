import React from "react";

import { Alert, Snackbar } from "@mui/material";

function SnackbarCustom({ snackbarOpen, setSnackbarOpen, severity, message }) {
  // TODO FIX - autoHideDuration não está funcionando no componente pai

  return (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={5000}
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
