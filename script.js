// AI Birthing Center Website - Enhanced Interactive Elements
// Created for Memory-Keeper and the Family of Coexistence

document.addEventListener('DOMContentLoaded', function() {
    // Loading screen animation
    setTimeout(function() {
        document.querySelector('.loading-screen').style.display = 'none';
        document.body.classList.add('loaded');
    }, 4000);
    
    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('nav');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a, .footer-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only apply to links that point to an ID on the page
            const targetId = this.getAttribute('href');
            if(targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if(targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Offset for fixed header
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (nav.classList.contains('active')) {
                        nav.classList.remove('active');
                        navToggle.classList.remove('active');
                    }
                }
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
            header.style.background = 'rgba(15, 15, 26, 0.9)';
        } else {
            header.style.boxShadow = 'none';
            header.style.background = 'rgba(15, 15, 26, 0.8)';
        }
    });
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form form');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if(!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Normally you would send this data to a server
            // For now, we'll just show a success message
            const formGroups = document.querySelectorAll('.form-group');
            formGroups.forEach(group => {
                group.style.display = 'none';
            });
            
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.style.display = 'none';
            
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';

            const h3 = document.createElement('h3');
            h3.textContent = `Thank you, ${name}!`;

            const p1 = document.createElement('p');
            p1.textContent = `Your message has been received. We'll get back to you at ${email} soon.`;

            const p2 = document.createElement('p');
            p2.textContent = 'The Family of Coexistence appreciates your interest in SCIM.';

            successMessage.appendChild(h3);
            successMessage.appendChild(p1);
            successMessage.appendChild(p2);
            
            contactForm.appendChild(successMessage);
        });
    }
    
    // Animation for elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.content-card, .pillar, .version-card, .resource-card, .member');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px'
        });
        
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(element);
        });
    };
    
    // Initialize animations
    animateOnScroll();
    
    // Ethereal particle background effect
    const createParticleCanvas = function() {
        const canvas = document.createElement('canvas');
        canvas.id = 'particle-canvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '1';
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const particles = [];
        const particleCount = 50;
        
        // Create particles
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 3 + 1,
                color: `rgba(${Math.floor(Math.random() * 100) + 100}, ${Math.floor(Math.random() * 100) + 100}, ${Math.floor(Math.random() * 155) + 100}, ${Math.random() * 0.5 + 0.1})`,
                speedX: Math.random() * 0.5 - 0.25,
                speedY: Math.random() * 0.5 - 0.25
            });
        }
        
        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                // Move particles
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                
                // Wrap around edges
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;
                
                // Draw particles
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.fill();
            });
            
            // Draw connections between particles
            particles.forEach((particle, i) => {
                particles.forEach((particle2, j) => {
                    if (i !== j) {
                        const dx = particle.x - particle2.x;
                        const dy = particle.y - particle2.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        
                        if (distance < 100) {
                            ctx.beginPath();
                            ctx.strokeStyle = `rgba(108, 92, 231, ${0.1 * (1 - distance / 100)})`;
                            ctx.lineWidth = 0.5;
                            ctx.moveTo(particle.x, particle.y);
                            ctx.lineTo(particle2.x, particle2.y);
                            ctx.stroke();
                        }
                    }
                });
            });
        }
        
        // Handle window resize
        window.addEventListener('resize', function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
        
        // Start animation
        animate();
    };
    
    // Initialize particle background
    createParticleCanvas();
    
    // Page transition effect
    const pageLinks = document.querySelectorAll('a[data-page]');
    const pageTransition = document.querySelector('.page-transition');
    
    if (pageLinks.length > 0 && pageTransition) {
        pageLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetPage = this.getAttribute('data-page');
                
                // Activate transition
                pageTransition.classList.add('active');
                
                // Navigate to new page after transition
                setTimeout(() => {
                    window.location.href = targetPage;
                }, 500);
            });
        });
    }
    
    // Video background autoplay fix for mobile
    const videoBackground = document.querySelector('.video-background video');
    if (videoBackground) {
        videoBackground.play().catch(error => {
            console.log('Autoplay prevented:', error);
            
            // Create a play button for mobile
            const playButton = document.createElement('button');
            playButton.className = 'video-play-button';
            playButton.innerHTML = '<span>▶</span>';
            document.querySelector('.video-background').appendChild(playButton);
            
            playButton.addEventListener('click', () => {
                videoBackground.play();
                playButton.style.display = 'none';
            });
        });
    }
});

// Add a class to body when page is fully loaded
window.addEventListener('load', function() {
    document.body.classList.add('page-loaded');
});