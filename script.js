// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Check for saved preference
const savedDarkMode = localStorage.getItem('darkMode');
if (savedDarkMode === 'enabled') {
    body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        darkModeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        localStorage.setItem('darkMode', 'disabled');
        darkModeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
});

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
    threshold: 0.2,
    rootMargin: "-100px 0px -40% 0px"
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


// Contact - EmailJS
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with PUBLIC KEY
    emailjs.init("5I_hbEa_A7KK6kWsD");

    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        event.stopPropagation();

        formStatus.textContent = 'Sending...';
        formStatus.className = 'status-sending';

        const templateParams = {
            from_name: document.getElementById('name').value,
            from_email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        emailjs.send('service_dyldhsu', 'template_utjamso', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response);
                formStatus.textContent = 'Thanks! Your message was sent.';
                formStatus.className = 'status-success';
                contactForm.reset();
            })
            .catch(function(error) {
                console.error('FAILED!', error);
                formStatus.textContent = 'Error: ' + JSON.stringify(error);
                formStatus.className = 'status-error';
            });
    });
});

// Scroll Progress & Back to Top
const scrollTopBtn = document.querySelector('.scroll-to-top');
const scrollProgress = document.querySelector('.scroll-progress');

window.addEventListener('scroll', () => {
    // Scroll Progress Bar
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    if (scrollProgress) {
        scrollProgress.style.width = scrollPercent + '%';
    }
    
    // Back to Top Button
    if (scrollTopBtn) {
        if (scrollTop > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }
});

// Project Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const projectBoxes = document.querySelectorAll('.project-box');

// Add CSS for filtering
const filterStyle = document.createElement('style');
filterStyle.textContent = `
    .project-box.hidden {
        display: none !important;
    }
    .project-box.show {
        animation: fadeIn 0.5s ease;
    }
`;
document.head.appendChild(filterStyle);

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        projectBoxes.forEach(box => {
            const category = box.getAttribute('data-category');
            
            if (filterValue === 'all' || filterValue === category) {
                box.classList.remove('hidden');
                box.classList.add('show');
            } else {
                box.classList.add('hidden');
                box.classList.remove('show');
            }
        });
    });
});
