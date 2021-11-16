import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

//import PrivateRoute from "./utils/components/PrivateRoute";
import {
  //General
  Login,
  Lobby,
  Auditorium,
  Page
} from "./pages";
import NotFound from "./utils/components/404";

//import amplifyConfig from "./config/amplifyDev";
//import amplifyConfig from "./config/amplify";
import ClientSnackbar from "./utils/components/ClientSnackbar";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#000000",
      //main: "rgba(112,225,245,1)",
      //orange: "rgba(255,136,0,1)",
    },
    secondary: {
      main: "rgba(22,49,77,1)",
      //orange: "rgba(255,136,0,1)",
    },
  },
  typography: {
    //fontFamily: '"proxima-nova"',
    fontSize: 14,
    //fontWeightRegular:"500",
    fontFamily: [
      '"Work Sans"',
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

function App() {
  useEffect(() => {
    //csrf();
    //Amplify.configure(amplifyConfig);
  }, []);

  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <ClientSnackbar />
        <BrowserRouter>
          <Switch>
            {/* <PrivateRoute path="/" component={Overview} exact={true} /> */}

            {/* GENERAL */}
            <Route path="/Lobby" component={Lobby} exact={true} />
            <Route path="/Auditorium" component={Auditorium} exact={true} />
            <Route path="/page/:pageId" component={Page} exact={true} />
            <Route path="/:accesscode" component={Login} exact={true} />

            {/* MISC */}
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
