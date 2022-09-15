/*contenedor del carrito*/
const products = document.querySelector(".products-container");
//contenedor de productos del carrito
const productsCart = document.querySelector(".cart-container");
/* span con el total en el carrito*/
const total = document.querySelector(".total");
/*contenedor de recomendaciones*/
const listRecomendacion = document.getElementById("list-recomendaciones");
const btnComprar = document.getElementById("btn-add");
//el contenedor de las categorias
const categories = document.querySelector(".container-categorias");
//un htmlcollection de botones de todas las categorias
const categoriesList = document.querySelectorAll(".category");
/*boton comprar carrito*/
const buyBtn = document.querySelector(".btn-buy");
/*boton para abrir y cerrar el menu*/
const barsBtn = document.querySelector(".menu-label");
/*carrito*/
const cartMenu = document.querySelector(".cart");
/*menu hamburguesa*/
const barsMenu = document.querySelector(".navbar-list");
/*overlay*/
const overlay = document.querySelector(".overlay");
const btnLoad = document.querySelector(".btn-load");

const cartBtn = document.querySelector(".cart-label");

//seteamos el carrito vacio o lo que haya en localStorage segun corresponda
let cart = JSON.parse(localStorage.getItem("cart")) || [];

//funcion para guardar el carrito en el localStorage
const saveLocalStorage = (cartlist) => {
  localStorage.setItem("cart", JSON.stringify(cartlist));
};

