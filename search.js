const grid = document.getElementById("grid");
const searchBox = document.getElementById("searchBox");
const dropdown = document.getElementById("dropdown");

let movies = [];

fetch("movies.json")
  .then(res => res.json())
  .then(data => {
    movies = data;
    displayMovies(movies.slice(0, 20)); // show trending 20
  });

function displayMovies(list) {
  grid.innerHTML = "";
  if(list.length === 0) grid.innerHTML = "<p>No results found</p>";
  list.forEach(movie => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<img src="${movie.image}" alt="${movie.title}">
                      <h3>${movie.title}</h3>`;
    card.onclick = () => window.location.href = `movie.html?name=${movie.slug}`;
    grid.appendChild(card);
  });
}

searchBox.addEventListener("input", () => {
  const query = searchBox.value.toLowerCase();
  dropdown.innerHTML = "";
  if(query === "") {
    displayMovies(movies.slice(0, 20));
    return;
  }
  const filtered = movies.filter(m => m.title.toLowerCase().includes(query));
  displayMovies(filtered);
  
  // dropdown suggestions
  filtered.slice(0,5).forEach(movie => {
    const div = document.createElement("div");
    div.textContent = movie.title;
    div.onclick = () => window.location.href = `movie.html?name=${movie.slug}`;
    dropdown.appendChild(div);
  });

  // auto redirect on exact match
  const exact = movies.find(m => m.title.toLowerCase() === query);
  if(exact) window.location.href = `movie.html?name=${exact.slug}`;
});
