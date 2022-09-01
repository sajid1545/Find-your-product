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
	console.log(products);
	products.forEach((product) => {
		if (list.indexOf(product.category) === -1) {
			list.push(product.category);

			let a = document.createElement('a');

			let li = document.createElement('li');
			li.classList.add('list');
			li.style.padding = '15px';
			a.innerHTML = `${product.category}`;
			li.appendChild(a);

			menu.appendChild(li);

			let anchor = a;
			// console.log(anchor.innerText);
			anchor.addEventListener('click', () => {
				displayProduct();
			});
		}
	});
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
						
						<label for="my-modal-3" onclick="loadDetails(${
							product.id
						})" class="btn modal-button w-2/4 mx-auto">Show Details
					</label> 
						
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

const loadDetails = (id) => {
	let url = `https://fakestoreapi.com/products/${id}`;
	fetch(url)
		.then((res) => res.json())
		.then((data) => openModal(data));
};
loadDetails();

const openModal = (details) => {
	console.log(details);
	const modal = document.getElementById('modal-body');
	modal.textContent = '';

	modal.innerHTML = `<p>${details.description}</p>
        <img src="${details.image}"/>
    `;
};
