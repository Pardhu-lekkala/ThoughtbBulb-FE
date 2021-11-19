import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    [theme.breakpoints.up("md")]: {
      //width: "63%",
      width: "100%",
      margin: "0 auto",
    },
  },
  lobbyBG: {
    //objectFit: "cover",
    objectFit: "fill",
    //width: "100vw",
    //height: "auto",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    /* position: "absolute",
    top: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden", */
  },
  viewportHeader: {
    position: "relative",
    //height: "100vh",
    width: "100%",
    height: "100%",
    //textAlign: "center",
    //display: "flex",
    //alignItems: "center",
    //justifyContent: "center",
  },
  link: {
    position: "relative",
    top: "30%",
    left: "25%",
  },
  transitionLoop: {
    /* objectFit: "cover",
    width: "100vw",
    height: "auto",
    position: "fixed",
    top: 0,
    left: 0, */
    objectFit: "fill",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },

  pulseAnimation: {
    //margin: "15px",
    display: "block",
    width: "12px",
    height: "12px",
    /* width: "10px",
    height: "10px", */
    // backgroundColor: "yellow",
    borderRadius: "50%",
    background: "white",
    cursor: "pointer",
    animation: "$pulse 2s infinite",
    float: "left",
  
  },


  "@keyframes pulse": {
    "0%": {
      "-moz-box-shadow": "0 0 0 0 rgba(255,255,255, 0.4)",
      boxShadow: "0 0 0 0 rgba(255,255,255, 0.4)",
    },
    "70%": {
      "-moz-box-shadow": "0 0 0 15px rgba(255,255,255, 0)",
      boxShadow: "0 0 0 15px rgba(255,255,255, 0)",
    },
    "100%": {
      "-moz-box-shadow": "0 0 0 0 rgba(255,255,255, 0)",
      boxShadow: "0 0 0 0 rgba(255,255,255, 0)",
    },
  },
}));

export default useStyles;
