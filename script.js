/**
 * ANDREY CORE ENGINE v5.0
 * Optimized JavaScript for Space-Tech Portfolio
 */

"use strict";

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. TYPEWRITER SYSTEM ---
    const typewriter = () => {
        const target = document.getElementById('typewriter');
        const text = "Full Stack Developer";
        let index = 0;
        const speed = 150;

        function type() {
            if (index < text.length) {
                target.textContent += text.charAt(index);
                index++;
                setTimeout(type, speed);
            }
        }
        
        // Iniciar com delay para garantir carregamento visual
        setTimeout(type, 1200);
    };

    // --- 2. DYNAMIC COSMOS GENERATOR ---
    const initCosmos = () => {
        const createLayer = (id, count, size) => {
            const el = document.getElementById(id);
            if (!el) return;
            
            let boxShadow = "";
            for (let i = 0; i < count; i++) {
                const x = Math.floor(Math.random() * window.innerWidth);
                const y = Math.floor(Math.random() * 3000); // Espaço vertical longo
                boxShadow += `${x}px ${y}px #FFF${i === count - 1 ? "" : ","}`;
            }
            el.style.boxShadow = boxShadow;
        };

        createLayer('stars-small', 250, 1);
        createLayer('stars-medium', 100, 2);
        createLayer('stars-large', 40, 3);
    };

    // --- 3. SCROLL SPY & HEADER CONTROL ---
    const headerControl = () => {
        const nav = document.getElementById('main-nav');
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            // Header Glow
            if (window.scrollY > 100) {
                nav.classList.add('nav-scrolled');
            } else {
                nav.classList.remove('nav-scrolled');
            }

            // Scroll Spy
            let current = "";
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        });
    };

    // --- 4. REVEAL ANIMATIONS (Intersection Observer) ---
    const revealObserver = () => {
        const options = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                    observer.unobserve(entry.target); // Animates once
                }
            });
        }, options);

        const items = document.querySelectorAll('.expertise-card, .project-mega-card, .contact-container');
        items.forEach(item => {
            item.style.opacity = "0";
            item.style.transform = "translateY(40px)";
            item.style.transition = "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
            observer.observe(item);
        });

        // Adicionar classe via CSS injetado para controlar a ativação
        const style = document.createElement('style');
        style.innerHTML = `
            .reveal-active {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    };

    // --- 5. SMOOTH ANCHOR LINK SCROLL ---
    const smoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    // --- 6. PARALLAX EFFECT FOR NEBULAS ---
    const initParallax = () => {
        window.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            const nebula = document.querySelector('.nebula-primary');
            if (nebula) {
                nebula.style.transform = `translate(${x * 50}px, ${y * 50}px)`;
            }
        });
    };

    // --- 7. ERROR HANDLER FOR IMAGES (IF ANY) ---
    const handleImages = () => {
        document.querySelectorAll('img').forEach(img => {
            img.onerror = function() {
                this.src = 'https://via.placeholder.com/400?text=Andrey+Dev';
            };
        });
    };

    // --- INITIALIZATION SEQUENCE ---
    try {
        initCosmos();
        typewriter();
        headerControl();
        revealObserver();
        smoothScroll();
        initParallax();
        handleImages();
        
        console.log("%c ANDREY PORTFOLIO SYSTEM LOADED ", "background: #00f2ff; color: #000; font-weight: bold;");
    } catch (error) {
        console.error("System crash avoided. Details:", error);
    }
});
