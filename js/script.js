// Парки
const parks = [
    {id: 1, name: "Музей-заповедник «Коломенское»", price: 500, category: "museum"},
    {id: 2, name: "Музей-заповедник «Царицыно»", price: 600, category: "museum"},
    {id: 3, name: "Музей-заповедник «Сокольники»", price: 350, category: "museum"},
    {id: 4, name: "Ландшафтный заказник «Тёплый Стан»", price: 200, category: "landscape"}
];

// Корзина покупок
let cart = [];

// Сохранение корзины в localStorage
const saveCart = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

// Общая сумма корзины
const calculateTotal = () => {
    let total = 0;
    cart.forEach(item => total += item.price);
    return total;
};

// Добавление товара в корзину
const addToCart = (product) => {
    cart.push(product);
    saveCart();
    renderCart();
};

// Удаление товара из корзины
const removeFromCart = (index) => {
    cart.splice(index, 1);
    saveCart();
    renderCart();
};

// Перерисовка корзины
const renderCart = () => {
    const cartList = document.querySelector("#cart-list");
    const totalElement = document.querySelector("#cart-total");

    cartList.innerHTML = "";

    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = item.name + " — " + item.price + " руб. ";

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "X";
        removeBtn.addEventListener("click", () => removeFromCart(index));

        li.appendChild(removeBtn);
        cartList.appendChild(li);
    });

    totalElement.textContent = "Итого: " + calculateTotal() + " руб.";
};

// Фильтрация товаров
const filterProducts = () => {
    const select = document.querySelector("#category-filter");
    const selected = select.value;
    const products = document.querySelectorAll(".product");

    products.forEach(product => {
        const category = product.dataset.category;
        if (selected === "all" || category === selected) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
};

// Оплата
const pay = () => {
    if (cart.length === 0) {
        alert("Корзина пуста!");
    } else {
        alert("Оплата прошла успешно! Спасибо за покупку!");
        cart = [];
	saveCart();
        renderCart();
    }
};

// Инициализация после загрузки страницы
document.addEventListener("DOMContentLoaded", () => {

    // Загрузка корзины из localStorage
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
        cart = JSON.parse(savedCart);
        renderCart();
    }

    // Обработчики для кнопок «Добавить в корзину»
    const addButtons = document.querySelectorAll(".add-to-cart");
    addButtons.forEach(button => {
        button.addEventListener("click", () => {
            const id = Number(button.dataset.id);
            const product = parks.find(p => p.id === id);
            if (product) {
                addToCart(product);
            }
        });
    });

    // Обработчик фильтра
    const filter = document.querySelector("#category-filter");
    filter.addEventListener("change", filterProducts);

    // Обработчик кнопки «Оплатить»
    const payButton = document.querySelector("#pay-button");
    payButton.addEventListener("click", pay);
});
