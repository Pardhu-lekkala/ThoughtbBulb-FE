const initialState = {};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PROJECT":
      return { ...state, ...action.payload };
    
    case "PURGE_PROJECT": {
      return initialState;
    }
    default:
      return state;
  }
};

export default userReducer;
