const grid = document.getElementById("grid");
const searchBox = document.getElementById("searchBox");

let movies = [];

// Create dropdown
const dropdown = document.createElement("div");
dropdown.style.position = "absolute";
dropdown.style.background = "#222";
dropdown.style.width = "300px";
dropdown.style.margin = "auto";
dropdown.style.left = "0";
dropdown.style.right = "0";
dropdown.style.zIndex = "1000";
document.body.appendChild(dropdown);

// Load data
fetch("movies.json")
.then(res => res.json())
.then(data => {
  movies = data;
  displayMovies(movies);
});

function displayMovies(list){
  grid.innerHTML = "";

  if(list.length === 0){
    grid.innerHTML = "<p>No results found</p>";
    return;
  }

  list.forEach(movie => {
    grid.innerHTML += `
      <a href="movie.html?name=${movie.slug}">
        <div class="card">
          <img src="${movie.image}" loading="lazy" alt="${movie.title}">
          <h3>${movie.title}</h3>
        </div>
      </a>
    `;
  });
}

// Search input
searchBox.addEventListener("input", () => {
  const query = searchBox.value.toLowerCase();
  dropdown.innerHTML = "";

  if(query === ""){
    displayMovies(movies);
    return;
  }

  const filtered = movies.filter(movie =>
    movie.title.toLowerCase().includes(query)
  );

  displayMovies(filtered);

  // 🔥 Auto redirect if exact match
  const exact = movies.find(m =>
    m.title.toLowerCase() === query
  );

  if(exact){
    window.location.href = `movie.html?name=${exact.slug}`;
  }

  // 🔥 Dropdown suggestions
  filtered.slice(0,5).forEach(movie => {
    const item = document.createElement("div");
    item.style.padding = "10px";
    item.style.cursor = "pointer";
    item.innerText = movie.title;

    item.onclick = () => {
      window.location.href = `movie.html?name=${movie.slug}`;
    };

    dropdown.appendChild(item);
  });
});
