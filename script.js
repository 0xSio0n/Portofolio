const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section[id]');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // 'entry.isIntersecting' bernilai true jika section terlihat di layar
        if (entry.isIntersecting) {
            const id = entry.target.id;

            // Hapus 'active' dari semua link
            navLinks.forEach(link => {
                link.classList.remove('active');
            });

            // Tambahkan 'active' HANYA ke link yang href-nya cocok
            const activeLink = document.querySelector(`nav a[href="#${id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}, {
    // 'threshold' berarti seberapa banyak bagian section harus terlihat
    threshold: 0.6
});

// Minta observer untuk "mengamati" setiap section
sections.forEach(section => {
    observer.observe(section);
});

const fadeElements = document.querySelectorAll('.fade-in-section');
const fadeOptions = {
    threshold: 0.5
};

const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, fadeOptions);

fadeElements.forEach(element => {
    fadeObserver.observe(element)
})

// Effect

const typingTextElement = document.getElementById('typing-text');
const roles = ["Web Enthusiast", "Game Programmer", "UI/UX Designer"];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 150;
let deletingSpeed = 100;
let delayBeforeNextRole = 1500;

function typeWriter() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        typingTextElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingTextElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
        speed = delayBeforeNextRole;
        isDeleting = true;
    }

    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 500;
    }

    setTimeout(typeWriter, speed);
}

document.addEventListener('DOMContentLoaded', () => {
    if (typingTextElement) {
        typeWriter();
    }
});


// Contact

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    formStatus.textContent = 'Sending...';
    formStatus.className = 'status-sending';

    const formData = new FormData(event.target);

    try {
        const response = await fetch ('https://formspree.io/f/xrbovapg', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            formStatus.textContent = 'Thanks! Your message was sent.';
            formStatus.className = 'status-success';
            contactForm.reset();
        } else {
            formStatus.textContent = 'Oops! There was a problem. Please try again.';
            formStatus.className = 'status-error';
        }
    } catch (error) {
        console.error('Error:', error);
        formStatus.textContent = 'Oops! A network error occurred.';
        formStatus.className = 'status-error';
    }
});

// Scroll

const scrollTopBtn = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.pointerEvents = 'auto';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.pointerEvents = 'none';
    }
});
