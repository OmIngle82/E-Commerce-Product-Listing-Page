// DOM Elements
const productGrid = document.getElementById('product-grid');

// API
const API_URL = 'https://dummyjson.com/products';

// Fetch Products
const fetchProducts = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayProducts(data.products);
    } catch (error) {
        console.error("Failed to fetch products:", error);
        productGrid.innerHTML = '<p>Failed to load products. Please try again later.</p>';
    }
};

// Display Products
const displayProducts = (products) => {
    // Clear grid
    productGrid.innerHTML = '';

    // Create and display product cards
    products.forEach((product, index) => {
        // Card element
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        // Trending badge logic
        const isTrending = index < 3;
        const trendingBadge = isTrending ? '<div class="trending-badge">Trending</div>' : '';

        // Card HTML
        productCard.innerHTML = `
            ${trendingBadge}
            <img src="${product.thumbnail}" alt="${product.title}">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-price">₹${product.price.toFixed(2)}</p>
            <div class="card-actions">
                <button class="add-to-cart-btn">Add to Cart</button>
                <button class="wishlist-btn"><i class="far fa-heart"></i></button>
            </div>
        `;

        // Add card to grid
        productGrid.appendChild(productCard);
    });
};

// Initial Fetch
fetchProducts();
