const productsData = [
  {
    id: 1,
    name: "La Mr. Pit",
    precio: 350,
    subName: "Solo para expertos",
    category: "pizzas",
    cardImg: "/assets/img/populares/Photo_Menu_1.png",
  },
  {
    id: 2,
    name: "¡Q`Jamone!",
    precio: 350,
    subName: "c/jamón crudo",
    category: "pizzas",
    cardImg: "/assets/img/populares/Photo_Menu_2.png",
  },
  {
    id: 3,
    name: "La Charly García",
    precio: 380,
    subName: "BASTA",
    category: "Mexican Food",
    cardImg: "/assets/img/populares/Photo_Menu_3.png",
  },

  {
    id: 4,
    name: "La Maradona",
    precio: 450,
    subName: "Eterna",
    category: "Mexican Food",
    cardImg: "/assets/img/populares/Photo_Menu_4.png",
  },

  {
    id: 5,
    name: "Picantovich",
    precio: 750,
    subName: "Pica 2 Veces",
    category: "pizzas",
    cardImg: "/assets/img/populares/Photo_Menu_5.png",
  },

  {
    id: 6,
    name: "La Hasbulla",
    precio: 990,
    subName: "En honor al 1!",
    category: "pizzas",
    cardImg: "/assets/img/populares/Photo_Menu_6.png",
  },

  {
    id: 7,
    name: "Leo Messi",
    precio: 10,
    subName: "De pié señores!",
    category: "pizzas",
    cardImg: "/assets/img/populares/Photo_Menu_7.png",
  },

  {
    id: 8,
    name: "Nick Gi",
    precio: "Gratis",
    subName: "La que desaparece",
    category: "Wraps",
    cardImg: "/assets/img/populares/Photo_Menu_8.png",
  },

  {
    id: 9,
    name: "Bennazianna",
    precio: 3650,
    subName: "La mas completa",
    category: "Mexican Food",
    cardImg: "/assets/img/populares/Photo_Menu_9.jpg",
  },

  {
    id: 10,
    name: "Tronco Pizza",
    precio: 870,
    subName: "Para todo el dia",
    category: "pizzas",
    cardImg: "/assets/img/populares/Photo_Menu_10.jpeg",
  },

  {
    id: 11,
    name: "Papas/Provensal",
    precio: 360,
    subName: "Van como piña",
    category: "Napapuki",
    cardImg: "/assets/img/populares/Photo_Menu_11.jpeg",
  },
  {
    id: 12,
    name: "Pizza Imperio",
    precio: 560,
    subName: "La de Carlitos",
    category: "pizzas",
    cardImg: "./assets/img/populares/Photo_Menu_12.jpg",
  },
];

function splitProducts(size) {
  let chunk = [];
  for (let i = 0; i < productsData.length; i += size)
    chunk.push(productsData.slice(i, i + size));
  return chunk;
}
const allProducts = {
  productList: splitProducts(3),
  next: 1,
  limit: splitProducts(3).length,
};
