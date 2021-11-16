import React from "react";

import LoginComp from "../components/general/Login";

function Login({ history, match }) {
  return (
    <>
      <LoginComp history={history} match={match} />
    </>
  );
}

export default Login;
