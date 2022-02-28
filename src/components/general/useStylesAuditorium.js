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
  AuditoriumBG: {
    objectFit: "cover",
    width: "100vw",
    height: "auto",
    position: "fixed",
    top: 0,
    left: 0,
  },

  "& video::-webkit-media-controls-panel": {
    display: "none",
  },

  viewportHeader: {
    position: "relative",
    height: "100vh",
    //textAlign: "center",
    //display: "flex",
    //alignItems: "center",
    //justifyContent: "center",
  },
}));

export default useStyles;
