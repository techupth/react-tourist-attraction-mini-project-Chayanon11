import React, { useEffect, useState } from "react";
import axios from "axios";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";

function Header() {
  const [search, setSearch] = useState("");
  const [places, setPlaces] = useState([]);
  const baseURL = "http://localhost:4001/trips?keywords=";

  const handleSetPlaces = (data) => {
    setPlaces(data);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) {
      alert("Please enter a search keyword.");
      return;
    }
    try {
      const response = await axios.get(baseURL + search);
      const allPlaces = response.data.data;
      const filteredPlaces = allPlaces.filter((place) => {
        return (
          place.description.toLowerCase().includes(search.toLowerCase()) ||
          place.title.toLowerCase().includes(search.toLowerCase())
        );
      });
      if (filteredPlaces.length === 0) {
        alert("No results found.");
      }
      handleSetPlaces(filteredPlaces);
    } catch (error) {
      console.error("Error fetching data: ", error);
      handleSetPlaces([]);
    }
  };

  useEffect(() => {
    if (search === "") {
      handleSearch();
    }
  }, [search]);

  const handleReadMore = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="flex w-full p-6 bg-gradient-to-r from-blue-500 to-teal-500 text-white">
      <div className="flex flex-col justify-center items-center flex-1 p-4">
        <div className="flex items-center space-x-2 mb-4">
          <TravelExploreIcon sx={{ width: "5rem", height: "5rem" }} />
          <h1 className="text-5xl font-semibold">TravelSpot Finder</h1>
        </div>
        <div className="relative flex items-center w-full max-w-xs">
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              className="px-4 py-2 rounded-full border-none bg-white text-gray-800 focus:outline-none focus:ring focus:border-teal-300 transition-all"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              className="h-full min-w-max rounded-full">
              <SearchIcon />
            </Button>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {places.map((placeData, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-semibold mb-2">{placeData.title}</h2>
            <p className="text-gray-700 mb-4">{placeData.description}</p>
            {placeData.photos && placeData.photos.length > 0 && (
              <img
                src={placeData.photos[0]}
                alt="Place"
                className="w-full rounded-md mb-4"
              />
            )}
            <button
              onClick={() => handleReadMore(placeData.url)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
              Read More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Header;
