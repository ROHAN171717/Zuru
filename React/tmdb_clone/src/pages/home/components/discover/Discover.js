import React from 'react';
import './discover.css'

const Discover = () => {
  return (
      <section className='inner_content full_bg'>
          <div className='content_wrapper'>
              <div className='title'>
                  <h2>Welcome.</h2>
                  <h3>Millions of movies, TV shows and people to discover. Explore now.</h3>
              </div>
              <div className='search'>
                  <form className='inner_search_form'>
                      <input type='text' placeholder='Search for a movie, tv show, person......' />
                      <button type='submit' className='search_btn'>Search</button>
                  </form>
              </div>
          </div>
      </section>
  )
}

export default Discover