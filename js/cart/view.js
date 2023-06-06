export const elements = {
	productsContainer: document.querySelector('#products-container'),
	cartWrapper: document.querySelector('.cart-wrapper'),
	cartEmptyBadge: document.querySelector('[data-cart-empty]'),
	orderForm: document.querySelector('#order-form'),
	totalPrice: document.querySelector('.total-price'),
};

export function renderCart(product) {
    let cartHTML = '';

    product.forEach(function (item) {
        const cartItemHTML = `<div class="cart-item" data-id="${item.id}">
                                <div class="cart-item__top">
                                    <div class="cart-item__img">
                                        <img src="img/roll/${item.imgSrc}" alt="${item.title}" />
                                    </div>
                                    <div class="cart-item__desc">
                                        <div class="cart-item__title">${item.title}</div>
                                        <div class="cart-item__weight">${item.itemsInBox} / ${item.weight}</div>

                                        <!-- cart-item__details -->
                                        <div class="cart-item__details">
                                            <div class="items items--small counter-wrapper">
                                                <div class="items__control" data-action="minus">-</div>
                                                <div class="items__current" data-counter="">${item.counter}</div>
                                                <div class="items__control" data-action="plus">+</div>
                                            </div>

                                            <div class="price">
                                                <div class="price__currency">${item.price} ₽</div>
                                            </div>
                                        </div>
                                        <!-- // cart-item__details -->
                                    </div>
                                </div>
                            </div>
                            `;
        cartHTML = cartHTML + cartItemHTML;
    })

    elements.cartWrapper.innerHTML = cartHTML;

    toggleCart();
}

function toggleCart() {
    if (elements.cartWrapper.children.length > 0) {
		elements.cartEmptyBadge.classList.add('none');
		elements.orderForm.classList.remove('none');
    } else {
		elements.cartEmptyBadge.classList.remove('none');
		elements.orderForm.classList.add('none');
    }
}

export function updateOrderPrice(price) {
	elements.totalPrice.innerText = new Intl.NumberFormat().format(price);
}

export function updateCounter(product) {
    const productWrapper = elements.cartWrapper.querySelector(`[data-id="${product.id}"]`);
    const counterElement = productWrapper.querySelector('[data-counter]');
    counterElement.innerText = product.counter;
}

export function removeItemFromCart(product) {
    const productWrapper = elements.cartWrapper.querySelector(`[data-id="${product.id}"]`);
    productWrapper.remove();

    toggleCart();
}
