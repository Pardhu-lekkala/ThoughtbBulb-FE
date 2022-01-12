import React from "react";

import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Alert from "@material-ui/lab/Alert";
import { clearSnackbar } from "../../redux/actions/ui";

export default function ClientSnackbar() {
  const dispatch = useDispatch();

  const { snackbarMessage, snackbarOpen, snackbarSeverity } = useSelector(
    (state) => state.ui
  );

  function handleClose() {
    dispatch(clearSnackbar());
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={snackbarOpen}
      severity={snackbarSeverity}
      autoHideDuration={4000}
      onClose={handleClose}
      aria-describedby="client-snackbar"
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <Icon>close</Icon>
        </IconButton>,
      ]}
    >
      <Alert severity={snackbarSeverity}> {snackbarMessage}</Alert>
    </Snackbar>
  );
}
