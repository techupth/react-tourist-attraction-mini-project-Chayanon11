import React from "react";
import Header from "./component/appHeader";
import DestinationList from "./component/destinationList";
import PlaceList from "./component/placeList";

function App() {
  return (
    <div>
      <Header />
      <DestinationList />
      <PlaceList />
    </div>
  );
}

export default App;
