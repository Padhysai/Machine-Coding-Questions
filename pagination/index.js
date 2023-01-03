const API_URL = "https://dummyjson.com/products";
var page = 1;
var totalPages;

const getProducts = async (skip = 0, limit = 10) => {
  const res = await fetch(`${API_URL}?skip=${skip}&limit=${limit}`);
  const data = await res.json();

  return [data.products, data.total];
};

const renderCard = (product) => {
  const productDiv = document.createElement("div");
  productDiv.classList.add("products__card");

  const h2 = document.createElement("h2");
  h2.textContent = product.title;

  const p = document.createElement("p");
  p.textContent = product.description;

  productDiv.append(h2);
  productDiv.append(p);

  return productDiv;
};

const renderProductCards = (products) => {
  const containerDiv = document.getElementById("container");

  products.forEach((product) => {
    const productCard = renderCard(product);

    containerDiv.append(productCard);
  });
};

const renderPagination = (productsCount) => {
  const count = productsCount / 10;
  totalPages = count;
  const pageDiv = document.getElementById("pagination-container");
  const prevSpan = document.createElement("span");
  prevSpan.setAttribute("data-page", "prev");
  prevSpan.textContent = "Prev";
  pageDiv.append(prevSpan);

  for (let i = 0; i < count; i++) {
    const pageSpan = document.createElement("span");
    pageSpan.textContent = i + 1;
    pageSpan.setAttribute("data-page", i + 1);
    pageDiv.append(pageSpan);
  }

  const nextSpan = document.createElement("span");
  nextSpan.textContent = "Next";
  nextSpan.setAttribute("data-page", "next");
  pageDiv.append(nextSpan);
};

// Top level function

const topLevelRender = async (skip, limit) => {
  const [products, count] = await getProducts(skip, limit);
  renderPagination(count);
  renderProductCards(products);
};

topLevelRender(0, 10);

const addClass = (page, className, op = "add") => {
  if (op === "add") {
    const selected = document.querySelector(`[data-page="${page}"]`);
    selected.classList.add(className);
  } else if (op === "remove") {
    const selected = document.querySelector(`[data-page="${page}"]`);
    selected.classList.remove(className);
  }
};

//Attach Eventlistner

document
  .getElementById("pagination-container")
  .addEventListener("click", async (e) => {
    console.log(e.target.getAttribute("data-page"));
    const clickedPageNo = e.target.getAttribute("data-page");
    if (clickedPageNo != null) {
      if (clickedPageNo === "prev") {
        //page = page - 1;
        page--;
      } else if (clickedPageNo === "next") {
        //page = page + 1;
        page++;
      } else {
        page = parseInt(clickedPageNo);
      }
      const MainContainer = document.getElementById("container");
      MainContainer.innerHTML = "";
      const pagesContainer = document.getElementById("pagination-container");
      pagesContainer.innerHTML = "";
      await topLevelRender((page - 1) * 10, 10);

      addClass(page, "selected", "add");

      if (page === 1) {
        addClass("prev", "disabled", "add");
      } else {
        addClass("prev", "disabled", "remove");
      }

      if (page === totalPages) {
        addClass("next", "disabled", "add");
      } else {
        addClass("next", "disabled", "remove");
      }
    }
  });
