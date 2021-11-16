import React from "react";

import PageComp from "../components/general/Page";

function Page({ history, match }) {
  return (
    <>
      <PageComp history={history} match={match} />
    </>
  );
}

export default Page;
