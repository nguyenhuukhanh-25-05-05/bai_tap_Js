/**
 * Dữ liệu sản phẩm mẫu để luyện tập JavaScript
 */
const products = [
    { id: 1, name: "Tai nghe Không dây Pro", category: "Electronics", price: 1200000, image: "https://via.placeholder.com/150?text=Headphones" },
    { id: 2, name: "Áo sơ mi Oxford", category: "Fashion", price: 450000, image: "https://via.placeholder.com/150?text=Shirt" },
    { id: 3, name: "Đèn bàn thông minh", category: "Home", price: 850000, image: "https://via.placeholder.com/150?text=Lamp" },
    { id: 4, name: "Bàn phím Cơ RGB", category: "Electronics", price: 1500000, image: "https://via.placeholder.com/150?text=Keyboard" },
    { id: 5, name: "Đồng hồ thông minh", category: "Electronics", price: 2100000, image: "https://via.placeholder.com/150?text=Watch" },
    { id: 6, name: "Giày Sneaker Thời trang", category: "Fashion", price: 950000, image: "https://via.placeholder.com/150?text=Sneakers" },
    { id: 7, name: "Máy pha cà phê", category: "Home", price: 3200000, image: "https://via.placeholder.com/150?text=Coffee+Maker" },
    { id: 8, name: "Ốp lưng iPhone Cao cấp", category: "Fashion", price: 250000, image: "https://via.placeholder.com/150?text=Phone+Case" },
];

// Các thành phần DOM
const productGrid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.btn-filter');
const sortSelect = document.getElementById('sortSelect');
const emptyState = document.getElementById('emptyState');

// DOM cho Giỏ hàng
const cartToggle = document.getElementById('cartToggle');
const closeCart = document.getElementById('closeCart');
const cartSidebar = document.getElementById('cartSidebar');
const overlay = document.getElementById('overlay');
const cartItemsContainer = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');

// DOM cho Modal
const productModal = document.getElementById('productModal');
const closeModal = document.getElementById('closeModal');
const modalBody = document.getElementById('modalBody');

// Khởi tạo giỏ hàng từ LocalStorage
let cart = JSON.parse(localStorage.getItem('productCart')) || [];

/**
 * Hàm hiển thị danh sách sản phẩm ra giao diện
 * @param {Array} data - Mảng các sản phẩm cần hiển thị
 */
function renderProducts(data) {
    productGrid.innerHTML = "";

    if (data.length === 0) {
        emptyState.style.display = "block";
        return;
    }

    emptyState.style.display = "none";

    data.forEach(product => {
        const card = document.createElement('div');
        card.className = "product-card";
        card.innerHTML = `
            <div class="product-image" onclick="showProductDetails(${product.id})">
                <img src="${product.image}" alt="${product.name}">
                <span class="badge">Sale</span>
            </div>
            <div class="product-info">
                <span class="category">${product.category}</span>
                <h3 class="product-name" onclick="showProductDetails(${product.id})" style="cursor:pointer">${product.name}</h3>
                <div class="product-footer">
                    <span class="price">${product.price.toLocaleString('vi-VN')}₫</span>
                    <button class="add-btn" onclick="addToCart(${product.id})"><i class="fas fa-plus"></i></button>
                </div>
            </div>
        `;
        productGrid.appendChild(card);
    });
}

/**
 * Logic Giỏ hàng
 */
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    updateCartUI();
    
    // Hiệu ứng mở giỏ hàng khi thêm sản phẩm
    toggleCart(true);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

function saveCart() {
    localStorage.setItem('productCart', JSON.stringify(cart));
}

function updateCartUI() {
    // Cập nhật số lượng trên icon
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerText = totalItems;

    // Render danh sách trong sidebar
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        const itemEl = document.createElement('div');
        itemEl.className = "cart-item";
        itemEl.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${item.price.toLocaleString('vi-VN')}₫ x ${item.quantity}</div>
                <div class="remove-item" onclick="removeFromCart(${item.id})">Xóa</div>
            </div>
        `;
        cartItemsContainer.appendChild(itemEl);
    });

    cartTotal.innerText = total.toLocaleString('vi-VN') + "₫";
}

function toggleCart(show) {
    if (show) {
        cartSidebar.classList.add('active');
        overlay.classList.add('active');
    } else {
        cartSidebar.classList.remove('active');
        overlay.classList.remove('active');
    }
}

/**
 * Logic Modal Chi tiết
 */
window.showProductDetails = function(productId) {
    const product = products.find(p => p.id === productId);
    modalBody.innerHTML = `
        <div style="display: flex; gap: 2rem; align-items: center; flex-wrap: wrap;">
            <div style="flex: 1; min-width: 300px; background: #f1f5f9; padding: 2rem; border-radius: 16px;">
                <img src="${product.image}" alt="${product.name}" style="width: 100%; object-fit: contain;">
            </div>
            <div style="flex: 1; min-width: 300px;">
                <span class="category">${product.category}</span>
                <h2 style="font-size: 2rem; margin-bottom: 1rem;">${product.name}</h2>
                <p style="color: var(--text-muted); margin-bottom: 2rem; line-height: 1.6;">
                    Đây là mô tả chi tiết cho sản phẩm ${product.name}. Sản phẩm tuyệt vời này giúp bạn nâng cao chất lượng cuộc sống và phong cách cá nhân.
                </p>
                <div style="font-size: 2rem; font-weight: 700; color: var(--primary); margin-bottom: 2rem;">
                    ${product.price.toLocaleString('vi-VN')}₫
                </div>
                <button class="checkout-btn" onclick="addToCart(${product.id}); closeProductModal();">
                    Thêm vào giỏ hàng
                </button>
            </div>
        </div>
    `;
    productModal.classList.add('active');
    overlay.classList.add('active');
}

window.closeProductModal = function() {
    productModal.classList.remove('active');
    if (!cartSidebar.classList.contains('active')) {
        overlay.classList.remove('active');
    }
}

/**
 * Logic Tìm kiếm sản phẩm
 */
function handleSearch() {
    const term = searchInput.value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(term));
    renderProducts(filtered);
}

/**
 * Logic Lọc theo danh mục
 */
function handleFilter(e) {
    const category = e.target.dataset.category;
    filterButtons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');

    if (category === "all") {
        renderProducts(products);
    } else {
        const filtered = products.filter(p => p.category === category);
        renderProducts(filtered);
    }
}

/**
 * Logic Sắp xếp sản phẩm
 */
function handleSort() {
    const value = sortSelect.value;
    let sorted = [...products];

    if (value === "price-low") {
        sorted.sort((a, b) => a.price - b.price);
    } else if (value === "price-high") {
        sorted.sort((a, b) => b.price - a.price);
    } else if (value === "name-az") {
        sorted.sort((a, b) => a.name.localeCompare(b.name));
    }

    renderProducts(sorted);
}

// Gán sự kiện
searchInput.addEventListener('input', handleSearch);
filterButtons.forEach(btn => btn.addEventListener('click', handleFilter));
sortSelect.addEventListener('change', handleSort);

cartToggle.addEventListener('click', () => toggleCart(true));
closeCart.addEventListener('click', () => toggleCart(false));
overlay.addEventListener('click', () => {
    toggleCart(false);
    closeProductModal();
});
closeModal.addEventListener('click', closeProductModal);

// Khởi tạo
renderProducts(products);
updateCartUI();
