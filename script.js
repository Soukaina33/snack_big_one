document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initScrollAnimations();
    initSmoothScroll();
    initMenuCardHover();
    initParallaxEffect();
    initHamburgerMenu();
    initMenuFiltering();
    initMenuAnimations();
    initCurrentYear();
    initButtonHoverEffects();
});

function initNavbar() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.padding = '15px 0';
            header.style.boxShadow = 'none';
        }
    });
}

function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    const slideElements = document.querySelectorAll('.slide-up');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                if (entry.target.classList.contains('featured-card')) {
                    const index = Array.from(slideElements).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(function(element) {
        observer.observe(element);
    });
    
    slideElements.forEach(function(element) {
        observer.observe(element);
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navLinks = document.querySelector('.nav-links');
                const hamburger = document.querySelector('.hamburger');
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initMenuCardHover() {
    const menuCards = document.querySelectorAll('.menu-item-card, .featured-card');
    
    menuCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
}

function initParallaxEffect() {
    const heroSection = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        
        heroSection.style.transform = `translate3d(0px, ${rate}px, 0px)`;
    });
}

function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
        
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }
}

function initMenuFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item-card');
    const menuContainer = document.getElementById('menu-items-container');
    
    if (!filterButtons.length || !menuItems.length || !menuContainer) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            menuContainer.classList.add('filtering');
            
            setTimeout(() => {
                if (filterValue === 'all') {
                    menuItems.forEach(item => {
                        item.style.display = 'flex';
                        item.style.animation = 'fadeInUp 0.6s ease forwards';
                    });
                } else {
                    menuItems.forEach(item => {
                        item.style.display = 'none';
                    });
                    
                    const filteredItems = document.querySelectorAll(`.menu-item-card[data-category="${filterValue}"]`);
                    filteredItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.display = 'flex';
                            item.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s forwards`;
                        }, 50);
                    });
                }
                
                setTimeout(() => {
                    menuContainer.classList.remove('filtering');
                }, 300);
                
            }, 150);
        });
    });
    
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 40px rgba(255, 140, 0, 0.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

function initMenuAnimations() {
    const menuItems = document.querySelectorAll('.menu-item-card');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    menuItems.forEach(item => {
        item.style.animationPlayState = 'paused';
        observer.observe(item);
    });
}

function initCurrentYear() {
    const currentYear = new Date().getFullYear();
    const copyrightElement = document.querySelector('.copyright');
    
    if (copyrightElement) {
        copyrightElement.textContent = copyrightElement.textContent.replace('2023', currentYear);
    }
}

function initButtonHoverEffects() {
    document.querySelectorAll('.btn, .filter-btn').forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (this.classList.contains('filter-btn')) {
                this.style.transform = 'translateY(-3px)';
            } else {
                this.style.transform = 'translateY(-5px)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

function orderViaWhatsApp(itemName) {
    const phoneNumber = '212643540399';
    const message = `Bonjour, je voudrais commander un ${itemName}.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank');
}