const menuContainer = document.querySelector(".menus-container");
const loaders = document.querySelector(".loaders");

const categories = document.querySelector(".categories");

const API_URL = "https://dummyjson.com";

async function fetchAPI(url) {
  let res = await fetch(`${url}/products`);
  res = res.json().then((data) => loadData(data.products));
}
async function categroiesAPI(url) {
  let res = await fetch(`${url}/products/categories`);
  res.json().then((data) => {
    data.forEach((item) => {
      let btn = document.createElement("button");
      btn.className =
        "btn btn-outline hover:btn-info shadow-lg hover:shadow-sm rounded-full min-h-full h-auto py-2 text-sm";
      btn.textContent = item.name;

      btn.addEventListener("click", async (e) => {
        let res = await fetch(
          `https://dummyjson.com/products/category/${item.slug}`
        );
        res.json().then((data) => loadData(data.products));
      });
      categories.append(btn);
    });
  });
}

categroiesAPI(API_URL);
fetchAPI(API_URL);

function loadData(data) {
  loaders.remove();
  menuContainer.innerHTML = "";
  data.slice(0, 10).forEach((item) => {
    let element = document.createElement("div");
    element.dataset.id = item.id;
    element.className =
      "popular bg-white border-2 border-yellow-500 rounded-md p-4 max-w-6xl mx-auto mt-4 flex flex-col justify-between shadow-lg hover:shadow-md transition-all";

    element.innerHTML = ` 
      <div class="popular__img relative overflow-hidden max-h-[320px] cursor-pointer">
          <img src="${item.images[0]}" class="h-full mx-auto"/>
          <div class="popular__star absolute top-3 left-3 bg-white p-1 rounded-full px-2 text-sm">
             ${item.rating}
              <i class="fa-solid fa-star text-yellow-400"></i>
          </div>
      </div>
      <div class="popular__info mt-3">
          <div class="popular__name flex justify-between items-center">
              <h3 class="text-2xl">${item.title}</h3>
              <p class="price text-2xl shrink-0">${item.price} K</p>
          </div>
          <div class="popular__btns mt-3 flex justify-between items-center">
              <div class="temp">
                  <button
                      class="btn bg-white border-2 border-yellow-400 text-yellow-400 min-h-min h-8 hover:bg-yellow-400 hover:text-white hover:border-transparent">
                      Hot
                  </button>
                  <button
                      class="btn bg-white border-2 border-yellow-400 text-yellow-400 min-h-min h-8 hover:bg-yellow-400 hover:text-white hover:border-transparent ms-3">
                      Cold
                  </button>
              </div>
              <i class="fa-solid fa-cart-shopping bg-yellow-500 p-3 scale-75 text-white rounded-full"></i>
          </div>
      </div>
    `;

    element.addEventListener("click", () => {
      localStorage.setItem(`Product-${item.id}`, item);
    });
    menuContainer.append(element);
  });
}

menuContainer.addEventListener("click", (e) => {
  if (e.target.tagName == "IMG") {
    window.open(
      `/product/product.html?id=${e.target.closest(".popular").dataset.id}`,
      "_self"
    );
  }
});
