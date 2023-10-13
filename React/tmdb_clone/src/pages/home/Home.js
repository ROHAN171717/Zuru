import React from "react";
import Discover from "./components/discover/Discover";
import Trending from "./components/trending/Trending";
import Popular from "./components/popular/Popular";

const Home = () => {
  return (
    <>
      <Discover />
      <Trending />
      <Popular />
    </>
  );
};

export default Home;
