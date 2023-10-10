import React from 'react'
import Discover from '../discover/Discover'
import Trending from '../trending/Trending'
import Popular from '../popular/Popular'

const MainContent = () => {
  return (
    <>
      <Discover />
      <Trending />
      <Popular />
    </>
  )
}

export default MainContent