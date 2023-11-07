import React from 'react';
import './footer.css';

function Footer() {
  return (
    <div className="footer">
      <div className="footer_content">
        <div className="footer_column join">
          <img
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
            alt="movie"
            className="footer_img"
            width="130px"
            height="94px"
          />
          <span className="rounded">
            Join The Community
          </span>
        </div>

        <div className="footer_column">
          <h3 className="column_title">The Basics</h3>
          <ul className="column_items">
            <li className="column_item">
              <a href="*" className="column_link">
                About TMDB
              </a>
            </li>
            <li className="column_item">
              <a href="*" className="column_link">
                Contact Us
              </a>
            </li>
            <li className="column_item">
              <a href="*" className="column_link">
                Support Forums
              </a>
            </li>
            <li className="column_item">
              <a href="*" className="column_link">
                API
              </a>
            </li>
            <li className="column_item">
              <a href="*" className="column_link">
                System Status
              </a>
            </li>
          </ul>
        </div>

        <div className="footer_column">
          <h3 className="column_title">Get Involved</h3>
          <ul className="column_items">
            <li className="column_item">
              <a href="*" className="column_link">
                Contribution Bible
              </a>
            </li>
            <li className="column_item">
              <a href="*" className="column_link">
                Add New Movie
              </a>
            </li>
            <li className="column_item">
              <a href="*" className="column_link">
                Add New TV Show
              </a>
            </li>
          </ul>
        </div>

        <div className="footer_column">
          <h3 className="column_title">Community</h3>
          <ul className="column_items">
            <li className="column_item">
              <a href="*" className="column_link">
                Guidelines
              </a>
            </li>
            <li className="column_item">
              <a href="*" className="column_link">
                Discussions
              </a>
            </li>
            <li className="column_item">
              <a href="*" className="column_link">
                Leaderboard
              </a>
            </li>
            <li className="column_item">
              <a href="*" className="column_link">
                Twitter
              </a>
            </li>
          </ul>
        </div>

        <div className="footer_column">
          <h3 className="column_title">Legal</h3>
          <ul className="column_items">
            <li className="column_item">
              <a href="*" className="column_link">
                Terms of Use
              </a>
            </li>
            <li className="column_item">
              <a href="*" className="column_link">
                API Terms of Use
              </a>
            </li>
            <li className="column_item">
              <a href="*" className="column_link">
                Privacy Policy
              </a>
            </li>
            <li className="column_item">
              <a href="*" className="column_link">
                DMCA Takedown Request
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
