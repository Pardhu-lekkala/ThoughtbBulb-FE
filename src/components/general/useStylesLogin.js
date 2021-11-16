import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    /*  height: "100vh",
    [theme.breakpoints.up("md")]: {
      //width: "63%",
      width: "100%",
      margin: "0 auto",
    }, */
    /* position: "fixed",
    right: 0,
    bottom: 0,
    minWidth: "100%",
    minHeight: "100%", */
  },

  viewportHeader: {
    position: "relative",
    //height: "100vh",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    //textAlign: "center",
    //display: "flex",
    //alignItems: "center",
    //justifyContent: "center",
  },
  LoginSignupLoop: {
    objectFit: "cover",
    width: "100vw",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
  },
}));

export default useStyles;
