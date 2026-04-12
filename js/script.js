document.addEventListener('DOMContentLoaded', () => {
    // 1. Current Year for Footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Scroll Progress Bar logic
    const scrollProgress = document.getElementById('scroll-progress');
    const updateScrollProgress = () => {
        if (!scrollProgress) return;
        
        // Calculate how far the user has scrolled
        const scrollPx = document.documentElement.scrollTop || document.body.scrollTop;
        const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolledPct = (scrollPx / winHeightPx) * 100;
        
        scrollProgress.style.width = scrolledPct + '%';
    };

    // 3. Navbar logic
    const navbar = document.getElementById('navbar');
    const handleScroll = () => {
        // Handle navbar sticky
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Handle progress bar
        updateScrollProgress();
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger once on load

    // 4. Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('open');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('open');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // 5. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // 6. Intersection Observer for Scroll Animations
    // Select elements to animate
    const revealElements = document.querySelectorAll(
        '.reveal-up, .reveal-left, .reveal-right, .reveal-scale, .reveal-fade'
    );

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -15% 0px', // Trigger slightly before the element comes into full view
        threshold: 0.1
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // 7. Contact Form Simulation
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            btn.textContent = "Sending...";
            btn.disabled = true;

            // Simulate API call delay
            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
                
                formStatus.textContent = "Message sent successfully! I'll get back to you shortly.";
                formStatus.style.display = "block";
                formStatus.style.color = "#00e5b0";
                
                contactForm.reset();
                
                setTimeout(() => {
                    formStatus.style.display = "none";
                }, 5000);
                
            }, 1500);
        });
    }
});
