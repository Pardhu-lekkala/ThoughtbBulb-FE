const initialState = {};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, ...action.payload };
    
    case "PURGE_USER": {
      return initialState;
    }
    default:
      return state;
  }
};

export default userReducer;
