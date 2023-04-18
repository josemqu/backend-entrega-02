console.log("products.js: loaded");

const cartId = "643c5e9e7c350807cef915d7";
const forms = document.querySelectorAll(".add-form");
const products = document.querySelectorAll(".product-item-full");

forms.forEach((form) => {
	form.addEventListener("submit", (e) => {
		e.preventDefault();
		const productId = e.target.id;
		try {
			fetch(`/api/carts/${cartId}/product/${productId}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
				});
		} catch (error) {
			console.log(error);
		}
	});
});

products.forEach((product) => {
	product.addEventListener("click", (e) => {
		e.stopPropagation();
		e.preventDefault();
		const target = e.target;
		const productId = target.querySelector(".add-form").id;
		console.log(productId);
		if (!productId) return;
		try {
			window.location.href = `/product/${productId}`;
		} catch (error) {
			console.log(error);
		}
	});
});