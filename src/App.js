import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import { MdScreenRotation} from "react-icons/md";

//import PrivateRoute from "./utils/components/PrivateRoute";
import {
  //General
  Login,
  Lobby,
  Auditorium,
  Page,
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
  const [isLandscape,setIsLandscape]= React.useState(true)
  // if (window.innerHeight > window.innerWidth) {
  //   k = true;
  // } else {
  //   k = false;
  // }
 
  function handleResize() {
    if (window.innerHeight > window.innerWidth) {
      setIsLandscape(true)
    } else {
            setIsLandscape(false)
    }
    console.log("1")
  }
  
  useEffect(() => {
    if (window.innerHeight > window.innerWidth) {
      setIsLandscape(true)
    } else {
      
      setIsLandscape(false)
    }
    window.addEventListener("resize", handleResize);
  },[]);

  if (isLandscape) {
    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <div style={{textAlign:"center"}}>
          <h1 style={{ padding: "5vw" }}>
            Please Use Your Device In LandScape Mode Only
          </h1>
          <MdScreenRotation size="40%" style={{marginTop:"10vh"}}/>
          </div>
        </MuiThemeProvider>
      </div>
    );
  } else {
    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <ClientSnackbar />
          <BrowserRouter>
            <Switch>
              {/* <PrivateRoute path="/" component={Overview} exact={true} /> */}

              {/* GENERAL */}
              <Route path="/static/:accesscode" component={Login} exact={true} />
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
}

export default App;
