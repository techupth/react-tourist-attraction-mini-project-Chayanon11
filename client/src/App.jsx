import React from "react";
import Header from "./component/appHeader";
import DestinationList from "./component/destinationList";
import { PlaceList } from "./component/placeList";

function App() {
  const destinations = [];

  return (
    <div>
      <Header />
      <DestinationList destinations={destinations} />
      <PlaceList />
    </div>
  );
}

export default App;
