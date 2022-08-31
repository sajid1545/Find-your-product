let loadProducts = async () => {
	let url = `https://fakestoreapi.com/products`;
	let response = await fetch(url);
	let data = await response.json();
	return data;
};
loadProducts();

let setList = async () => {
	let list = [];

	let menu = document.getElementById('category-list');
	let products = await loadProducts();
	products.forEach((product) => {
		if (list.indexOf(product.category) === -1) {
			list.push(product.category);

			let li = document.createElement('li');
			li.style.padding = '15px';
			li.innerHTML = `${product.category}`;

			menu.appendChild(li);
		}
	});
	console.log(products);
};
setList();

let displayProduct = async () => {
	let productsContainer = document.getElementById('products-container');
	productsContainer.innerHTML = '';

	toggleLoader(true);
	let products = await loadProducts();
	let searchValue = document.getElementById('search-field').value.toLowerCase();
	let error = document.getElementById('error-message');

	let foundProduct = products.filter((product) => product.category.includes(searchValue));
	toggleLoader(false);

	// error

	if (foundProduct.length === 0) {
		error.classList.remove('hidden');
	} else {
		error.classList.add('hidden');
	}

	// Displaying searched Products
	if (foundProduct.length) {
		foundProduct.forEach((product) => {
			let productDiv = document.createElement('div');
			// productDiv.classList.add('grid', 'grid-cols-4');
			productDiv.innerHTML = `
		<div class="card card-compact  bg-base-100 shadow-xl">
					<figure><img src="${product.image}" alt="Shoes" class="h-60 w-full" /></figure>
					<div class="card-body">
						<h2 class="card-title">${
							product.title.length > 20 ? product.title.slice(0, 20) + '...' : `${product.title}`
						}
						</h2>
						<label for="my-modal" class="btn modal-button">Show Details</label>

					</div>
						
				</div>
		`;
			productsContainer.appendChild(productDiv);
			toggleLoader(false);
		});
	}
};

document.getElementById('search-field').addEventListener('keypress', async (e) => {
	if (e.key === 'Enter') {
		displayProduct();
	}
});

let toggleLoader = (isLoading) => {
	let spinner = document.getElementById('spinner');
	if (isLoading) {
		spinner.classList.remove('hidden');
	} else {
		spinner.classList.add('hidden');
	}
};

let productDetails = () => {};
