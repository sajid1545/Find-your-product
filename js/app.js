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
};
setList();

document.getElementById('search-field').addEventListener('keypress', async (e) => {
	let productsContainer = document.getElementById('products-container');
	productsContainer.innerHTML = '';
	let products = await loadProducts();
	let searchValue = document.getElementById('search-field').value;

	let foundProduct = products.filter((product) => product.category.includes(searchValue));
	if (e.key === 'Enter') {
		foundProduct.forEach((product) => {
			let productDiv = document.createElement('div');
			// productDiv.classList.add('grid', 'grid-cols-4');
			productDiv.innerHTML = `
        <div class="card card-compact  bg-base-100 shadow-xl">
                    <figure><img src="${product.image}" alt="Shoes" class="h-60 w-full" /></figure>
                    <div class="card-body">
                        <h2 class="card-title">${
													product.title.length > 20
														? product.title.slice(0, 20) + '...'
														: 'Title N/A'
												}</h2>
                    </div>
                        
                </div>
        `;
			productsContainer.appendChild(productDiv);
		});
	}
});
