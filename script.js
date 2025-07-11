document.addEventListener('DOMContentLoaded', function() {
    // Mobile Slider Functionality (only on homepage)
    const sliderTrack = document.querySelector('.slider-track');
    const dots = document.querySelectorAll('.dot');
    const slides = document.querySelectorAll('.slider-slide');
    
    // Only initialize slider if elements exist (homepage)
    if (sliderTrack && dots.length > 0 && slides.length > 0) {
        let currentSlide = 0;
        let isDragging = false;
        let startPos = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;
        
        // Initialize slider
        function initSlider() {
            if (window.innerWidth <= 768) {
                updateSlider();
            }
        }
        
        // Update slider position
        function updateSlider() {
            const slideWidth = 100;
            sliderTrack.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
            updateDots();
        }
        
        // Update active dot
        function updateDots() {
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }
        
        // Go to specific slide
        function goToSlide(index) {
            if (index >= 0 && index < slides.length) {
                currentSlide = index;
                updateSlider();
            }
        }
        
        // Next slide
        function nextSlide() {
            goToSlide(currentSlide + 1);
        }
        
        // Previous slide
        function prevSlide() {
            goToSlide(currentSlide - 1);
        }
        
        // Touch events for mobile slider
        function touchStart(e) {
            if (window.innerWidth > 768) return;
            
            isDragging = true;
            startPos = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
            sliderTrack.style.transition = 'none';
        }
        
        function touchMove(e) {
            if (!isDragging || window.innerWidth > 768) return;
            
            e.preventDefault();
            const currentPosition = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
            const diff = currentPosition - startPos;
            const slideWidth = sliderTrack.offsetWidth;
            const movePercent = (diff / slideWidth) * 100;
            
            currentTranslate = prevTranslate + movePercent;
            sliderTrack.style.transform = `translateX(calc(-${currentSlide * 100}% + ${movePercent}%))`;
        }
        
        function touchEnd() {
            if (!isDragging || window.innerWidth > 768) return;
            
            isDragging = false;
            sliderTrack.style.transition = 'transform 0.3s ease';
            
            const slideWidth = sliderTrack.offsetWidth;
            const diff = currentTranslate - prevTranslate;
            const threshold = slideWidth * 0.3;
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0 && currentSlide > 0) {
                    prevSlide();
                } else if (diff < 0 && currentSlide < slides.length - 1) {
                    nextSlide();
                } else {
                    updateSlider();
                }
            } else {
                updateSlider();
            }
            
            prevTranslate = currentTranslate;
        }
        
        // Event listeners for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
        });
        
        // Touch event listeners
        sliderTrack.addEventListener('touchstart', touchStart, { passive: false });
        sliderTrack.addEventListener('touchmove', touchMove, { passive: false });
        sliderTrack.addEventListener('touchend', touchEnd);
        
        // Mouse event listeners for desktop testing
        sliderTrack.addEventListener('mousedown', touchStart);
        sliderTrack.addEventListener('mousemove', touchMove);
        sliderTrack.addEventListener('mouseup', touchEnd);
        sliderTrack.addEventListener('mouseleave', touchEnd);
        
        // Prevent context menu on right click
        sliderTrack.addEventListener('contextmenu', (e) => e.preventDefault());
        
        // Auto-slide functionality (optional)
        let autoSlideInterval;
        
        function startAutoSlide() {
            if (window.innerWidth <= 768) {
                autoSlideInterval = setInterval(() => {
                    if (currentSlide < slides.length - 1) {
                        nextSlide();
                    } else {
                        goToSlide(0);
                    }
                }, 5000);
            }
        }
        
        function stopAutoSlide() {
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
            }
        }
        
        // Pause auto-slide on hover/touch
        sliderTrack.addEventListener('mouseenter', stopAutoSlide);
        sliderTrack.addEventListener('mouseleave', startAutoSlide);
        sliderTrack.addEventListener('touchstart', stopAutoSlide);
        sliderTrack.addEventListener('touchend', startAutoSlide);
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (window.innerWidth <= 768) {
                if (e.key === 'ArrowLeft') {
                    prevSlide();
                } else if (e.key === 'ArrowRight') {
                    nextSlide();
                }
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                stopAutoSlide();
                sliderTrack.style.transform = 'none';
                sliderTrack.style.transition = 'none';
            } else {
                updateSlider();
                startAutoSlide();
            }
        });
        
        // Initialize
        initSlider();
        startAutoSlide();
    }
    
    // Hamburger menu functionality
    const hamburgerMenu = document.querySelector('#hamburger-menu');
    const dropdownMenu = document.querySelector('#dropdown-menu');
    
    // Only initialize menu if elements exist
    if (hamburgerMenu && dropdownMenu) {
        let isMenuOpen = false;

        hamburgerMenu.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            
            if (isMenuOpen) {
                dropdownMenu.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            } else {
                dropdownMenu.classList.remove('active');
                document.body.style.overflow = ''; // Restore scrolling
            }
        });

        // Close menu when clicking on menu items
        const menuLinks = document.querySelectorAll('.nav-list a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                isMenuOpen = false;
                dropdownMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        dropdownMenu.addEventListener('click', (e) => {
            if (e.target === dropdownMenu) {
                isMenuOpen = false;
                dropdownMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isMenuOpen) {
                isMenuOpen = false;
                dropdownMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Cart Functionality
    const cartIcon = document.querySelector('#cart-icon');
    const cartDropdown = document.querySelector('#cart-dropdown');
    const closeCart = document.querySelector('#close-cart');
    const cartItems = document.querySelector('#cart-items');
    const cartCount = document.querySelector('#cart-count');
    const cartTotal = document.querySelector('#cart-total');
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    const orderNowBtns = document.querySelectorAll('.order-now-btn');
    const checkoutBtn = document.querySelector('.checkout-btn');

    let cart = [];

    // Only initialize cart if elements exist
    if (cartIcon && cartDropdown && closeCart && cartItems && cartCount && cartTotal) {
        // Open cart
        cartIcon.addEventListener('click', () => {
            cartDropdown.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        // Close cart
        closeCart.addEventListener('click', () => {
            cartDropdown.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Close cart when clicking outside
        cartDropdown.addEventListener('click', (e) => {
            if (e.target === cartDropdown) {
                cartDropdown.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

    // Add to cart functionality
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const product = btn.getAttribute('data-product');
            const price = parseInt(btn.getAttribute('data-price'));
            
            const existingItem = cart.find(item => item.name === product);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    name: product,
                    price: price,
                    quantity: 1
                });
            }
            
            updateCart();
            cartDropdown.classList.add('active');
            document.body.style.overflow = 'hidden';
            // Save cart to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
        });
    });

    // Order now functionality
    orderNowBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const product = btn.getAttribute('data-product');
            const price = parseInt(btn.getAttribute('data-price'));
            
            // Clear cart and add single item
            cart = [{
                name: product,
                price: price,
                quantity: 1
            }];
            
            updateCart();
            // Save cart to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            // Redirect to checkout
            window.location.href = 'checkout.html';
        });
    });

    // Update cart display
    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;
        
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <div class="cart-item-price">${item.price} Dh × ${item.quantity}</div>
                </div>
                <button class="remove-item" data-index="${index}">×</button>
            `;
            cartItems.appendChild(cartItem);
        });
        
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartTotal.textContent = `${total} Dh`;
    }

    // Remove item from cart
    cartItems.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item')) {
            const index = parseInt(e.target.getAttribute('data-index'));
            cart.splice(index, 1);
            updateCart();
        }
    });

    // Checkout functionality
    checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            // Save cart to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            // Redirect to checkout
            window.location.href = 'checkout.html';
        }
    });

    // Close cart on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && cartDropdown.classList.contains('active')) {
            cartDropdown.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    }
}); 