import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const NotFound = () => (
  <>
    <div style={{ width: "50%", margin: "25vh auto" }}>
      <Paper elevation={0}>
        <Typography variant="h1" align="center">
          404
        </Typography>
        <Typography variant="h2" align="center">
          NOT FOUND
        </Typography>
        <Typography variant="body1" align="center">
          <Link to="/">Go Home</Link>
        </Typography>
      </Paper>
    </div>
  </>
);

export default NotFound;

/*   <div>
    <h1>404 - Not Found!</h1>
    <Link to="/">
      Go Home
    </Link>
  </div> */
