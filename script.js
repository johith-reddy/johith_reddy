const apiURL = 'https://fakestoreapi.com/products';
let cart = [];
let wishlist = [];
let totalPrice = 0;

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
});

function fetchProducts() {
    fetch(apiURL)
        .then(response => response.json())
        .then(products => displayProducts(products))
        .catch(error => console.error('Error fetching products:', error));
}

function displayProducts(products) {
    const productsContainer = document.getElementById('products-container');
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>Price: $${product.price}</p>
            <button onclick="addToCart(${product.id}, '${product.title}', ${product.price}, '${product.image}')">Add to Cart</button>
            <span class="heart" onclick="toggleWishlistItem(${product.id}, '${product.title}', ${product.price}, '${product.image}')">&#10084;</span>
        `;
        productsContainer.appendChild(productCard);
    });
}

function addToCart(id, title, price, image) {
    const item = { id, title, price, image };
    cart.push(item);
    totalPrice += price;
    showNotification(`${title} has been added to the cart!`);
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<img src="${item.image}" alt="${item.title}" style="width: 50px;"> ${item.title} - $${item.price}`;
        cartItems.appendChild(li);
    });
    document.getElementById('total-price').innerText = totalPrice.toFixed(2);
}

function toggleCart() {
    const cartElement = document.getElementById('cart');
    const wishlistElement = document.getElementById('wishlist');
    
    // Hide wishlist if cart is shown
    if (wishlistElement.style.display === 'block') {
        wishlistElement.style.display = 'none';
    }

    if (cartElement.style.display === 'block') {
        cartElement.style.display = 'none'; // Hide cart if visible
    } else {
        updateCartDisplay();
        cartElement.style.display = 'block'; // Show cart if hidden
    }
}

function toggleWishlist() {
    const wishlistElement = document.getElementById('wishlist');
    const cartElement = document.getElementById('cart');

    // Hide cart if wishlist is shown
    if (cartElement.style.display === 'block') {
        cartElement.style.display = 'none';
    }

    if (wishlistElement.style.display === 'block') {
        wishlistElement.style.display = 'none'; // Hide wishlist if visible
    } else {
        updateWishlistDisplay();
        wishlistElement.style.display = 'block'; // Show wishlist if hidden
    }
}

function toggleWishlistItem(id, title, price, image) {
    // Add or remove item from wishlist
    const item = { id, title, price, image };
    const exists = wishlist.find(wishItem => wishItem.id === id);

    if (!exists) {
        wishlist.push(item);
        showNotification(`${title} has been added to the wishlist!`);
    } else {
        wishlist = wishlist.filter(wishItem => wishItem.id !== id);
        showNotification(`${title} has been removed from the wishlist!`);
    }
    
    updateWishlistDisplay();
}

function updateWishlistDisplay() {
    const wishlistItems = document.getElementById('wishlist-items');
    wishlistItems.innerHTML = '';
    wishlist.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<img src="${item.image}" alt="${item.title}" style="width: 50px;"> ${item.title} - $${item.price}`;
        wishlistItems.appendChild(li);
    });
}

function checkout() {
    alert(`Your total is $${totalPrice.toFixed(2)}. Thank you for your purchase!`);
    cart = [];
    totalPrice = 0;
    updateCartDisplay();
    document.getElementById('cart').style.display = 'none';
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.innerText = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}
