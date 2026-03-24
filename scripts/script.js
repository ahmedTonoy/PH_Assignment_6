const loadURL = async (url, param) => {
  const response = await fetch(url);
  const json = await response.json();
  const data = json[param];
  return data;
}

const activateCategory = () => {
  document.getElementById('categories-menu').addEventListener('click', async (e) => {
    const clicked = e.target;

    const allCategories = document.querySelectorAll('.category');
    allCategories.forEach(category => {
      category.classList.remove('bg-[#15803d]', 'text-white');
    });
    clicked.classList.add('bg-[#15803d]', 'text-white');

    const id = clicked.dataset.id;
    await loadCategoryTrees(id);
  });
}

const makeCategoryURL = (id) => {
  let categoryURL;
  if(id === 'plants') categoryURL = `https://openapi.programming-hero.com/api/${id}`;
  else categoryURL = `https://openapi.programming-hero.com/api/category/${id}`;
  return categoryURL;
}

const renderPlants = (plants) => {
  const plantsContainer = document.getElementById('plants-container');
  plantsContainer.innerHTML = '';
  plants.forEach(plant => {
    const plantDiv = document.createElement('div');
    plantDiv.classList.add('p-3', 'bg-white', 'rounded-2xl', 'flex', 'flex-col', 'lg:max-w-65', 'h-full');
    plantDiv.innerHTML = `
      <figure><img class="rounded-xl w-full h-70 object-cover" src="${plant.image}" alt=""></figure>
      <h2 class="font-bold text-sm my-3">${plant.name}</h2>
      <p class="text-xs text-justify line-clamp-3 flex-grow">${plant.description}</p>
      <div class="flex items-center justify-between font-bold text-lg my-3">
        <p class="p-2 px-4 text-xs rounded-3xl text-[#15803d] bg-[#dcfce7]">${plant.category}</p>
        <p class="text-sm">৳${plant.price}</p>
      </div>
      <button data-category="${plant.category}" data-price="${plant.price}" class="p-3 text-sm w-full bg-[#15803d] text-white font-semibold rounded-full">Add to Cart</button>
    `;
    plantsContainer.append(plantDiv);
  });
}

const loadCategoryTrees = async (id) => {
  const categoryURL = makeCategoryURL(id);
  console.log(categoryURL);
  const plants = await loadURL(categoryURL, 'plants');
  renderPlants(plants);
}

const renderCategories = (categories) => {
  const categoriesMenu = document.getElementById('categories-menu');
  categories.forEach(category => {
    const categoryItem = document.createElement('li');
    categoryItem.innerHTML = `<a class="category" data-id="${category.id}">${category.category_name}</a>`;
    categoryItem.classList.add('rounded-sm', 'w-fit', 'lg:w-full');
    categoriesMenu.append(categoryItem);
  });
}

const loadCategories = async (url) => {
  const categories = await loadURL(url, 'categories');
  renderCategories(categories);
  activateCategory();
}

loadCategories('https://openapi.programming-hero.com/api/categories');
loadCategoryTrees('plants');
