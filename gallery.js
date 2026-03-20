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

/**
 * Hàm hiển thị danh sách sản phẩm ra giao diện
 * @param {Array} data - Mảng các sản phẩm cần hiển thị
 */
function renderProducts(data) {
    // Xóa nội dung cũ
    productGrid.innerHTML = "";

    if (data.length === 0) {
        emptyState.style.display = "block";
        return;
    }

    emptyState.style.display = "none";

    // Duyệt qua mảng dữ liệu và tạo HTML cho từng sản phẩm
    data.forEach(product => {
        const card = document.createElement('div');
        card.className = "product-card";
        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <span class="badge">Sale</span>
            </div>
            <div class="product-info">
                <span class="category">${product.category}</span>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-footer">
                    <span class="price">${product.price.toLocaleString('vi-VN')}₫</span>
                    <button class="add-btn"><i class="fas fa-plus"></i></button>
                </div>
            </div>
        `;
        productGrid.appendChild(card);
    });
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
    
    // Cập nhật giao diện nút bấm
    filterButtons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');

    // Lọc dữ liệu
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
    let sorted = [...products]; // Tạo bản sao để không ảnh hưởng mảng gốc

    if (value === "price-low") {
        sorted.sort((a, b) => a.price - b.price);
    } else if (value === "price-high") {
        sorted.sort((a, b) => b.price - a.price);
    } else if (value === "name-az") {
        sorted.sort((a, b) => a.name.localeCompare(b.name));
    }

    renderProducts(sorted);
}

// Gán sự kiện (Event Listeners)
searchInput.addEventListener('input', handleSearch);

filterButtons.forEach(btn => {
    btn.addEventListener('click', handleFilter);
});

sortSelect.addEventListener('change', handleSort);

// Hiển thị sản phẩm lần đầu khi tải trang
renderProducts(products);