const renderProduct = (product) => {
  const { id, name, precio, subName, cardImg } = product;
  return `
    <div class="card-containerpopu">
        <img src="${cardImg}" alt="${name}">
        <div class="container-info">
            <p>${name}</p>
            <span>${subName}</span>
        </div>
        <div class="container-precio__btn" >
            <span>$ ${precio}</span>
            <button class="btn-add"data-id='${id}'
            data-name='${name}'
            data-name='${subName}'
            data-precio='${precio}'
            data-img='${cardImg}'>Agregar</button>
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

/// --------- Logica para el carro ---------------------- //
// Renderizado del producto del carrito
const renderCartProduct = (cartProduct) => {
  const { id, name, precio, subName, cardImg, quantity } = cartProduct;
  return `
  <div class="cart-item">
    <img src="${cardImg}" alt="${name}"/>
    <div class="item-info">
        <h3 class="item-title">${name}</h3>
        <p class="item-bid">${subName}</p>
        <span class="item-price">Precio: $ ${precio}</span>
    </div>
    <div class="item-handler">
      <span class="quantity-handler down" data-id=${id}>-</span>
      <span class="item-quantity">${quantity}</span>
      <span class="quantity-handler up" data-id=${id}>+</span>
    </div>
  </div>



  `;
};

// Logica para renderizar el carro
const renderCart = (cartList) => {
  if (!cartList.length) {
    productsCart.innerHTML = `<p class="empty-msg">No hay productos en el carrito</p>`;
    return;
  }
  productsCart.innerHTML = cartList.map(renderCartProduct).join("");
};

// Funcion para renderizar el total de la suma del precio de todo lo que esta en el carrito. Limitamos los decimales a 2
// Por cada iteracion multiplicar el precio por la cantidad del producto que hay en el carrito y lo suma al acumulado
const showTotal = (cartList) => {
  total.innerHTML = ` ${cartList
    .reduce((acc, cur) => acc + Number(cur.precio) * cur.quantity, 0)
    .toFixed(2)}  Pesos`;
};

// Si no hay nada en el carro, deshabilita el boton de compra, si no lo habilita
const disableBuyBtn = () => {
  if (!cart.length) {
    buyBtn.classList.add("disabled");
  } else {
    buyBtn.classList.remove("disabled");
  }
};

// Funcion para el manejo de mas y menos dentro del carrito
const handleQuantity = (e) => {
  if (e.target.classList.contains("down")) {
    const existingCartItem = cart.find(
      (item) => item.id === e.target.dataset.id
    );

    // Si tocamos en un item que tine una sola cantidad
    if (existingCartItem.quantity === 1) {
      if (window.confirm("¿Desea Eliminar el producto del carrito?")) {
        cart = cart.filter((prod) => prod.id !== existingCartItem.id);
        saveLocalStorage(cart);
        renderCart(cart);
        showTotal(cart);
        disableBuyBtn();
        return;
      }
      // Si no
    }
    cart = cart.map((item) => {
      return item.id === existingCartItem.id
        ? { ...item, quantity: Number(item.quantity) - 1 }
        : item;
    });

    // Si se toco el boton de up
  } else if (e.target.classList.contains("up")) {
    const existingCartItem = cart.find(
      (item) => item.id === e.target.dataset.id
    );

    cart = cart.map((item) => {
      return item.id === existingCartItem.id
        ? { ...item, quantity: Number(item.quantity) + 1 }
        : item;
    });
  }
  // Para todos los casos
  saveLocalStorage(cart);
  renderCart(cart);
  showTotal(cart);
  disableBuyBtn();
};

const addProduct = (e) => {
  if (!e.target.classList.contains("btn-add")) return;
  const product = {
    id: e.target.dataset.id,
    name: e.target.dataset.name,
    subName: e.target.dataset.subName,
    precio: e.target.dataset.precio,
    cardImg: e.target.dataset.cardImg,
  };

  // Vamos a hacer una variable para checkear si el producto existe en el carrito, si existe vamos a sumar + 1 a la cantidad
  //
  const existingCartItem = cart.find((item) => item.id === product.id);

  if (existingCartItem) {
    cart = cart.map((item) => {
      return item.id === product.id
        ? { ...item, quantity: Number(item.quantity) + 1 }
        : item;
    });
  } else {
    cart = [...cart, { ...product, quantity: 1 }];
  }
  saveLocalStorage(cart);
  renderCart(cart);
  showTotal(cart);
  disableBuyBtn();
};

//Si el carrito esta vacio, apretar el boton de compra no va  a hacer nada, sino triggerea a una nueva ventana de confirmacion en caso de confirmar, sacamos del localstorage el item cart y recargamos la pagina
const completeBuy = () => {
  if (!cart.length) return;
  if (window.confirm("¿Desea finalizar su compra?")) {
    localStorage.removeItem("cart");
    window.location.reload();
  }
};

// ----------------------Menu Interface ---------------//

const toggleMenu = () => {
  barsMenu.classList.toggle("open-menu");
  if (cartMenu.classList.contains("open-cart")) {
    cartMenu.classList.remove("open-cart");
    return;
  }
  overlay.classList.toggle("show-overlay");
};

const toggleCart = () => {
  cartMenu.classList.toggle("open-cart");
  if (barsMenu.classList.contains("open-menu")) {
    barsMenu.classList.remove("open-menu");
    return;
  }
  overlay.classList.toggle("show-overlay");
};

//
const closeOnScroll = () => {
  if (
    !barsMenu.classList.contains("open-menu") &&
    !cartMenu.classList.contains("open-cart")
  )
    return;

  barsMenu.classList.remove("open-menu");
  cartMenu.classList.remove("open-cart");
  overlay.classList.remove("show-overlay");
};

const init = () => {
  document.addEventListener("DOMContentLoaded", renderProducts("todas", 0));
  document.addEventListener("DOMContentLoaded", renderCart(cart));
  document.addEventListener("DOMContentLoaded", showTotal(cart));
  categories.addEventListener("click", filterProducts);
  products.addEventListener("click", addProduct);
  productsCart.addEventListener("click", handleQuantity);
  btnLoad.addEventListener("click", showMore);
  buyBtn.addEventListener("click", completeBuy);
  cartBtn.addEventListener("click", toggleCart);
  barsBtn.addEventListener("click", toggleMenu);
  disableBuyBtn();
  window.addEventListener("scroll", closeOnScroll);
};

init();
