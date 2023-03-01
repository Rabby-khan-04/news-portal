let filterAbleNews = [];
const loadCategory = () => {
  const categoryUrl =
    "https://openapi.programming-hero.com/api/news/categories";
  fetchAndLoad(categoryUrl, showCategory);
};

const showCategory = (data) => {
  const categories = data.data.news_category;
  document.getElementById("categoy-spinner").classList.add("d-none");
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
  filterAbleNews = data.data;
  const allNews = data.data;
  pushNews(allNews);
};

const showRating = (rating) => {
  let ratingHtml = "";
  for (let i = 1; i <= Math.floor(rating); i++) {
    ratingHtml += '<i class="fas fa-star"></i>';
  }
  if (rating - Math.floor(rating) > 0) {
    ratingHtml += '<i class="fas fa-star-half"></i>';
  }
  ratingHtml += `<p class="mb-0">${rating}</p>`;

  return ratingHtml;
};

const openNews = (newsId) => {
  const fullNewsUrl = `https://openapi.programming-hero.com/api/news/${newsId}`;
  fetchAndLoad(fullNewsUrl, showNewsDetails);
};

const showNewsDetails = (newsDetails) => {
  const news = newsDetails.data[0];
  console.log(news);
  const { title, image_url, details, rating, others_info } = news;
  document.getElementById("news-modalLabel").innerText = title;
  document.getElementById("modal-body").innerHTML = `
  <img src='${image_url}' class="img-fluid rounded-start mb-3" alt="..." />
  <span class="badge text-bg-warning">${rating.badge}</span>
  <span id="trending" class="badge text-bg-danger">${
    others_info.is_trending ? "Trenging" : "none"
  }</span>
  <p class="card-text">${details}</p>
  `;
  if (!others_info.is_trending) {
    document.getElementById("trending").style.display = "none";
  }
};

const showTodaysPick = () => {
  const pickedNews = filterAbleNews.filter(
    (news) => news.others_info.is_todays_pick
  );
  pushNews(pickedNews);
};

const showTrending = () => {
  const pickedNews = filterAbleNews.filter(
    (news) => news.others_info.is_trending
  );
  pushNews(pickedNews);
};

document.getElementById("floatingSelect").addEventListener("change", () => {
  const sortValue = document.getElementById("floatingSelect").value;
  if (sortValue === "review") {
    filterAbleNews.sort((a, b) => b.rating.number - a.rating.number);
    pushNews(filterAbleNews);
  } else if (sortValue === "Most viewed") {
    filterAbleNews.sort((a, b) => b.total_view - a.total_view);
    pushNews(filterAbleNews);
  }
});
