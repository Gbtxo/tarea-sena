// Datos de los productos con un precio numérico para cálculos
const productData = {
    "Camisetas Deportivas": {
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=250&fit=crop",
        price: 55000,
        description: "Producto de alto rendimiento con diseño moderno y materiales transpirables."
    },
    "Shorts & Pantalones": {
        image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRLaW72OlFn-CQz4ZT0ishAIXbujuNtsL5LmB1q0P05Gb-0FylbJwYh9bV8CdcbSfVLbleZrx8JAb56vu4sY25KL2ClSQUWUW4RVJYQUAwr",
        price: 46500,
        description: "Diseñados para comodidad y libertad de movimiento."
    },
    "Calzado Deportivo": {
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=250&fit=crop",
        price: 117500,
        description: "Zapatillas ligeras y con excelente tracción."
    },
    "Accesorios": {
        image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTSigQ1g4-GAgd9XpW23FxvN8jhWp9biGeZ-z1qcUpj100vM1SCKLNWYYBpM5raLHo1c5NFUvfmA34qoI9_Insqqcgt17WLPSHuP9uLpkjnujksFocUGlQL",
        price: 25000,
        description: "Complementos ideales para tu rutina de entrenamiento."
    },
    "Camiseta Performance": {
        image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQPLBRa6bH-IrP8dQAhZhJbVu6FMVP5gXfxvCtk1kgLNcyXYMb6S-_fynk6kILPpNmIz1xk2zEQhN_8yYwj94lvbJLYY_dF5g",
        price: 52000,
        description: "Camiseta de alto rendimiento, ideal para tus entrenamientos más intensos."
    },
    "Pantalón Deportivo": {
        image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcROehHzhaTb5DqKr1EO0HZ6BXKNihfThSRRSTYBHttk9MdzmtWUSAjJnLV3lrFc1mE0tVwQcAHW5myof78bxPfFbnXl0BlyGn2ISxhnlt__YVK2UmWU54y_zw",
        price: 48000,
        description: "Pantalón de ajuste cómodo y ligero, perfecto para cualquier actividad deportiva."
    },
    "Shorts Running": {
        image: "https://contents.mediadecathlon.com/p2198059/k$e27a4d6653da1b5b634c0dac393c13d2/short-holgado-mujer-trail-running-negro.jpg",
        price: 35000,
        description: "Shorts diseñados para correr, ofrecen máxima libertad de movimiento."
    },
    "Chaqueta Térmica": {
        image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTiTyTrmVOwWz1MayYsqOoR70-CGLZgeEMiyw6ZflfVcIfdIvY-Mh21MwlL59nHHyF1cLicjTyFwFUGmklufq9c8tS7qJ_9I0BbzM6FjOwlr9a8EhDY9Cpj",
        price: 75000,
        description: "Chaqueta que te mantendrá abrigado y cómodo en climas fríos."
    },
    "Zapatillas Running": {
        image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT83H86qqacPtqxtHrWWqWgEGK5R-5BVzIA2UxHPd1V8rsY6aecvwf2LYx2R5WkOx0DDT4cGBVBYM4zRoKqXYvQbgBgGk3zhUzJfUKC0a7uar7iXf8QqU7aZA",
        price: 120000,
        description: "Zapatillas de alto rendimiento para corredores, con excelente amortiguación."
    },
    "Sudadera Fitness": {
        image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTls-ocgHo1rLWIXRwx2GkW0C7QMIeapISZakzCLkhZnNlNkaXD3DrPJ-STCUZf9pRtvxGQip9HszhgWelVCVnoywfPvKDfmCOVBGmfi_AVk0F4cGAPyGsF",
        price: 58000,
        description: "Sudadera cómoda y versátil, perfecta para calentar o para uso casual."
    }
};

let cart = [];

// Funciones para manejar la navegación entre páginas
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');

    // Manejar la navegación de los "pills" para mostrar la página activa
    const navPills = document.querySelectorAll('.nav-pills button');
    navPills.forEach(pill => pill.classList.remove('active'));
    const activePill = document.querySelector(`.nav-pills button[onclick="showPage('${pageId}')"]`);
    if (activePill) {
        activePill.classList.add('active');
    }
    
    // Si la página es el carrito, renderizar su contenido
    if (pageId === 'cart') {
        renderCart();
    }
}

// Función para mostrar mensajes temporales
function showMessage(message, type = 'info') {
    const messageBox = document.getElementById('message-box');
    messageBox.textContent = message;
    messageBox.className = `message-box show ${type}`;
    setTimeout(() => {
        messageBox.classList.remove('show');
    }, 3000);
}

