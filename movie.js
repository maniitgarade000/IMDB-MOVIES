let search = document.getElementById("search");

//event

search.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    var searchText = e.target.value;
    SearchMovies(searchText);
  }
});

const imdb_key = "b649b0e4";

function SearchMovies(searchkey) {
  let base_url = ` http://www.omdbapi.com/?s=${searchkey}&apikey=${imdb_key}`;
  window
    .fetch(base_url)
    .then((data) => {
      data.json().then((movies) => {
        let moviesData = movies.Search;
        let output = [];
        for (movie of moviesData) {
          let Poster = movie.Poster === "N/A" ? "./reload.png" : movie.Poster;
          output += `
            <div>
            <img src=${Poster}/> 
            <main>
            <h2> ${movie.Title}</h2>
            <p>${movie.Year}</p>
            <p>${movie.Type}</p>
            <p><button><a href="http://www.imdb.com/title/${movie.imdbID}" target = "_blank">watch movie</a></button></p>
            
            </main>
            </div>`;
        }
        document.getElementById("template").innerHTML = output;
      });
    })
    .catch((err) => console.log(err));
}
