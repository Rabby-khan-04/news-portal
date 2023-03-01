const fetchAndLoad = async (url, callback) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    callback(data);
  } catch (error) {
    console.log(error);
  }
};

const pushNews = (allNews) => {
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
    const publishDate = new Date(author.published_date);
    const options = { month: "short", day: "numeric", year: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      publishDate
    );
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
          <div class="d-flex align-items-start gap-2">
            <img src="${
              author.img
            }" class="img-fluid rounded-circle" alt="autor-avater" height="40" width="40" />
            <div>
              <p class="m-0 p-0">${
                author.name ? author.name : "Not available"
              }</p>
              <p class="m-0 p-0">${formattedDate}</p>
            </div>
          </div>
          <div class="d-flex align-items-center gap-1">
            <i class="fas fa-eye"></i>
            <p class="m-0 p-0">${total_view}</p>
          </div>
          <div class="d-flex gap-2">
            ${showRating(rating.number)}
          </div>
          <div>
            <i class="fas fa-arrow-right btn btn-primary" data-bs-toggle="modal" data-bs-target="#news-modal" onclick="openNews('${_id}')"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
  });
};
