const API_URL = "https://dummyjson.com/products/search?q=";

let hist = [];

const getSearchResults = async (query) => {
  const url = API_URL + query;
  const res = await fetch(url);
  const data = await res.json();
  return data.products;
};

const debounce = (fn, delay = 500) => {
  let timer;
  return (...arguments) => {
    const self = this;
    const args = arguments;

    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(self, args), delay);
  };
};

const renderProduct = (product) => {
  const span = document.createElement("span");
  span.classList.add("products__main");

  const img = document.createElement("img");
  img.src = product.thumbnail;
  img.alt = product.title;

  const h2 = document.createElement("h2");
  h2.textContent = product.title;

  span.append(img);
  span.append(h2);

  return span;
};

const renderSearchResults = (products) => {
  const resultsDiv = document.getElementById("results");
  //console.log(products);
  products.forEach((product) => {
    const productSpan = renderProduct(product);

    resultsDiv.append(productSpan);
  });
};

const topLevelFunction = async (str) => {
  document.getElementById("results").classList.remove("hidden");
  const products = await getSearchResults(str);
  document.getElementById("results").innerHTML = "";
  renderSearchResults(hist);
  renderSearchResults(products);
};
const pushToHistory = (searchText) => {
  const histobj = {
    title: searchText,
    thumbnail: "",
  };
  hist.push(histobj);
  console.log(hist);
};

const handleChange = (e) => {
  const qStr = e.target.value;

  if (qStr) {
    // debounceFn(qStr);
    topLevelFunction(qStr);
  } else {
    document.getElementById("results").classList.add("hidden");
  }
};

// const debounceFn = debounce(topLevelFunction, 1000);

document
  .getElementById("search")
  .addEventListener("keyup", debounce(handleChange, 1000));

document.getElementById("search").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    pushToHistory(e.target.value);
  }
});
