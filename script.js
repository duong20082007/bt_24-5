let movies = JSON.parse(localStorage.getItem("movieWishlist")) || [];

const titleInput = document.getElementById("movie-title");
const descInput = document.getElementById("movie-desc");
const saveBtn = document.getElementById("save-btn");
const movieListContainer = document.getElementById("movie-list");
const deleteAll = document.getElementById("clear-all-btn");
const renderMovies = () => {
  movieListContainer.innerHTML = "";
  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.className = "movie-card";
    card.innerHTML = `
        <button class="btn-delete-card">✖</button>
        <h3>🎥 ${movie.title}</h3>
        <p>${movie.description}</p>
        <span class="time">📅 ${movie.createdAt}</span>
    `;

    const deleteBtn = card.querySelector(".btn-delete-card");

    deleteBtn.addEventListener("click", (e) => {
      if (confirm(`Xóa phim "${movie.title}"?`)) {
        movies = movies.filter((m) => m.id !== movie.id);
        localStorage.setItem("movieWishlist", JSON.stringify(movies));
        renderMovies();
      }
    });
    movieListContainer.appendChild(card);
  });
};
const formatTime = () => {
    const now = new Date();
    
    const hour = now.getHours();
    const minutes = now.getMinutes();
    const day = now.getDate();
    const month = now.getMonth() + 1; 
    const year = now.getFullYear();

    return `${hour}:${minutes} ngày ${day}/${month}/${year}`;
};
saveBtn.addEventListener("click", () => {
    const title = titleInput.value.trim();
    const desc = descInput.value.trim();

    if (title === "") {
        alert("Vui lòng nhập tiêu đề phim!");
        return;
    }

    const newMovie = {
        id: Date.now(),
        title: title,
        description: desc || "Không có mô tả",
        createdAt: formatTime()
    };

    movies.push(newMovie);
    localStorage.setItem("movieWishlist", JSON.stringify(movies));

    titleInput.value = "";
    descInput.value = "";
    alert("Đã lưu phim vào danh sách!");
    
    renderMovies(); 
});

deleteAll.addEventListener("click", () => {
    if (confirm("Bạn có chắc muốn xóa sạch danh sách phim không?")) {
        movies = [];
        localStorage.removeItem("movieWishlist");
        renderMovies();
    }
});
renderMovies();