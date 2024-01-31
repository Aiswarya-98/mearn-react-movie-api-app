import React, { useEffect, useState } from "react"
import "./Main.css"
import { MDBBtn } from "mdb-react-ui-kit"
import { MDBInputGroup, MDBIcon } from "mdb-react-ui-kit"

function Main() {
  let api_key = "fa5a9e44"

  const [movies, setMovies] = useState([])
  const [searchValue, setSearchValue] = useState("")

  const getMovieRequest = async () => {
    let url = `https://www.omdbapi.com/?s=${searchValue}&apikey=${api_key}`

    try {
      let response = await fetch(url)
      let responseJson = await response.json()

      console.log("result", responseJson.Search)

      if (responseJson.Search) {
        setMovies(responseJson.Search) // Use setMovies with the entire array
      }
    } catch (error) {
      console.error("Error fetching movie data:", error)
    } finally {
      setSearchValue("")
    }
  }

  return (
    <div className="container">
      <h1>Find Your Silver Screen Gem: Unleash the Magic of Movie Search!</h1>
      <div className="top-container">
        <MDBInputGroup className="mb-3" noBorder textBefore={<MDBIcon fas icon="search" />}>
          {/* Add onChange event to update searchValue */}
          <input className="form-control" type="text" placeholder="Search" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
        </MDBInputGroup>
        <MDBBtn color="success" onClick={() => getMovieRequest()}>
          SEARCH
        </MDBBtn>
      </div>

      {/* Map over the movies array to display results */}
      <div className="search-result">
        {movies.map((movie) => (
          <div key={movie.imdbID}>
            <img src={movie.Poster} alt="movie-poster" />
            <h2>{movie.Title}</h2>
            <h3>{movie.Year}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Main
