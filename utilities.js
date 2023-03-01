const fetchAndLoad = async (url, callback) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    callback(data);
  } catch (error) {
    console.log(error);
  }
};
