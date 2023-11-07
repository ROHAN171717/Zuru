import React, { useEffect, useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import NavbarMenu from '../navbarMenu/NavbarMenu';

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  let prevScrollpos = window.scrollY;

  function handleScroll() {
    const currentScrollPos = window.scrollY;
    if (currentScrollPos > 64) {
      if (prevScrollpos > currentScrollPos) {
        document.querySelector('.navbar').style.top = '0';
      } else {
        document.querySelector('.navbar').style.top = '-64px';
      }
    }
    prevScrollpos = currentScrollPos;
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isSidebarOpen]);

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
            <NavbarMenu
              title="Movies"
              value="movie"
              menubarItem={['Popular', 'Now Playing', 'Upcoming', 'Top Rated']}
            />
            <NavbarMenu
              title="TV Shows"
              value="tv"
              menubarItem={['Popular', 'Airing Today', 'On TV', 'Top Rated']}
            />
            {/* <NavbarMenu title="People" menubarItem={["Popular People"]} />
            <NavbarMenu
              title="More"
              menubarItem={["Discussion", "Leaderboard", "Support", "API"]}
            /> */}
          </ul>
        </div>
        <div className="navbar_content_right">
          <ul className="nav_links">
            <li className="nav_item">
              <div className="nav_link search">
                <img
                  src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-371-plus-white-0bac34f16124808a12ea863b4d9cc6e599dee7c0a80658cfe9ead26939e64517.svg"
                  alt="plus_icon"
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
                  alt="search_icon"
                  width="30px"
                  height="30px"
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
      <button
        aria-label="Toggle navigation bar"
        aria-expanded="false"
        className="navbar__toggle"
        type="button"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">
          <path
            stroke="white"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="2"
            d="M4 7h22M4 15h22M4 23h22"
          />
        </svg>

        <div
          className="sidebar"
          style={{ display: isSidebarOpen ? 'block' : 'none' }}
        >
          <ul className="sidebar_links">
            <NavbarMenu
              title="Movies"
              value="movie"
              menubarItem={['Popular', 'Now Playing', 'Upcoming', 'Top Rated']}
            />
            <NavbarMenu
              title="TV Shows"
              value="tv"
              menubarItem={['Popular', 'Airing Today', 'On TV', 'Top Rated']}
            />
            <li className="sidebar_link">Login</li>
            <li className="sidebar_link">JoinTMDB</li>
          </ul>
        </div>
      </button>
    </nav>
  );
}

export default Header;
