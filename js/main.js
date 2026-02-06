// Main JavaScript for Grocery Website

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    
    // Add smooth scrolling to all links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.f4');
    if (newsletterForm) {
        const subscribeBtn = newsletterForm.querySelector('.but1');
        const emailInput = newsletterForm.querySelector('.newsletter-input');
        
        if (subscribeBtn && emailInput) {
            subscribeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const email = emailInput.value.trim();
                
                if (email && validateEmail(email)) {
                    alert('Thank you for subscribing! You will receive updates at ' + email);
                    emailInput.value = '';
                } else {
                    alert('Please enter a valid email address');
                }
            });
        }
    }

    // Add to cart functionality
    const cartButtons = document.querySelectorAll('.button');
    cartButtons.forEach(button => {
        if (button.textContent.includes('Add To Cart')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const productName = this.closest('.veg').querySelector('h2').textContent;
                alert(productName + ' has been added to your cart!');
                
                // Add animation
                this.style.backgroundColor = '#28a745';
                this.textContent = 'Added!';
                
                setTimeout(() => {
                    this.style.backgroundColor = '';
                    this.textContent = 'Add To Cart';
                }, 2000);
            });
        }
    });

    // Shopping cart counter animation
    const cartIcon = document.querySelector('.fa-cart-shopping');
    if (cartIcon) {
        cartIcon.parentElement.style.position = 'relative';
    }

    // Search functionality
    const searchIcon = document.querySelector('.fa-magnifying-glass');
    if (searchIcon) {
        searchIcon.addEventListener('click', function() {
            const searchTerm = prompt('What are you looking for?');
            if (searchTerm) {
                alert('Searching for: ' + searchTerm);
                // Here you would implement actual search functionality
            }
        });
    }

    // Scroll to top button
    createScrollToTopButton();

    // Add active class to current page in navigation
    highlightCurrentPage();

    // Animate elements on scroll
    animateOnScroll();
});

// Email validation function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Create scroll to top button
function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background-color: #ff8c00;
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        z-index: 1000;
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        transition: all 0.3s ease;
    `;

    document.body.appendChild(scrollBtn);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    });

    // Scroll to top on click
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover effect
    scrollBtn.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#e67e00';
        this.style.transform = 'scale(1.1)';
    });

    scrollBtn.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#ff8c00';
        this.style.transform = 'scale(1)';
    });
}

// Highlight current page in navigation
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.header2 a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.fresh, .veg, .cat, .Customer, .blog');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(element => {
        observer.observe(element);
    });
}

// Handle responsive menu (for future mobile implementation)
function createMobileMenu() {
    const header = document.querySelector('header');
    const nav = document.querySelector('.header2');
    
    // Create hamburger menu button
    const menuBtn = document.createElement('button');
    menuBtn.className = 'mobile-menu-btn';
    menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    menuBtn.style.display = 'none';
    
    // Toggle menu on click
    menuBtn.addEventListener('click', function() {
        nav.classList.toggle('mobile-active');
    });
    
    header.insertBefore(menuBtn, nav);
}

// Cart management (basic implementation)
let cart = [];

function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    updateCartCount();
    saveCart();
}

function updateCartCount() {
    const cartIcon = document.querySelector('.fa-cart-shopping');
    if (cartIcon && cart.length > 0) {
        let badge = cartIcon.parentElement.querySelector('.cart-badge');
        if (!badge) {
            badge = document.createElement('span');
            badge.className = 'cart-badge';
            badge.style.cssText = `
                position: absolute;
                top: -5px;
                right: -5px;
                background-color: #dc143c;
                color: white;
                border-radius: 50%;
                padding: 2px 6px;
                font-size: 12px;
                font-weight: bold;
            `;
            cartIcon.parentElement.appendChild(badge);
        }
        badge.textContent = cart.length;
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

// Load cart on page load
loadCart();

console.log('Grocery Website JavaScript Loaded Successfully!');
