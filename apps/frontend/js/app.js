class ProductRenderer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    async loadProducts() {
        try {
            const response = await fetch('/api/products');
            const products = await response.json();
            this.render(products);
        } catch (error) {
            console.error('Помилка завантаження товарів:', error);
            this.container.innerHTML = '<p>Помилка сервера. Спробуйте пізніше.</p>';
        }
    }

    render(products) {
        this.container.innerHTML = products.map(product => `
            <article class="product-card" itemscope itemtype="https://schema.org/Product">
                <div class="badge ${product.in_stock ? 'badge-in' : 'badge-out'}">
                    ${product.in_stock ? 'Є в наявності' : 'Немає'}
                </div>
                <h2 itemprop="name">${product.name}</h2>
                <span class="price-text" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
                    <span itemprop="price" content="${product.min_price}">${product.min_price}</span> UAH
                </span>
                <button class="btn-buy">Купити</button>
            </article>
        `).join('');
    }
}

// Ініціалізація
document.addEventListener('DOMContentLoaded', () => {
    const app = new ProductRenderer('product-list');
    app.loadProducts();
});