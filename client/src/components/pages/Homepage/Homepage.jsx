import React from 'react'
import FilmList from '../../generics/FilmList'
import Categories from '../../generics/Categories'
function Homepage () {
  return <div className="w-full overflow-hidden">
    <Categories/>
    <FilmList/>
  </div>
}

export default Homepage
