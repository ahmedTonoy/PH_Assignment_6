const loadURL = async (url, param) => {
  const response = await fetch(url);
  const json = await response.json();
  const data = json[param];
  return data;
}

const activateCategory = () => {
  document.getElementById('categories-menu').addEventListener('click', (e) => {
    const allCategories = document.querySelectorAll('.category');
    allCategories.forEach(category => {
      category.classList.remove('bg-[#15803d]', 'text-white');
    });
    e.target.classList.add('bg-[#15803d]', 'text-white');
  });
}

const loadCategoryTrees = async (id) => {
  activateCategory();
  const categoryURL = `https://openapi.programming-hero.com/api/category/${id}`;
  console.log(categoryURL);
  const plants = await loadURL(categoryURL, 'plants');
  console.log(plants);
}

const renderCategories = (categories) => {
  const categoriesMenu = document.getElementById('categories-menu');
  // const fragment = document.createElement('div');
  categories.forEach(category => {
    const categoryItem = document.createElement('li');
    categoryItem.innerHTML = `<a class="category">${category.category_name}</a>`;
    categoryItem.classList.add('rounded-sm', 'w-fit', 'lg:w-full');
    categoryItem.addEventListener('click', loadCategoryTrees(category.id));
    // fragment.append(categoryDiv);
    categoriesMenu.append(categoryItem);
  });
  // categoriesMenu.append(fragment);
}

const loadCategories = async (url) => {
  const categories = await loadURL(url, 'categories');
  renderCategories(categories);
}

loadCategories('https://openapi.programming-hero.com/api/categories')