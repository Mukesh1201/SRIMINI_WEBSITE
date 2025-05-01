
       /* ===== MAIN NAVIGATION ACTIVE STATE HANDLER ===== */
document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll(".nav-link"); // Changed from .nav_links
    const sections = document.querySelectorAll("section");
    
    // Click event for smooth scrolling and active state
    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            navLinks.forEach(nav => nav.classList.remove("active"));
            this.classList.add("active");
            
            const targetId = this.getAttribute("href");
            if (targetId && targetId.startsWith("#")) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: "smooth"
                    });
                }
            }
        });
    });
    
    // Scroll event to update active nav item
    window.addEventListener("scroll", function() {
        let currentSection = "";
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute("id");
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    });
});
        
        /* ===== COURSE CARD HOVER EFFECTS ===== */
        // This adds hover animations to course cards
        document.addEventListener("DOMContentLoaded", function() {
            const courseCards = document.querySelectorAll('.course-card');
            
            courseCards.forEach(card => {
                const image = card.querySelector('.glow-image');
                
                card.addEventListener('mouseenter', () => {
                    if (image) {
                        image.style.transform = 'scale(1.05)';
                        image.style.filter = 'brightness(1.05) saturate(1.1)';
                    }
                });
                
                card.addEventListener('mouseleave', () => {
                    if (image) {
                        image.style.transform = 'scale(1)';
                        image.style.filter = 'brightness(1) saturate(1)';
                    }
                });
            });
            
            // Animation on scroll for course cards
            function animateOnScroll() {
                courseCards.forEach(card => {
                    const cardPosition = card.getBoundingClientRect().top;
                    const scrollPosition = window.innerHeight + window.scrollY;
                    
                    if (scrollPosition > cardPosition) {
                        card.classList.add('animate__fadeIn');
                    }
                });
            }
            
            window.addEventListener('scroll', animateOnScroll);
            animateOnScroll(); // Run once on load
        });
        
        /* ===== 3D GALLERY CAROUSEL ===== */
        // This handles the interactive 3D gallery carousel
        document.addEventListener("DOMContentLoaded", function() {
            const rings = document.querySelectorAll('.ring');
            let xPos = 0;
            const imageSpacing = 60;
            let isDragging = false;
            
            // Initialize each gallery ring
            rings.forEach(ring => {
                gsap.set(ring, { 
                    rotationY: 180,
                    cursor: 'grab'
                });
                
                const images = ring.querySelectorAll('.img');
                gsap.set(images, {
                    rotateY: (i) => i * -22.5,
                    transformOrigin: '50% 50% ' + (600 + imageSpacing) + 'px',
                    z: - (600 + imageSpacing),
                    backfaceVisibility: 'hidden'
                });
                
                // Entrance animation
                gsap.from(images, {
                    duration: 1.8,
                    y: 250,
                    opacity: 0,
                    stagger: 0.08,
                    ease: 'expo.out'
                });

                // Set all images to be fully visible
gsap.set(images, { opacity: 1 });

// Remove hover effects completely
images.forEach(img => {
    img.style.pointerEvents = 'none'; // Disable hover interactions
});
                
                // Hover effects for images
                // images.forEach(img => {
                //     img.addEventListener('mouseenter', () => {
                //         gsap.to(img, { 
                //             scale: 1.1,
                //             zIndex: 100,
                //             boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9)',
                //             duration: 0.3
                //         });
                //         gsap.to(images, { 
                //             opacity: (i, t) => (t === img) ? 1 : 0.3, 
                //             duration: 0.5
                //         });
                //     });
                    
                //     img.addEventListener('mouseleave', () => {
                //         gsap.to(img, { 
                //             scale: 1,
                //             zIndex: 1,
                //             boxShadow: '0 15px 40px rgba(0, 0, 0, 0.6)',
                //             duration: 0.5
                //         });
                //         gsap.to(images, { 
                //             opacity: 1, 
                //             duration: 0.7
                //         });
                //     });
                // });
            });
            
            // Drag functionality
            function dragStart(e) {
                isDragging = true;
                xPos = e.clientX || e.touches[0].clientX;
                gsap.set('.ring', { cursor: 'grabbing' });
                document.addEventListener('mousemove', drag);
                document.addEventListener('touchmove', drag);
            }
            
            function drag(e) {
                if (!isDragging) return;
                const clientX = e.clientX || e.touches[0].clientX;
                const deltaX = clientX - xPos;
                
                rings.forEach(ring => {
                    gsap.to(ring, {
                        rotationY: '-=' + (deltaX % 360),
                        onUpdate: updateBgPos
                    });
                });
                
                xPos = clientX;
            }
            
            function dragEnd() {
                isDragging = false;
                gsap.set('.ring', { cursor: 'grab' });
                document.removeEventListener('mousemove', drag);
                document.removeEventListener('touchmove', drag);
            }
            
            function updateBgPos() {
                rings.forEach(ring => {
                    const rotationY = gsap.getProperty(ring, 'rotationY');
                    const images = ring.querySelectorAll('.img');
                    
                    images.forEach((img, i) => {
                        const bgPos = (100 - gsap.utils.wrap(0, 360, rotationY - 180 - i * 22.5) / 360 * (600 + imageSpacing)) + 'px 0px';
                        img.style.backgroundPosition = bgPos;
                    });
                });
            }
            
            // Event listeners for drag
            document.addEventListener('mousedown', dragStart);
            document.addEventListener('touchstart', dragStart);
            document.addEventListener('mouseup', dragEnd);
            document.addEventListener('touchend', dragEnd);
        });
        
        /* ===== MOBILE MENU TOGGLE ===== */
        // This handles the mobile menu functionality
        document.addEventListener("DOMContentLoaded", function() {
            const menuToggle = document.querySelector('.mobile-menu-toggle');
            const navMenu = document.querySelector('.nav-menu');
            
            if (menuToggle && navMenu) {
                menuToggle.addEventListener('click', function() {
                    navMenu.classList.toggle('active');
                    const icon = this.querySelector('i');
                    icon.classList.toggle('fa-bars');
                    icon.classList.toggle('fa-times');
                });
            }
        });
     
        document.addEventListener("DOMContentLoaded", function() {
            const navLinks = document.querySelectorAll(".nav-link");
            const sections = document.querySelectorAll("section");
            const menuToggle = document.querySelector('.mobile-menu-toggle');
            const navMenu = document.querySelector('.nav-menu');
            
            // Click event for smooth scrolling and active state
            navLinks.forEach(link => {
                link.addEventListener("click", function(e) {
                    e.preventDefault();
                    navLinks.forEach(nav => nav.classList.remove("active"));
                    this.classList.add("active");
                    
                    const targetId = this.getAttribute("href");
                    if (targetId && targetId.startsWith("#")) {
                        const targetSection = document.querySelector(targetId);
                        if (targetSection) {
                            window.scrollTo({
                                top: targetSection.offsetTop - 80,
                                behavior: "smooth"
                            });
                            
                            // Close mobile menu if open
                            if (navMenu.classList.contains('active')) {
                                navMenu.classList.remove('active');
                                const icon = menuToggle.querySelector('i');
                                icon.classList.remove('fa-times');
                                icon.classList.add('fa-bars');
                            }
                        }
                    }
                });
            });
        });
