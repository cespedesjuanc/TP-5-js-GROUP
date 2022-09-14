/*contenedor del carrito*/
const products = document.querySelector(".contenedor-card");
/*contenedor de recomendaciones*/
const listRecomendacion = document.getElementById("list-recomendaciones");
/* span con el total en el carrito*/
const total = document.querySelector(".total");
//el contenedor de las categorias
const categories = document.querySelector(".container-categorias");
//un htmlcollection de botones de todas las categorias
const categoriesList = document.querySelectorAll(".category");
/*boton comprar carrito*/
const btnComprarCarrito = document.querySelector(".btn-buy");
/*boton para abrir y cerrar el menu*/
const barsBtn = document.querySelector(".menu-label");
/*carrito*/
const cartMenu = document.querySelector(".cart");
/*menu hamburguesa*/
const barsMenu = document.querySelector(".navbar-list");
/*overlay*/
const overlay = document.querySelector(".overlay");
const btnLoad = document.querySelector(".btn-load");

//seteamos el carrito vacio o lo que haya en localStorage segun corresponda
let cart = JSON.parse(localStorage.getItem("cart")) || [];

//funcion para guardar el carrito en el localStorage
const savelocalStorage = (cartlist) => {
  localStorage.setItem("cart", JSON.stringify(cartlist));
};

const renderProduct = (product) => {
  const { id, name, precio, subName, cardImg } = product;
  return `
  <div class="card-containerpopu">
    <img src="${cardImg}"  class="img-populares" alt="${name}">
    <div class="container-info">
    <p>${name}</p>
    <span>${subName}</span>
  </div>
  <div class="container-precio__btn" >
  <span>${precio}</span>
  <button class="btn-popu" id="btn-agregar" 
  data-id='${id}'
  data-name='${name}'
  data-name='${subName}'
  data-precio='${precio}'
  data-img='${cardImg}'
  >Agregar</button>
</div>
</div>
    `;
};

const renderProducts = (category, index) => {
  if (category === "todas") {
    products.innerHTML += allProducts.productList[index]
      .map(renderProduct)
      .join("");
    return;
  }
  const productList = productsData.filter((p) => p.category === category);
  products.innerHTML = productList.map(renderProduct).join("");
};

const changeFilterState = (e) => {
  const selectedCategory = e.target.dataset.category;
  const categories = [...categoriesList];
  categories.forEach((category) => {
    if (category.dataset.category !== selectedCategory) {
      category.classList.remove("active");
    } else {
      category.classList.add("active");
    }
  });
  if (selectedCategory !== "todas") {
    btnLoad.classList.add("hidden");
  } else {
    btnLoad.classList.remove("hidden");
  }
};

const filterProducts = (e) => {
  if (!e.target.classList.contains("category")) return;
  changeFilterState(e);
  if (e.target.dataset.category.toLowerCase() === "todas") {
    products.innerHTML = "";
    renderProducts("todas", 0);
  } else {
    renderProducts(e.target.dataset.category);
  }
};

const showMore = () => {
  renderProducts("todas", allProducts.next);
  allProducts.next++;
  if (allProducts.next === allProducts.limit) {
    btnLoad.classList.add("hidden");
  }
};

const init = () => {
  document.addEventListener("DOMContentLoaded", renderProducts("todas", 0));
  categories.addEventListener("click", filterProducts);
  btnLoad.addEventListener("click", showMore);
};
init();
