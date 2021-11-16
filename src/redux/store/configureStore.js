import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import uiReducer from "../reducers/uiReducer";
import userReducer from "../reducers/userReducer";
import projectReducer from "../reducers/projectReducer";

//COMBINING ALL REDUCERS
const combinedReducer = combineReducers({
  project: projectReducer,
  user: userReducer,
  ui: uiReducer,
  //ADD OTHER REDUCERS HERE
});

// BINDING MIDDLEWARES
const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

//client side, create a store which will persist using local storage
const { persistStore, persistReducer } = require("redux-persist");
const storage = require("redux-persist/lib/storage").default;

const persistConfig = {
  key: "nextjs",
  whitelist: ["user", "ui", "project"], // add other reducers which need to be persisted
  storage, // if needed, use a safer storage
};

const persistedReducer = persistReducer(persistConfig, combinedReducer); // Create a new reducer with our existing reducer

export const store = createStore(
  persistedReducer,
  bindMiddleware([thunkMiddleware])
); // Creating the store again

export const persistor = persistStore(store); // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature
