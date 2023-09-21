import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetch("https://yts.mx/api/v2/list_movies.json?limit=30")
      .then((response) => response.json())
      .then((json) => {
        console.log(json.data.movies);
        setLoading(false);
        setMovies(json.data.movies);
      });
  }, []);
  return (
    <div className="App">
      <h1>영화 정보 앱({movies.length}) </h1>
      <div>{loading ? <p>데이터 수신중입니다..</p> : null}</div>
      <ul className="d-flex flex-wrap gap-1">
        {movies.map((movie) => (
          <li key={movie.id}>
            <a href={movie.url}>
              <img src={movie.medium_cover_image} alt={movie.title_english} />
              <p>개봉년도 : {movie.year}</p>
              <p>제목 : {movie.title}</p>
              <p>
                장르 :{" "}
                {movie.genres.map((genre) => (
                  <strong className="genre">{genre} </strong>
                ))}
              </p>
              <p>언어 : {movie.language}</p>
              <p>평점 : 10 / {movie.rating}</p>
              <p>상영시간 : {movie.runtime}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
