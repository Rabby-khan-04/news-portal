const loadCategory = () => {
  const categoryUrl =
    "https://openapi.programming-hero.com/api/news/categories";
  fetchAndLoad(categoryUrl, showCategory);
};

const showCategory = (data) => {
  const categories = data.data.news_category;
  categories.forEach((category) => {
    const { category_id, category_name } = category;
    document.getElementById("categories-container").innerHTML += `
    <a class="nav-link" onclick="showNews('${category_id}', '${category_name}')" href="#">${category_name}</a>
    `;
  });
};

const showNews = (category_id, category_name) => {
  category_id = category_id || "08";
  category_name = category_name || "All News";
  const newsUrl = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
  document.getElementById("category-name").innerText = category_name;
  fetchAndLoad(newsUrl, displayNews);
};

const displayNews = (data) => {
  const allNews = data.data;
  document.getElementById("news-count").innerText = allNews.length;
  document.getElementById("all-news").innerHTML = "";
  allNews.forEach((news) => {
    const {
      _id,
      is_todays_pick,
      is_trending,
      rating,
      total_view,
      title,
      author,
      thumbnail_url,
      details,
    } = news;
    document.getElementById("all-news").innerHTML += `
    <div class="card mb-3">
      <div class="row g-0">
        <div class="col-md-4">
          <img src='${thumbnail_url}' class="img-fluid rounded-start" alt="..." />
        </div>
      <div class="col-md-8 d-flex flex-column">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">${
            details.length < 300 ? details : details.slice(0, 300)
          }</p>
        </div>
        <div class="card-footer border-0 bg-body d-flex justify-content-between align-items-center">
          <div class="d-flex gap-2">
            <img src="..." class="img-fluid rounded-circle" alt="..." height="40" width="40" />
            <div>
              <p class="m-0 p-0">author.name</p>
              <p class="m-0 p-0">author.published_date</p>
            </div>
          </div>
          <div class="d-flex align-items-center">
            <i class="fas fa-eye"></i>
            <p class="m-0 p-0">total_view</p>
          </div>
          <div class="d-flex gap-2">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star-half"></i>
            <p class="mb-0">rating.number</p>
          </div>
          <div>
            <i class="fas fa-arrow-right"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
  });
};
