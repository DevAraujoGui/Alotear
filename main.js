// ─── HERO SWIPER ───
if (document.querySelector('.hero-swiper')) {
    const heroSwiper = new Swiper('.hero-swiper', {
        loop: true,
        autoplay: { delay: 5000, disableOnInteraction: false },
        effect: 'slide',
        speed: 900,
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        pagination: { el: '.swiper-pagination', clickable: true },
    });
}

// ─── NAVBAR SCROLL ───
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 300);
});

// ─── MOBILE NAV ───
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
const mobileNavClose = document.getElementById('mobileNavClose');

hamburger.addEventListener('click', () => {
    mobileNav.classList.add('open');
    document.body.style.overflow = 'hidden';
});

mobileNavClose.addEventListener('click', closeMobileNav);

function closeMobileNav() {
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
}

// ─── FAQ ACCORDION ───
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const isOpen = item.classList.contains('open');

        // Fecha todos
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

        // Abre o clicado (se não estava aberto)
        if (!isOpen) item.classList.add('open');
    });
});

// ─── INTERSECTION OBSERVER ANIMATIONS ───
const animatedEls = document.querySelectorAll(
    '.emp-card, .numero-item, .sobre-img-wrap, .sobre-content, .contato-detail, .contato-map, .dep-card'
);

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const siblings = [...entry.target.parentElement.children];
            const idx = siblings.indexOf(entry.target);
            entry.target.style.transitionDelay = `${idx * 0.1}s`;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

animatedEls.forEach(el => observer.observe(el));

// ─── PAGE TRANSITIONS ───
window.addEventListener('load', () => {
    document.body.classList.add('page-ready');
});

document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a');
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    const target = anchor.getAttribute('target');

    // Only apply to internal .html links that don't open in a new tab and aren't simple fragments
    if (href && href.endsWith('.html') && !href.startsWith('#') && target !== '_blank') {
        e.preventDefault();
        document.body.classList.add('page-leaving');
        document.body.classList.remove('page-ready');

        setTimeout(() => {
            window.location.href = href;
        }, 500);
    }
});
