const products = document.querySelector('.cart-container');
const listPrecomendacion = document.getElementById('list-recomendaciones');
const total = document.querySelector('.total');
const categories = document.querySelector('.container-categorias');
const categoriesList = document.querySelector('.category');
const btnComprarCarrito = document.querySelector('.btn-buy');
const barsBtn = document.querySelector('.menu-label');
const cartMenu = document.querySelector('.cart');
const barsMenu = document.querySelector('.navbar-list');
const overlay = document.querySelector('.overlay');

//seteamos el carrito vacio
let cart = JSON.parse(localStorage.getItem('cart')) || [];

//funcion para guardar el carrito en el localStorage
const savelocalStorage = cartlist => {
    localStorage.setItem('cart' , JSON.stringify(cartlist));
};
