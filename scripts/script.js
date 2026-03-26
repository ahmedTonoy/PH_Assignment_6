const loadURL = async (url, param) => {
  const response = await fetch(url);
  const json = await response.json();
  const data = json[param];
  return data;
};

const loadSpinner = (status, spinner, content) => {
  const loadingSpinner = document.getElementById(spinner);
  const loadingContent = document.getElementById(content);
  if(status) {
    loadingSpinner.classList.remove('hidden');
    loadingContent.classList.add('hidden');
  } else {
    loadingSpinner.classList.add('hidden');
    loadingContent.classList.remove('hidden');
  }
};

const activateCategory = () => {
  document.getElementById('categories-menu').addEventListener('click', (e) => {
    const clicked = e.target.closest('.category');
    if (!clicked) return;

    e.preventDefault();

    const allCategories = document.querySelectorAll('.category');
    allCategories.forEach(category => {
      category.classList.remove('bg-[#15803d]', 'text-white');
    });
    clicked.classList.add('bg-[#15803d]', 'text-white');

    const id = clicked.dataset.id;
    loadCategoryTrees(id);

    document.getElementById('tree-tracker').scrollIntoView({
      behavior: 'smooth'
    });
  });
};

const makeCategoryURL = (id) => {
  let categoryURL;
  if(id === 'plants') categoryURL = `https://openapi.programming-hero.com/api/${id}`;
  else categoryURL = `https://openapi.programming-hero.com/api/category/${id}`;
  return categoryURL;
};

const renderTreeModal = (treeDetails) => {
  const modalContainer = document.getElementById('modal-container');
  modalContainer.innerHTML = '';
  const treeModal = document.createElement('div');
  treeModal.innerHTML = `
    <dialog id="my_modal_5" class="modal modal-middle">
      <div class="modal-box p-4">
        <h3 class="text-xl font-bold">${treeDetails.name}</h3>
        <figure><img class="rounded-xl w-full object-cover h-50 my-2" src="${treeDetails.image}" alt=""></figure>
        <p><span class="text-lg font-bold">Category:</span> ${treeDetails.category}</p>
        <p class="my-1"><span class="text-lg font-bold">Price:</span> ৳${treeDetails.price}</p>
        <p class="-mb-2 text-justify"><span class="text-lg font-bold">Description:</span> ${treeDetails.description}</p>
        <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  `;
  modalContainer.append(treeModal);
  document.getElementById('my_modal_5').showModal();
};

const loadTreeDetails = async (id) => {
  const treeDetailsURL = `https://openapi.programming-hero.com/api/plant/${id}`;
  const treeDetails = await loadURL(treeDetailsURL, 'plants');
  renderTreeModal(treeDetails);
};

const renderPlants = (plants) => {
  const plantsContainer = document.getElementById('plants-container');
  plantsContainer.innerHTML = '';
  plants.forEach(plant => {
    const plantDiv = document.createElement('div');
    plantDiv.classList.add('p-3', 'bg-white', 'rounded-2xl', 'flex', 'flex-col', 'lg:max-w-65', 'h-fit');
    plantDiv.innerHTML = `
      <figure><img class="rounded-xl w-full h-70 object-cover" src="${plant.image}" alt=""></figure>
      <h2 class="font-bold text-sm my-3"><span class="cursor-pointer" onclick="loadTreeDetails(${plant.id})">${plant.name}</span></h2>
      <p class="text-xs text-justify line-clamp-3">${plant.description}</p>
      <div class="flex items-center justify-between font-bold text-lg my-3">
        <p class="p-2 px-4 text-xs rounded-3xl text-[#15803d] bg-[#dcfce7]">${plant.category}</p>
        <p class="text-sm">৳${plant.price}</p>
      </div>
      <button data-name="${plant.name}" data-price="${plant.price}" class="add-to-cart p-3 text-sm w-full bg-[#15803d] text-white font-semibold rounded-full">Add to Cart</button>
    `;
    plantsContainer.append(plantDiv);
  });
};

const loadCategoryTrees = async (id) => {
  loadSpinner(true, 'tree-spinner', 'plants-container');
  const categoryURL = makeCategoryURL(id);
  const plants = await loadURL(categoryURL, 'plants');
  renderPlants(plants);
  loadSpinner(false, 'tree-spinner', 'plants-container');
};

const renderCategories = (categories) => {
  const categoriesMenu = document.getElementById('categories-menu');
  categories.forEach(category => {
    const categoryItem = document.createElement('li');
    categoryItem.innerHTML = `<a class="category" data-id="${category.id}">${category.category_name}</a>`;
    categoryItem.classList.add('rounded-sm', 'w-fit', 'lg:w-full');
    categoriesMenu.append(categoryItem);
  });
};

const loadCategories = async (url) => {
  loadSpinner(true, 'category-spinner', 'categories-menu');
  const categories = await loadURL(url, 'categories');
  renderCategories(categories);
  loadSpinner(false, 'category-spinner', 'categories-menu');
  activateCategory();
};

loadCategories('https://openapi.programming-hero.com/api/categories');
loadCategoryTrees('plants');

const cart = {};

const showToast = (message) => {
  const container = document.getElementById('toast-container');

  const toast = document.createElement('div');
  toast.classList.add('bg-[#15803d]', 'text-white', 'px-4', 'py-2', 'rounded-lg', 'shadow-lg', 'opacity-0', 'translate-x-10', 'transition-all', 'duration-300');
  toast.innerText = message;

  container.append(toast);

  setTimeout(() => {
    toast.classList.remove('opacity-0', 'translate-x-10');
  }, 10);

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-x-10');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
};

const updateCartUI = () => {
  const cartContainer = document.getElementById('cart-container');
  cartContainer.innerHTML = '';

  let total = 0;

  for (const treeName in cart) {
    const  {price, quantity } = cart[treeName];
    total += price * quantity;

    const cartItem = document.createElement('div');
    cartItem.classList.add('flex', 'justify-between', 'items-center', 'mb-3', 'rounded-xl', 'bg-[#f0fdf4]', 'p-2.5');
    cartItem.innerHTML = `
      <div>
        <h3 class="font-bold text-sm">${treeName}</h3>
        <h2>৳${price} x <span id="tree-quantity">${quantity}</span></h2>
      </div>
      <i data-tree-name="${treeName}" class="remove-btn fa-solid fa-circle-xmark hover:text-red-500"></i>
    `;
    cartContainer.append(cartItem);
  }
  
  document.getElementById('cart-total').innerText = total;
};

const addToCart = () => {
  document.getElementById('plants-container').addEventListener('click', (e) => {
    const cartBtn = e.target.closest('.add-to-cart');
    if(!cartBtn) return;
    const treeName = cartBtn.dataset.name;
    const treePrice = parseFloat(cartBtn.dataset.price);

    if(cart[treeName]) {
      cart[treeName].quantity += 1;
    } else {
      cart[treeName] = {
        price: treePrice,
        quantity: 1
      };
    }

    updateCartUI();
    showToast(`${treeName} added to cart`);
  });
};

const removeFromCart = () => {
  document.getElementById('cart-container').addEventListener('click', (e) => {
    const removeBtn = e.target.closest('.remove-btn');
    if(!removeBtn) return;

    const treeName = removeBtn.dataset.treeName;
    delete cart[treeName];

    updateCartUI();
  });
};

addToCart();
removeFromCart();
