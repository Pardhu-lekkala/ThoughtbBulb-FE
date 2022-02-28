import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  colorPrimary: {
    backgroundColor: "rgba(255,136,0,1)",
  },
  barColorPrimary: {
    backgroundColor: "#B2DFDB",
  },
  linearRoot: {
    height: "2px",
  },
}));

export default function LinearIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LinearProgress
        color="primary"
        classes={{
          root: classes.linearRoot,
          colorPrimary: classes.colorPrimary,
          barColorPrimary: classes.barColorPrimary,
        }}
      />
    </div>
  );
}
