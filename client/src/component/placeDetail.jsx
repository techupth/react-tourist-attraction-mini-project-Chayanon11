import React, { useEffect, useState } from "react";
import axios from "axios";

function PlaceDetail({ match }) {
  const placeId = match.params.placeId;
  const [place, setPlace] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchPlaceDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4001/trips/${placeId}`
        );
        setPlace(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching place details: ", error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchPlaceDetail();
  }, [placeId]);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error fetching place details</p>}
      {place && (
        <div>
          <h1>{place.title}</h1>
          <p>{place.description}</p>
        </div>
      )}
    </div>
  );
}

export default PlaceDetail;
