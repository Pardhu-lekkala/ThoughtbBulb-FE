export const purgeStore = (dispatch) => {
  dispatch({ type: "PURGE_USER" });
  dispatch({ type: "PURGE_DEVICES" });
  dispatch({ type: "PURGE_MAPS" });
  dispatch({ type: "PURGE_PRODUCTS" });
  dispatch({ type: "PURGE_ORDERS" });
};
