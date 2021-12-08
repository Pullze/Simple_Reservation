import React from "react";
import { useHistory } from "react-router";

function Home() {
  const history = useHistory();
  const historyState = history.location.state;
  return (
    <div>
      <h2>Now logged in as {historyState.email}</h2>
    </div>
  );
}

export default Home;
