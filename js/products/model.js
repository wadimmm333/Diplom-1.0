export default class Model {
	constructor() {
		this.products = [{}];
	}

	async loadProducts() {
		const response = await fetch('./js/products.json');
		this.products = await response.json();

		for (const product of this.products) {
			product.counter = 1;
		}
	}

	updateCounter(id, action) {
		// Находим продукт в списке продуктов
		const product = this.getProduct(id);

		// При "+" - увеличиваем
		if (action === 'plus') {
			++product.counter;
		}

		// При "-" - уменьшаем, но не меньше 1
		if (action === 'minus' && product.counter > 1) {
			--product.counter;
		}

		return product;
	}

	getProduct(id) {
		return this.products.find((item) => item.id === id);
	}

    resetCounter(product) {
        product.counter = 1;
    }
}