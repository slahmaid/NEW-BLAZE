// Populate order summary from localStorage cart
function getCart() {
    try {
        return JSON.parse(localStorage.getItem('cart')) || [];
    } catch {
        return [];
    }
}

function renderOrderSummary() {
    const cart = getCart();
    const list = document.getElementById('order-summary-list');
    const totalSpan = document.getElementById('summary-total');
    list.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${item.name} x${item.quantity || 1}</span><span>${item.price * (item.quantity || 1)} Dh</span>`;
        list.appendChild(li);
        total += item.price * (item.quantity || 1);
    });
    totalSpan.textContent = total + ' Dh';
}

document.addEventListener('DOMContentLoaded', function() {
    renderOrderSummary();
    const form = document.getElementById('checkout-form');
    const successMsg = document.getElementById('checkout-success');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // Optionally, validate fields here
        // Simulate order placed
        localStorage.removeItem('cart');
        renderOrderSummary();
        form.reset();
        successMsg.style.display = 'block';
        setTimeout(() => {
            successMsg.style.display = 'none';
            window.location.href = 'index.html';
        }, 2500);
    });
}); 