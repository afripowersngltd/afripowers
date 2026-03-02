document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenu.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
    
    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }
    
    function startSlider() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    function stopSlider() {
        clearInterval(slideInterval);
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopSlider();
            showSlide(index);
            startSlider();
        });
    });
    
    startSlider();
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
        }
    });
    
    // Scroll to top button
    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
        
        // Format WhatsApp message
        let message = `*New Inquiry from Website*%0A%0A`;
        message += `*Name:* ${data.name}%0A`;
        message += `*Phone:* ${data.phone}%0A`;
        if (data.email) message += `*Email:* ${data.email}%0A`;
        message += `*Interest:* ${data.subject}%0A`;
        message += `*Message:* ${data.message}`;
        
        // Redirect to WhatsApp with pre-filled message
        const whatsappUrl = `https://wa.me/2348035387392?text=${message}`;
        window.open(whatsappUrl, '_blank');
        
        // Show success message
        alert('Thank you! You will be redirected to WhatsApp to send your message.');
        this.reset();
    });
    
    // Animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Add animation styles to elements
    const animateElements = document.querySelectorAll('.product-card, .service-card, .why-us-card, .stat-card, .contact-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});
