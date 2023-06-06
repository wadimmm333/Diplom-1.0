import ProductsModel from './products/model.js';
import CartModel from './cart/model.js';

import * as productsView from './products/view.js'
import * as cartView from './cart/view.js'

const productsModel = new ProductsModel();
const cartModel = new CartModel();


// Асинхронная ф-я getAndRenderProducts
// 1. Сначала получение товаров из JSON файла
// 2. Только после этого - отображение товаров на странице
async function getAndRenderProducts() {
	await productsModel.loadProducts();
	productsView.renderProducts(productsModel.products);
	cartView.renderCart(cartModel.cart);
	cartView.updateOrderPrice(cartModel.getTotalCartPrice());
}

getAndRenderProducts();

productsView.elements.productsContainer.addEventListener('click', function (event) {
	// Совершаемое действие
	let action = event.target.dataset.action;

	// Если кликнули по счетчику внутри товаров
	if (action === 'plus' || action === 'minus') {
		// Находим ID продукта
		const productId = +event.target.closest('.card').dataset.id;

		// Запускаем модель для изменения счетчика
		const product = productsModel.updateCounter(productId, action);

		// Обновляем счетчик на странице
		productsView.updateCounter(product);
	}

	// Добавить в корзину
    if (action === 'add-to-cart') {
		// Находим ID продукта
		const productId = +event.target.closest('.card').dataset.id;

		// Получить товар из productsModel
		const product = productsModel.getProduct(productId);

		// Добавить в корзину - ДАННЫЕ
		cartModel.addToCart(product);

		// Отобразить на странице в корзине - VIEW
		cartView.renderCart(cartModel.cart);

		// Сбросить количество товара в каталоге
		productsModel.resetCounter(product);

		// Обновляем счетчик товара на странице
		productsView.updateCounter(product);

		// Пересчитать стоимость заказа в корзине
		const totalPrice = cartModel.getTotalCartPrice();

		// Обновить стоимость заказа на странице
		cartView.updateOrderPrice(totalPrice);
	}
})

// Добавляем прослушку на корзине - счетчики "+" и "-"
cartView.elements.cartWrapper.addEventListener('click', function (event) {
	// Совершаемое действие
	let action = event.target.dataset.action;

	// Если кликнули по счетчику
	if (action === 'plus' || action === 'minus') {
		// Находим ID продукта
		const productId = +event.target.closest('.cart-item').dataset.id;

		// Запускаем в модели корзины метод updateCounterInCart для изменения счетчика
		const product = cartModel.updateCounterInCart(productId, action);

		if (product.counter > 0) {
			// Обновить счетчик на странице
			cartView.updateCounter(product);
		} else {
			// Удалить товар со страницы
			cartView.removeItemFromCart(product);
		}

		// Пересчитать стоимость заказа в корзине
		const totalPrice = cartModel.getTotalCartPrice();

		// Обновить стоимость заказа на странице
		cartView.updateOrderPrice(totalPrice);
	}
});