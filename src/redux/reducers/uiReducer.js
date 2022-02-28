const initialState = {
  loading: false,
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SNACKBAR_OPEN":
      return {
        ...state,
        snackbarOpen: true,
        snackbarMessage: action.payload.message,
        snackbarSeverity: action.payload.severity,
      };
    case "SNACKBAR_CLEAR":
      return {
        ...state,
        snackbarOpen: false,
        //errorSnackbarOpen: false,
        //infoSnackbarOpen: false,
      };
    case "TOGGLE_LOADING": {
      return { ...state, loading: action.payload.loading };
    }
    default:
      return state;
  }
};

export default uiReducer;
