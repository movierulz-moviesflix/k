const fs = require("fs");
const baseUrl = "https://yourusername.github.io/movie-download/";

const movies = JSON.parse(fs.readFileSync("./movies.json"));

let urls = movies.map(m => `<url><loc>${baseUrl}movie.html?name=${m.slug}</loc></url>`).join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

fs.writeFileSync("sitemap.xml", sitemap);
console.log("Sitemap generated!");
