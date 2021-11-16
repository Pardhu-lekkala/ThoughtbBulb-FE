export const showSnackbar = (message, severity) => {
  return (dispatch) => {
    dispatch({ type: "SNACKBAR_OPEN", payload: { message, severity } });
  };
};

export const clearSnackbar = () => {
  return (dispatch) => {
    dispatch({ type: "SNACKBAR_CLEAR" });
  };
};

export const toggleLoading = (loading) => {
  return (dispatch) => {
    dispatch({ type: "TOGGLE_LOADING", payload: { loading } });
  };
};
