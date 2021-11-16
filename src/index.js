import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import CssBaseline from "@material-ui/core/CssBaseline";

import App from "./App";
import { store, persistor } from "./redux/store/configureStore";
import Loader from "./utils/components/Loader";
import "./styles/globalStyles/link.css";

function MyApp() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<Loader />}>
        <CssBaseline />
        <App />
      </PersistGate>
    </Provider>
  );
}

ReactDOM.render(<MyApp />, document.getElementById("root"));
