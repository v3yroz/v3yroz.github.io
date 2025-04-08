// Podświetlanie aktywnego linku w nawigacji
const links = document.querySelectorAll("nav a");
links.forEach(link => {
    link.addEventListener("click", () => {
        links.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
    });
});

// Funkcja do podświetlania aktywnej sekcji na podstawie scrolla
const highlightActiveSection = () => {
    const sections = document.querySelectorAll("section");
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        const link = document.querySelector(`nav a[href='#${section.id}']`);

        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
};

window.addEventListener("scroll", highlightActiveSection);
highlightActiveSection(); // Aby ustawić odpowiednią klasę na starcie

// Efekt fade-in przy scrollowaniu
const fadeInOnScroll = () => {
    const elements = document.querySelectorAll("section, .project");
    const triggerBottom = window.innerHeight * 0.85;

    elements.forEach(el => {
        const boxTop = el.getBoundingClientRect().top;
        if (boxTop < triggerBottom) {
            el.classList.add("show");
        } else {
            el.classList.remove("show");
        }
    });
};

window.addEventListener("scroll", fadeInOnScroll);
fadeInOnScroll();

// Zmienna slideIndex jako tablica dla różnych karuzel
let slideIndex = [];

// Funkcja do inicjalizacji karuzeli
function initializeSlideshow(index) {
    slideIndex[index] = 1;  // Inicjalizuj pierwszy slajd dla danej karuzeli
    showSlides(slideIndex[index], index); // Pokaż pierwszy slajd
}

// Next/previous controls dla karuzeli
function plusSlides(n, index) {
    showSlides(slideIndex[index] += n, index);
}

// Thumbnail image controls dla karuzeli
function currentSlide(n, index) {
    showSlides(slideIndex[index] = n, index);
}

function showSlides(n, index) {
    let i;
    let slides = document.getElementsByClassName("mySlides-" + index); // Klasa z identyfikatorem index
    let dots = document.getElementsByClassName("dot-" + index); // Klasa z identyfikatorem index

    if (n > slides.length) { slideIndex[index] = 1 }
    if (n < 1) { slideIndex[index] = slides.length }

    // Ukryj wszystkie slajdy
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Usuń aktywność z wszystkich kropek
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex[index] - 1].style.display = "block";
    dots[slideIndex[index] - 1].className += " active";
}

// Inicjalizacja każdej karuzeli
initializeSlideshow(1);
initializeSlideshow(2);
initializeSlideshow(3);
initializeSlideshow(4);
initializeSlideshow(5);
initializeSlideshow(6);
initializeSlideshow(7);

// Parallax efekt na header
window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    header.style.backgroundPositionY = `${window.scrollY * 0.5}px`;
});

// Particle background
const canvas = document.createElement("canvas");
canvas.id = "particle-canvas";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 100; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1
    });
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,255,255,0.6)";
        ctx.fill();
    });
    requestAnimationFrame(animateParticles);
}

animateParticles();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Funkcja sticky nawigacji
window.onscroll = function () {
    stickyNav();
};

var navbar = document.querySelector("nav");
var sticky = navbar.offsetTop;

function stickyNav() {
    if (window.pageYOffset > sticky) {
        navbar.classList.add("fixed");
    } else {
        navbar.classList.remove("fixed");
    }
}