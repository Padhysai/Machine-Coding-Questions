const API_URL = "https://dummyjson.com/products/search?q=";

const getSearchResults = async (query) => {
  const url = API_URL + query;
  const res = await fetch(url);
  const data = await res.json();
  return data.products;
};

const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    boundFn = fn.bind(this, ...args);
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => boundFn, delay);
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
  renderSearchResults(products);
};

// const debounceFn = debounce(topLevelFunction, 1000);

document.getElementById("search").addEventListener("keyup", (e) => {
  const qStr = e.target.value;

  if (qStr !== null && qStr !== "") {
    // debounceFn(qStr);
    topLevelFunction(qStr);
  } else {
    document.getElementById("results").classList.add("hidden");
  }
});
