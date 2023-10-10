import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import "./Header.css";
import NavbarMenu from "../navbarMenu/NavbarMenu";
import { Link } from "react-router-dom";

const Header = () => {

  return (
    <nav className="navbar">
      <div className="navbar_content">
        <div className="navbar_content_left">
          <Link className="logo" to="/">
            <img
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
              alt="The Movie Database (TMDB)"
            />
          </Link>
          <ul className="nav_links">
            <NavbarMenu title="Movies" menubarItem={["Popular", "Now Playing", "Upcoming", "Top Rated"]}  />
            <NavbarMenu title="TV Shows" menubarItem={["Popular", "Airing Today", "On TV", "Top Rated"]}  />
            <NavbarMenu title="People" menubarItem={["Popular People"]}  />
            <NavbarMenu title="More" menubarItem={["Discussion", "Leaderboard", "Support", "API"]}  />
          </ul>
        </div>
        <div className="navbar_content_right">
          <ul className="nav_links">
            <li className="nav_item">
              <div className="nav_link search">
                <img
                  src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-371-plus-white-0bac34f16124808a12ea863b4d9cc6e599dee7c0a80658cfe9ead26939e64517.svg"
                  width="23px"
                  height="23px"
                />
              </div>
            </li>
            <li className="nav_item">
              <div className="translate">en</div>
            </li>
            <li className="nav_item">
              <span className="nav_link">Login</span>
            </li>
            <li className="nav_item">
            <span className="nav_link">JoinTMDB</span>
            </li>
            <li className="nav_item">
              <div className="nav_link search" href="#">
                <img
                  src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-28-search-blue-177462d06db81ff2a02aa022c1c0be5ba4200d7bd3f51091ed9298980e3a26a1.svg"
                  width="30px"
                  height="30px"
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
