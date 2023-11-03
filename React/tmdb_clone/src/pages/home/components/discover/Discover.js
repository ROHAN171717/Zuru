import React, { useEffect, useState } from "react";
import "./discover.css";

const Discover = () => {
  const [placeholder, setPlaceholder] = useState("");

  useEffect(() => {
    changePlaceHolder();
    window.addEventListener("resize", changePlaceHolder);
    return () => {
      window.removeEventListener("resize", changePlaceHolder);
    };
  }, []);

  function changePlaceHolder() {
    setPlaceholder(
      window.innerWidth < 520
        ? "Search..."
        : "Search for a movie, tv show, person......"
    );
  }

  return (
    <section className="inner_content full_bg">
      <div className="content_wrapper">
        <div className="title">
          <h2>Welcome.</h2>
          <h3>
            Millions of movies, TV shows and people to discover. Explore now.
          </h3>
        </div>
        <div className="search">
          <form className="inner_search_form">
            <input type="text" placeholder={placeholder} />
            <button type="submit" className="search_btn">
              Search
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Discover;
