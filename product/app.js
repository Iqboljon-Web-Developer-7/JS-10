const API_URL = "https://dummyjson.com";
const item = document.querySelector(".details");

async function fetchDetail(url, id) {
  let res = await fetch(`${url}/products/${id}`);
  res.json().then((data) => createItem(data));
}

let query = new URLSearchParams(window.location.search);
let id = query.get("id");
fetchDetail(API_URL, id);

function createItem(data) {
  console.log(data);
  item.innerHTML = `
        <h1 class="pt-5">${data.title}</h1>
        <p>${data.description}</p>
        <img src="${data.images[0]}" width="200" alt="">

        <div className="imgs">
            ${data.images.forEach((item, idx) => {
              let img = document.createElement("img");
              img.src = item;
              return img;
            })}
        </div>

        <button>Buy now</button>
    `;
}
