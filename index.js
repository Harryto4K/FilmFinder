const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const movieBtn = document.getElementById("btn-movie"); 

async function getGenres() {
    const urlToFetch = tmdbBaseUrl + `/genre/movie/list?api_key=${tmdbKey}`; 
    try {
      let response = await fetch(urlToFetch);
      if (response.ok) {
        let jsonResponse = await response.json(); 
        let genres = jsonResponse.genres; 
        return genres;
      }
    } catch (error) {
      console.log(error);
    }
  };

function populateGenreDropdown(genres) {
    const select = document.getElementById("select-genre");
    for (const genre of genres) {
        let option = document.createElement("option");
        option.value = genre.id;
        option.text = genre.name;
        select.appendChild(option);
    }
};

function getSelectedGenre() {
    const selectedGenre = document.getElementById('select-genre').value;
    return selectedGenre;
};

async function getMovies() {
    const selectedGenre = document.getElementById('select-genre').value;
    const urlToFetch = tmdbBaseUrl + `/discover/movie?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
    try {
        let response = await fetch(urlToFetch);
        if (response.ok) {
          let jsonResponse = await response.json();
          let movies = jsonResponse.results; 
          return movies; 
        }
      } catch (error) {
        console.log(error); 
      }
    
};

async function getMovieInfo(movie) {
    let movieId = movie.id; 
    const urlToFetch = tmdbBaseUrl + `/movie/${movieId}?api_key=${tmdbKey}`; 
    try {
        let response = await fetch(urlToFetch); 
        if (response.ok) {
          let movieInfo = await response.json(); 
          return movieInfo;
        }
      } catch (error) {
        console.log(error); 
      }
};

function clearCurrentMovie() {
    const movieTitle = document.getElementById("Movie");
    const movieSubtitle = document.getElementById("m-info");
    const moviePoster = document.getElementById("m-poster");
    movieTitle.innerHTML = '';
    movieSubtitle.innerHTML = ''; 
    moviePoster.href = ''; 
    moviePoster.hidden = true; 
};

function createMoviePoster(posterPath) {
    const moviePosterUrl = `https://image.tmdb.org/t/p/original/${posterPath}`; 
    const posterImg = document.getElementById('m-poster');
    posterImg.src = moviePosterUrl;
    posterImg.hidden = false;
};

function createMovieTitle(title) {
    const titleHeader = document.getElementById("Movie");
    titleHeader.innerHTML = title; 
};

function createMovieOverview(overview) {
    const overviewParagraph = document.getElementById('m-info'); 
    overviewParagraph.innerHTML = overview;
};

function getRandomMovie(movies) {
    return movies[Math.floor(Math.random() * movies.length)]; 
};

function displayMovie(movieInfo) {
    createMoviePoster(movieInfo.poster_path); 
    createMovieTitle(movieInfo.title);
    createMovieOverview(movieInfo.overview); 
};

async function showRandomMovie() {
    const moviePoster = document.getElementById('m-poster');
    if (moviePoster.src !== "") {
        clearCurrentMovie(); 
    }
    let movies = await getMovies(); 
    let randomMovie = getRandomMovie(movies); 
    let info = await getMovieInfo(randomMovie); 
    displayMovie(info); 
}

getGenres().then(populateGenreDropdown);
movieBtn.onclick = showRandomMovie; 