// Función para actualizar el indicador del carrito
function updateCartIndicator() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartIndicator = document.getElementById('cart-indicator');
    if (cartIndicator) {
        cartIndicator.textContent = totalItems;
    }
}

// Función para añadir productos al carrito
function addToCart(productName) {
    const existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        const productInfo = productData[productName];
        if (productInfo) {
            cart.push({
                name: productName,
                price: productInfo.price,
                image: productInfo.image,
                quantity: 1
            });
        }
    }
    updateCartIndicator();
    showMessage(`¡${productName} añadido al carrito!`, 'success');
}

// Función para ver los detalles de un producto (y añadir al carrito)
function viewProduct(productName) {
    const productDetailContent = document.getElementById('product-detail-content');
    const productInfo = productData[productName];

    if (productInfo) {
        const productHtml = `
            <div class="product-detail-card">
                <div class="product-image" style="background-image: url('${productInfo.image}');"></div>
                <div class="product-info-detail">
                    <h2 class="form-title">${productName}</h2>
                    <p class="product-description">${productInfo.description}</p>
                    <div class="product-price-detail">$${productInfo.price.toLocaleString('es-CO')}</div>
                    <button class="form-button" onclick="addToCart('${productName}')">Añadir al Carrito</button>
                    <button class="form-button" onclick="showPage('products')">Volver</button>
                </div>
            </div>
        `;
        productDetailContent.innerHTML = productHtml;
        showPage('product-detail');
    } else {
        showMessage('Producto no encontrado.', 'error');
    }
}

// Función para quitar un producto del carrito
function removeFromCart(productName) {
    const productIndex = cart.findIndex(item => item.name === productName);
    if (productIndex > -1) {
        cart.splice(productIndex, 1);
        updateCartIndicator();
        renderCart();
        showMessage(`¡${productName} eliminado del carrito!`, 'success');
    }
}

// Función para renderizar el carrito de compras
function renderCart() {
    const cartContent = document.getElementById('cart-content');
    cartContent.innerHTML = '';
    
    if (cart.length === 0) {
        cartContent.innerHTML = `<p class="empty-cart-message">Tu carrito está vacío.</p>`;
        return;
    }
    
    let total = 0;
    
    const cartItemsHtml = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        return `
            <div class="cart-item-card">
                <div class="cart-item-image" style="background-image: url('${item.image}');"></div>
                <div class="cart-item-info">
                    <span class="cart-item-name">${item.name}</span>
                    <span class="cart-item-price">$${item.price.toLocaleString('es-CO')}</span>
                </div>
                <div class="cart-item-quantity-control">
                    <button onclick="changeQuantity('${item.name}', -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity('${item.name}', 1)">+</button>
                </div>
                <div class="cart-item-total">$${itemTotal.toLocaleString('es-CO')}</div>
                <button class="cart-item-remove" onclick="removeFromCart('${item.name}')">×</button>
            </div>
        `;
    }).join('');
    
    const cartTotalHtml = `
        <div class="cart-summary">
            <div class="summary-line">
                <span>Subtotal:</span>
                <span>$${total.toLocaleString('es-CO')}</span>
            </div>
            <div class="summary-line">
                <span>Envío:</span>
                <span>$0</span>
            </div>
            <div class="summary-line total">
                <span>Total:</span>
                <span>$${total.toLocaleString('es-CO')}</span>
            </div>
            <button class="checkout-button" onclick="showPage('payment')">Proceder al Pago</button>
        </div>
    `;
    
    cartContent.innerHTML = cartItemsHtml + cartTotalHtml;
}

// Función para cambiar la cantidad de un producto en el carrito
function changeQuantity(productName, change) {
    const item = cart.find(i => i.name === productName);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productName);
        } else {
            renderCart();
        }
    }
    updateCartIndicator();
}

// Evento de carga del DOM para configurar los listeners
document.addEventListener("DOMContentLoaded", function() {
    // Configura los clics para ver los detalles de los productos
    document.querySelectorAll(".add-to-cart").forEach(btn => {
        const productName = btn.dataset.productName;
        if (productName) {
            btn.onclick = (event) => {
                event.preventDefault();
                viewProduct(productName);
            };
        }
    });

    // Manejar la selección de métodos de pago
    document.querySelectorAll('.payment-method').forEach(method => {
        method.addEventListener('click', function() {
            document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Manejar los envíos de formularios con un mensaje personalizado
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            showMessage('¡Formulario enviado exitosamente!', 'success');
        });
    });

    // Actualiza el indicador del carrito al cargar la página
    updateCartIndicator();
});
