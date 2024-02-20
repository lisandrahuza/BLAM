import React, { useEffect, useState } from 'react'
import FilmItem from '../FilmItem'
import ApiClient from '../../../libs/api/ApiClient'
import { useSelector } from 'react-redux'
function FilmList () {
  // const films = [<FilmItem key={1}/>, <FilmItem key={2}/>, <FilmItem key={3}/>, <FilmItem key={4}/>, <FilmItem key={5}/>, <FilmItem key={6}/>, <FilmItem key={7}/>, <FilmItem key={8}/>, <FilmItem key={9}/>, <FilmItem key={10}/>, <FilmItem key={11}/>, <FilmItem key={12}/>, <FilmItem key={13}/>, <FilmItem key={14}/>]
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState([])
  const { searchText, category } = useSelector(state => state.search)
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true)
        let res
        if (category) {
          res = await ApiClient.getMoviesByCategory(category)
        } else {
          const text = searchText === '' ? 'rec' : searchText
          res = await ApiClient.getMoviesBySearch(text)
        }
        if (res && res.length > 0) {
          setMovies(res)
        } else {
          console.log('No movies found.')
        }
      } catch (error) {
        console.error('Error fetching movies:', error)
      }
      setLoading(false)
      console.log(movies)
    }
    fetchMovies()
  }, [category, searchText])

  const renderedMovies = movies.map((movie, index) => (
      <FilmItem key={index} id={movie.id} title={movie.name} genres={movie.gen} rating={movie.rating} description={movie.description} image={movie.image}/>
  ))

  return <div className="grid grid-cols-5 gap-6 py-6 px-20 w-full h-full overflow-x-hidden overflow-y-scroll scrollbar scrollbar-thumb-purple-950 scrollbar-thumb-rounded-full ">
    {(loading && <div className="text-white">Loading...</div>) || renderedMovies}
  </div>
}

export default FilmList
