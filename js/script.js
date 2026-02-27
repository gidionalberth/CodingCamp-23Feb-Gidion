// ========================================
// MODERN WEBSITE - GIDION CORP
// Enhanced JavaScript with Smooth Interactions
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initWelcome();
    initClock();
    initMobileMenu();
    initSmoothScroll();
    initScrollIndicator();
    initForm();
    initInputFeedback();
    addScrollAnimations();
});

// ========== WELCOME MESSAGE ==========
function initWelcome() {
    const userName = prompt("Please enter your name:") || "Guest";
    const welcomeText = document.getElementById('welcome-text');
    
    // Animate welcome text
    welcomeText.style.opacity = '0';
    welcomeText.textContent = `Hi ${userName}, Welcome To Website`;
    
    setTimeout(() => {
        welcomeText.style.transition = 'opacity 0.8s ease';
        welcomeText.style.opacity = '1';
    }, 100);
}

// ========== CLOCK ==========
function initClock() {
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
}

function updateCurrentTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    const formattedTime = now.toLocaleDateString('en-US', options);
    document.getElementById('currentTime').textContent = formattedTime;
}

// ========== MOBILE MENU ==========
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburger = mobileMenuBtn.querySelector('.hamburger');
    
    mobileMenuBtn.addEventListener('click', function() {
        const isActive = mobileMenu.classList.contains('active');
        
        if (isActive) {
            mobileMenu.classList.remove('active');
            hamburger.style.transform = 'rotate(0deg)';
        } else {
            mobileMenu.classList.add('active');
            hamburger.style.transform = 'rotate(90deg)';
        }
    });
    
    // Close mobile menu when clicking on links
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            hamburger.style.transform = 'rotate(0deg)';
        });
    });
}

// ========== SMOOTH SCROLL ==========
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========== SCROLL INDICATOR ==========
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const profileSection = document.getElementById('profile');
            if (profileSection) {
                profileSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// ========== SCROLL ANIMATIONS ==========
function addScrollAnimations() {
    // Highlight active nav link on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.style.color = '#cbd5e1';
            if (link.getAttribute('href').substring(1) === current) {
                link.style.color = 'white';
            }
        });
        
        // Hide scroll indicator after scrolling
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        }
    });
}

// ========== FORM VALIDATION ==========
function initForm() {
    const form = document.getElementById('messageForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        clearAllErrors();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const tanggalLahir = document.getElementById('tanggalLahir').value;
        const jenisKelamin = document.querySelector('input[name="jenisKelamin"]:checked');
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const pesan = document.getElementById('pesan').value.trim();
        
        let isValid = true;
        
        // Validate Name
        if (name === '') {
            showError('name', 'Name is required');
            isValid = false;
        } else if (name.length < 3) {
            showError('name', 'Name must be at least 3 characters');
            isValid = false;
        } else if (!/^[a-zA-Z\s]+$/.test(name)) {
            showError('name', 'Name must contain only letters');
            isValid = false;
        }
        
        // Validate Date of Birth
        if (tanggalLahir === '') {
            showError('tanggalLahir', 'Date of birth is required');
            isValid = false;
        } else {
            const birthDate = new Date(tanggalLahir);
            const today = new Date();
            
            if (birthDate > today) {
                showError('tanggalLahir', 'Date of birth cannot be in the future');
                isValid = false;
            }
        }
        
        // Validate Gender
        if (!jenisKelamin) {
            showError('jenisKelamin', 'Please select your gender');
            isValid = false;
        }
        
        // Validate Email
        if (email === '') {
            showError('email', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate Phone
        if (phone === '') {
            showError('phone', 'Phone number is required');
            isValid = false;
        } else if (!isValidPhone(phone)) {
            showError('phone', 'Please enter a valid phone number (min 10 digits)');
            isValid = false;
        }
        
        // Validate Message
        if (pesan === '') {
            showError('pesan', 'Message is required');
            isValid = false;
        } else if (pesan.length > 100) {
            showError('pesan', 'Message must be less than 100 characters');
            isValid = false;
        }
        
        // If valid, display result
        if (isValid) {
            displayResult(name, tanggalLahir, jenisKelamin.value, email, phone, pesan);
            showSuccessAlert();
            form.reset();
        }
    });
}

// ========== ERROR HANDLING ==========
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    let errorElement;
    
    if (fieldId === 'jenisKelamin') {
        errorElement = document.querySelector('input[name="jenisKelamin"]')
            .closest('.form-group')
            .querySelector('.error-message');
    } else {
        errorElement = field.parentElement.querySelector('.error-message');
    }
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    }
    
    if (fieldId !== 'jenisKelamin' && field) {
        field.classList.add('border-red-500');
    }
}

function clearAllErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => {
        msg.classList.add('hidden');
        msg.textContent = '';
    });
    
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.classList.remove('border-red-500');
    });
}

// ========== VALIDATION HELPERS ==========
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

// ========== DISPLAY RESULT ==========
function displayResult(name, tanggalLahir, jenisKelamin, email, phone, pesan) {
    // Populate result fields
    document.getElementById('resultName').textContent = name;
    document.getElementById('resultTanggalLahir').textContent = formatDate(tanggalLahir);
    document.getElementById('resultJenisKelamin').textContent = jenisKelamin;
    document.getElementById('resultEmail').textContent = email;
    document.getElementById('resultPhone').textContent = phone;
    document.getElementById('resultpesan').textContent = pesan;
    
    // Show result with animation
    const formResult = document.getElementById('formResult');
    formResult.classList.remove('hidden');
    
    // Scroll to result (smooth)
    setTimeout(() => {
        formResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// ========== SUCCESS ALERT ==========
function showSuccessAlert() {
    // Create custom alert
    const alert = document.createElement('div');
    alert.className = 'success-toast';
    alert.innerHTML = `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>Form submitted successfully!</span>
    `;
    
    // Add styles
    alert.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(16, 185, 129, 0.4);
        display: flex;
        align-items: center;
        gap: 12px;
        font-weight: 600;
        z-index: 1000;
        animation: slideInRight 0.4s ease;
    `;
    
    document.body.appendChild(alert);
    
    // Remove after 3 seconds
    setTimeout(() => {
        alert.style.animation = 'slideOutRight 0.4s ease';
        setTimeout(() => {
            document.body.removeChild(alert);
        }, 400);
    }, 3000);
}

// ========== INPUT FEEDBACK ==========
function initInputFeedback() {
    // Clear error on input
    document.querySelectorAll('.form-input').forEach(element => {
        element.addEventListener('input', function() {
            this.classList.remove('border-red-500');
            
            const errorElement = this.parentElement.querySelector('.error-message');
            if (errorElement) {
                errorElement.classList.add('hidden');
            }
        });
    });
    
    // Clear error on radio change
    document.querySelectorAll('input[name="jenisKelamin"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const errorElement = this.closest('.form-group').querySelector('.error-message');
            if (errorElement) {
                errorElement.classList.add('hidden');
            }
        });
    });
}

// ========== ANIMATION KEYFRAMES (Added to CSS via JS) ==========
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);