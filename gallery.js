// HIGH-CONTRAST GLOWING CURSOR
const cursor = document.querySelector('.custom-cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    follower.style.left = (e.clientX - 13) + 'px';
    follower.style.top = (e.clientY - 13) + 'px';
});

// 1. AUTO-SLIDER LOGIC
const slides = document.querySelectorAll('.slide');
const prevSlideBtn = document.getElementById('prevSlide');
const nextSlideBtn = document.getElementById('nextSlide');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) slide.classList.add('active');
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

if (nextSlideBtn && prevSlideBtn) {
    nextSlideBtn.addEventListener('click', nextSlide);
    prevSlideBtn.addEventListener('click', prevSlide);
    // Auto slide every 4 seconds
    setInterval(nextSlide, 4000);
}

// 2. SCROLL REVEAL ANIMATION (Cards auto-animate on scroll)
const revealCards = document.querySelectorAll('.reveal-item');

function checkScrollReveal() {
    const triggerBottom = window.innerHeight * 0.85;
    
    revealCards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < triggerBottom) {
            card.classList.add('show');
        }
    });
}

window.addEventListener('scroll', checkScrollReveal);
// Initial check on load
checkScrollReveal();

// 3. CATEGORY FILTER LOGIC
const filterBtns = document.querySelectorAll('.f-btn');
const galleryCards = document.querySelectorAll('.g-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        galleryCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            if (filterValue === 'all' || filterValue === cardCategory) {
                card.style.display = 'block';
                setTimeout(() => card.classList.add('show'), 100);
            } else {
                card.classList.remove('show');
                card.style.display = 'none';
            }
        });
    });
});