// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// Enhanced hover effects for interactive elements
const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-tag');

hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorFollower.style.backgroundColor = 'rgba(108, 99, 255, 0.2)';
        
        // Add magnetic effect
        element.addEventListener('mousemove', magneticEffect);
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.backgroundColor = 'transparent';
        
        // Remove magnetic effect
        element.removeEventListener('mousemove', magneticEffect);
        element.style.transform = 'translate(0, 0)';
    });
});

// Magnetic effect function
function magneticEffect(e) {
    const bound = this.getBoundingClientRect();
    const mouseX = e.clientX - bound.left;
    const mouseY = e.clientY - bound.top;
    const centerX = bound.width / 2;
    const centerY = bound.height / 2;
    
    const moveX = (mouseX - centerX) / 10;
    const moveY = (mouseY - centerY) / 10;
    
    this.style.transform = `translate(${moveX}px, ${moveY}px)`;
}

// Smooth Sticky Header with parallax effect
const header = document.querySelector('header');
let lastScrollY = window.scrollY;
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            if (window.scrollY > 100) {
                header.classList.add('sticky');
                
                if (lastScrollY < window.scrollY) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }
            } else {
                header.classList.remove('sticky');
            }
            
            // Add parallax effect to hero section
            const heroSection = document.querySelector('.hero');
            if (heroSection) {
                heroSection.style.transform = `translateY(${window.scrollY * 0.3}px)`;
            }
            
            lastScrollY = window.scrollY;
            ticking = false;
        });
        
        ticking = true;
    }
});

// Advanced Mobile Menu Toggle with animations
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.classList.toggle('active');
    document.body.classList.toggle('menu-open');
    
    if (menuToggle.classList.contains('active')) {
        menuToggle.querySelector('.bar:nth-child(1)').style.transform = 'rotate(45deg) translate(5px, 6px)';
        menuToggle.querySelector('.bar:nth-child(2)').style.opacity = '0';
        menuToggle.querySelector('.bar:nth-child(3)').style.transform = 'rotate(-45deg) translate(5px, -6px)';
        
        // Animate menu items
        const navItems = document.querySelectorAll('nav li');
        navItems.forEach((item, index) => {
            item.style.animation = `fadeInRight 0.5s forwards ${index * 0.1 + 0.3}s`;
        });
    } else {
        menuToggle.querySelector('.bar:nth-child(1)').style.transform = 'none';
        menuToggle.querySelector('.bar:nth-child(2)').style.opacity = '1';
        menuToggle.querySelector('.bar:nth-child(3)').style.transform = 'none';
        
        // Reset animations
        const navItems = document.querySelectorAll('nav li');
        navItems.forEach(item => {
            item.style.animation = '';
        });
    }
});

// Enhanced Smooth Scrolling with progress indicator
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = `${scrolled}%`;
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Add highlight animation to target section
            targetElement.classList.add('highlight');
            setTimeout(() => targetElement.classList.remove('highlight'), 1500);
            
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
                menuToggle.querySelector('.bar:nth-child(1)').style.transform = 'none';
                menuToggle.querySelector('.bar:nth-child(2)').style.opacity = '1';
                menuToggle.querySelector('.bar:nth-child(3)').style.transform = 'none';
            }
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Advanced Project Filtering with GSAP animations
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button with ripple effect
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        button.appendChild(ripple);
        setTimeout(() => ripple.remove(), 1000);
        
        const filterValue = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) rotate(0deg)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px) rotate(2deg)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Project Card 3D Hover Effect
projectCards.forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});

// Project Card Flip Effect
const detailsButtons = document.querySelectorAll('.project-details-btn');

detailsButtons.forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.project-card');
        card.classList.toggle('flipped');
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
});