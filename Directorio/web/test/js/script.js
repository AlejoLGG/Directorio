let defaultSelectedCategory = "Todas las categorias";
let defaultSelectedSubategory = defaultSelectedCategory;
let selectedCategory = defaultSelectedCategory;
let selectedSubcategory = defaultSelectedCategory;

var catalogElementList = null;

let categoriesList = [
  "Todas las categorias",
  "VideoJuegos",
  "Música",
  "Peliculas",
  "Literatura"
];

let subcategoriesList = {
  VideoJuegos: [
    "MMORPG",
    "ARPG",
    "Aventura",
    "Arcade",
    "Sumlación"
  ],
  Música: [
    "Rock",
    "Hip Hop",
    "Electrónica",
    "Rap",
    "Metal"
  ],
  Peliculas: [
    "Acción",
    "Aventura",
    "Ciencia ficción",
    "Comedia",
    "Drama"
  ],

  Literatura: [
    "Novela",
    "Ciencia ficción",
    "Poesía",
    "Talleres literarios",
    "Historia"
  ],
  "Todas las subcategorias": [],
};

function addElementsToCategoriesList() {
  let select = document.getElementById("categorias");

  if (categoriesList.length > 0) {
    categoriesList.sort();
  }

  categoriesList.forEach((category) => {
    let newOption = document.createElement("option");
    newOption.value = category;
    newOption.text = category;
    select.appendChild(newOption);
  });
}

function addElementsToSubcategoriesList(category) {
  let select = document.getElementById("subcategorias");

  let subcategoryList = subcategoriesList[category];

  if (subcategoryList.length > 0) {
    subcategoryList.sort();
  }

  subcategoryList.forEach((category) => {
    let newOption = document.createElement("option");
    newOption.value = category;
    newOption.text = category;
    select.appendChild(newOption);
  });
}
function removeOptionsFromSubcategoriesSelect() {
  let select = document.getElementById("subcategorias");
  let count = select.options.length;

  for (let i = count - 1; i > 0; i--) {
    select.remove(select.options.length - 1);
  }
}

function displayOrhideElementsByCategory(categoryToShow) {
  if (categoryToShow === "Todas las categorias") {
    document.getElementById("elements-list-container").remove();
    let tmp = catalogElementList.cloneNode(true);
    document.getElementById("main-container").appendChild(tmp);
  } else {
    document.getElementById("elements-list-container").remove();
    let tmp = catalogElementList.cloneNode(true);
    document.getElementById("main-container").appendChild(tmp);

    let elemenmentToHideList = document.querySelectorAll(
      "div[category]:not([category='" + categoryToShow + "'])"
    );
    elemenmentToHideList.forEach((element) => {
      element.remove();
    });
  }
  addLinkNodeBeforeImages();
  changeCarrouselControlIds();
}

function displayOrhideElementsBySubcategory(subcategoryToShow) {
  if (subcategoryToShow === "Todas las subcategorias") {
    document.getElementById("elements-list-container").remove();
    let tmp = catalogElementList.cloneNode(true);
    document.getElementById("main-container").appendChild(tmp);
    resetCategoryListFilerFromSubcategory();
  } else {
    document.getElementById("elements-list-container").remove();
    let tmp = catalogElementList.cloneNode(true);
    document.getElementById("main-container").appendChild(tmp);

    let elemenmentToHideList = document.querySelectorAll(
      "div[subcategory]:not([subcategory='" + subcategoryToShow + "'])"
    );
    elemenmentToHideList.forEach((element) => {
      element.remove();
    });
  }

  addLinkNodeBeforeImages();
  changeCarrouselControlIds();
}

function resetCategoryListFilerFromSubcategory() {
  let categoryToShow = document.getElementById("categorias").value;
  console.log(categoryToShow);
  elemenmentToHideList = document.querySelectorAll(
    "div[category]:not([category='" + categoryToShow + "'])"
  );
  elemenmentToHideList.forEach((element) => {
    element.remove();
  });
}

function addLinkNodeBeforeImages() {
  document.querySelectorAll(".carousel-item img").forEach((img) => {
    let clonedImage = img.cloneNode(true);
    let src = clonedImage.getAttribute("src");
    let alt = clonedImage.getAttribute("alt");
    let imageContainer = img.parentElement;

    let link = document.createElement("a");
    link.setAttribute("href", src);
    link.setAttribute("data-caption", alt);

    img.remove();

    imageContainer.appendChild(link);
    link.appendChild(clonedImage);
  });

  document
    .querySelectorAll(".carousel-item a")
    .forEach((el) => el.addEventListener("click", Lightbox.initialize));
}

function changeCarrouselControlIds() {
  let carrouselControlList = document
    .querySelectorAll("#elements-list-container div[data-bs-ride='carousel']")
    .forEach((el, index) => {
      el.setAttribute("id", "carouselControls" + index);
      el.querySelector("button[data-bs-slide='prev'").setAttribute(
        "data-bs-target",
        "#carouselControls" + index
      );
      el.querySelector("button[data-bs-slide='next'").setAttribute(
        "data-bs-target",
        "#carouselControls" + index
      );
    });
}

addEventListener("DOMContentLoaded", (event) => {
  catalogElementList = document
    .getElementById("elements-list-container")
    .cloneNode(true);
  addElementsToCategoriesList();

  document.getElementById("categorias").addEventListener("change", (event) => {
    removeOptionsFromSubcategoriesSelect();
    displayOrhideElementsByCategory(event.target.value);
    addElementsToSubcategoriesList(event.target.value);
  });

  document
    .getElementById("subcategorias")
    .addEventListener("change", (event) => {
      displayOrhideElementsBySubcategory(event.target.value);
    });

  addLinkNodeBeforeImages();
  changeCarrouselControlIds();
});
