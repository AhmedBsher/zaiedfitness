// ============================================
// DOM ELEMENTS
// ============================================

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const statNumbers = document.querySelectorAll('.stat-number');
const transformationCards = document.querySelectorAll('.transformation-card');
const sliderWrapper = document.getElementById('sliderWrapper');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dots = document.querySelectorAll('.dot');
const faqItems = document.querySelectorAll('.faq-item');
const contactForm = document.getElementById('contactForm');
const sections = document.querySelectorAll('section');

// ============================================
// MOBILE NAVIGATION
// ============================================

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================
// SMOOTH SCROLLING
// ============================================

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// CTA BUTTONS SMOOTH SCROLL
// ============================================

const ctaButtons = document.querySelectorAll('.btn[href^="#"]');
ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = button.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// COUNTER ANIMATION
// ============================================

const animateCounter = (element, target) => {
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };
    
    updateCounter();
};

const observerOptions = {
    threshold: 0.5
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsSection = document.getElementById('stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ============================================
// TRANSFORMATION SLIDER
// ============================================

let currentSlide = 0;
const totalSlides = transformationCards.length;

const showSlide = (index) => {
    transformationCards.forEach((card, i) => {
        card.classList.remove('active');
        dots[i].classList.remove('active');
    });
    
    transformationCards[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
};

const nextSlide = () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
};

const prevSlide = () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
};

if (nextBtn) {
    nextBtn.addEventListener('click', nextSlide);
}

if (prevBtn) {
    prevBtn.addEventListener('click', prevSlide);
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// Auto-advance slider
let sliderInterval = setInterval(nextSlide, 5000);

// Pause auto-advance on hover
if (sliderWrapper) {
    sliderWrapper.addEventListener('mouseenter', () => {
        clearInterval(sliderInterval);
    });
    
    sliderWrapper.addEventListener('mouseleave', () => {
        sliderInterval = setInterval(nextSlide, 5000);
    });
}

// ============================================
// FAQ ACCORDION
// ============================================

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other items
        faqItems.forEach(otherItem => {
            otherItem.classList.remove('active');
        });
        
        // Toggle current item
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ============================================
// CONTACT FORM HANDLING
// ============================================

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Validate form
        let isValid = true;
        const requiredFields = ['name', 'email', 'phone', 'goal'];
        
        requiredFields.forEach(field => {
            const input = contactForm.querySelector(`[name="${field}"]`);
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ff4444';
            } else {
                input.style.borderColor = '#333333';
            }
        });
        
        if (isValid) {
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'جاري الإرسال...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = 'تم الإرسال بنجاح!';
                submitBtn.style.backgroundColor = '#00FF7F';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.disabled = false;
                    contactForm.reset();
                }, 2000);
            }, 1500);
            
            console.log('Form submitted:', data);
        }
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

const animateOnScroll = () => {
    const elements = document.querySelectorAll('.program-card, .testimonial-card, .video-card, .stat-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize scroll animations
const initScrollAnimations = () => {
    const elements = document.querySelectorAll('.program-card, .testimonial-card, .video-card, .stat-card');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    animateOnScroll();
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', initScrollAnimations);

// Scroll Reveal Functionality
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    const revealsLeft = document.querySelectorAll('.reveal-left');
    const revealsRight = document.querySelectorAll('.reveal-right');
    const revealsScale = document.querySelectorAll('.reveal-scale');

    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }

    for (let i = 0; i < revealsLeft.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = revealsLeft[i].getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            revealsLeft[i].classList.add('active');
        }
    }

    for (let i = 0; i < revealsRight.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = revealsRight[i].getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            revealsRight[i].classList.add('active');
        }
    }

    for (let i = 0; i < revealsScale.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = revealsScale[i].getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            revealsScale[i].classList.add('active');
        }
    }
}

window.addEventListener('scroll', reveal);
window.addEventListener('load', reveal);

// ============================================
// ACTIVE NAV LINK ON SCROLL
// ============================================

const updateActiveNavLink = () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
};

window.addEventListener('scroll', updateActiveNavLink);

// ============================================
// VIDEO PLAY FUNCTIONALITY (Placeholder)
// ============================================

const videoCards = document.querySelectorAll('.video-card');

videoCards.forEach(card => {
    const playButton = card.querySelector('.play-button');
    
    if (playButton) {
        playButton.addEventListener('click', () => {
            // This is a placeholder for video functionality
            // In a real implementation, this would open a modal with the video
            alert('سيتم تشغيل الفيديو قريباً - هذه ميزة تجريبية');
        });
    }
});

// ============================================
// LAZY LOADING FOR IMAGES
// ============================================

const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => {
    imageObserver.observe(img);
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Debounce function for performance
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Debounced scroll handlers
const debouncedScroll = debounce(() => {
    updateActiveNavLink();
    animateOnScroll();
}, 10);

window.addEventListener('scroll', debouncedScroll);

// ============================================
// ACCESSIBILITY IMPROVEMENTS
// ============================================

// Add keyboard navigation for slider
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        nextSlide();
    } else if (e.key === 'ArrowRight') {
        prevSlide();
    }
});

// Add focus indicators for better accessibility
const allButtons = document.querySelectorAll('button, a, input, select, textarea');

allButtons.forEach(element => {
    element.addEventListener('focus', () => {
        element.style.outline = '2px solid #39FF14';
        element.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', () => {
        element.style.outline = '';
        element.style.outlineOffset = '';
    });
});

// ============================================
// PRELOADER (Optional)
// ============================================

window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// ============================================
// ERROR HANDLING
// ============================================

window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.message);
});

// ============================================
// TOOLS SECTION - TAB SWITCHING
// ============================================

const toolTabs = document.querySelectorAll('.tool-tab');
const toolContents = document.querySelectorAll('.tool-content');

toolTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetTab = tab.getAttribute('data-tab');
        
        // Remove active class from all tabs and contents
        toolTabs.forEach(t => t.classList.remove('active'));
        toolContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        tab.classList.add('active');
        document.getElementById(`${targetTab}-content`).classList.add('active');
    });
});

// ============================================
// BMI CALCULATOR
// ============================================

function calculateBMI() {
    const gender = document.getElementById('bmi-gender').value;
    const age = parseFloat(document.getElementById('bmi-age').value);
    const height = parseFloat(document.getElementById('bmi-height').value);
    const weight = parseFloat(document.getElementById('bmi-weight').value);
    
    // Validation
    if (!age || !height || !weight) {
        alert('الرجاء إدخال جميع البيانات المطلوبة');
        return;
    }
    
    if (age < 1 || age > 120 || height < 50 || height > 250 || weight < 20 || weight > 300) {
        alert('الرجاء إدخال قيم صحيحة');
        return;
    }
    
    // Calculate BMI
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    const bmiRounded = bmi.toFixed(1);
    
    // Determine category
    let category = '';
    let details = '';
    let range = '';
    
    if (bmi < 18.5) {
        category = 'نحافة';
        range = 'underweight';
        details = 'أنت تعاني من نقص في الوزن. يُنصح باستشارة أخصائي تغذية لوضع خطة لزيادة الوزن بشكل صحي.';
    } else if (bmi >= 18.5 && bmi < 25) {
        category = 'وزن طبيعي';
        range = 'normal';
        details = 'وزنك ضمن النطاق الصحي المثالي. حافظ على نمط حياتك الحالي وتواصل على ممارسة الرياضة.';
    } else if (bmi >= 25 && bmi < 30) {
        category = 'زيادة في الوزن';
        range = 'overweight';
        details = 'لديك زيادة طفيفة في الوزن. يمكن تحسين الوضع من خلال النظام الغذائي المتوازن وممارسة الرياضة.';
    } else {
        category = 'سمنة';
        range = 'obese';
        details = 'أنت تعاني من السمنة. يُنصح بشدة باستشارة أخصائي تغذية وطبيب لوضع خطة علاجية مناسبة.';
    }
    
    // Update UI
    document.getElementById('bmi-value').textContent = bmiRounded;
    document.getElementById('bmi-category').textContent = category;
    document.getElementById('bmi-details').innerHTML = `<p>${details}</p>`;
    
    // Highlight the correct range in chart
    document.querySelectorAll('.chart-bar').forEach(bar => {
        bar.classList.remove('highlighted');
    });
    document.querySelector(`.chart-bar.${range}`).classList.add('highlighted');
}

// ============================================
// CALORIE & MACRO CALCULATOR
// ============================================

function calculateCalories() {
    const gender = document.getElementById('cal-gender').value;
    const age = parseFloat(document.getElementById('cal-age').value);
    const height = parseFloat(document.getElementById('cal-height').value);
    const weight = parseFloat(document.getElementById('cal-weight').value);
    const activity = parseFloat(document.getElementById('cal-activity').value);
    const goal = document.getElementById('cal-goal-select').value;
    
    // Validation
    if (!age || !height || !weight) {
        alert('الرجاء إدخال جميع البيانات المطلوبة');
        return;
    }
    
    if (age < 1 || age > 120 || height < 50 || height > 250 || weight < 20 || weight > 300) {
        alert('الرجاء إدخال قيم صحيحة');
        return;
    }
    
    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'male') {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }
    
    // Calculate TDEE (Total Daily Energy Expenditure)
    let tdee = bmr * activity;
    
    // Adjust for goal
    let dailyCalories;
    let goalText;
    if (goal === 'lose') {
        dailyCalories = tdee - 500;
        goalText = 'لخسارة الدهون';
    } else if (goal === 'gain') {
        dailyCalories = tdee + 500;
        goalText = 'لزيادة الوزن';
    } else {
        dailyCalories = tdee;
        goalText = 'للحفاظ على الوزن';
    }
    
    dailyCalories = Math.round(dailyCalories);
    
    // Calculate macros (balanced approach: 30% protein, 40% carbs, 30% fats)
    const proteinCalories = dailyCalories * 0.30;
    const carbsCalories = dailyCalories * 0.40;
    const fatsCalories = dailyCalories * 0.30;
    
    const proteinGrams = Math.round(proteinCalories / 4);
    const carbsGrams = Math.round(carbsCalories / 4);
    const fatsGrams = Math.round(fatsCalories / 9);
    
    // Update UI
    document.getElementById('cal-value').textContent = dailyCalories;
    document.getElementById('cal-goal-display').textContent = goalText;
    
    document.getElementById('protein-value').textContent = `${proteinGrams}g`;
    document.getElementById('carbs-value').textContent = `${carbsGrams}g`;
    document.getElementById('fats-value').textContent = `${fatsGrams}g`;
    
    // Animate macro bars
    setTimeout(() => {
        document.getElementById('protein-bar').style.width = '30%';
        document.getElementById('carbs-bar').style.width = '40%';
        document.getElementById('fats-bar').style.width = '30%';
    }, 100);
}

// ============================================
// EXERCISE LIBRARY
// ============================================

const exercisesData = [
    {
        name: 'تمرين الضغط',
        muscle: 'chest',
        level: 'beginner',
        equipment: 'bodyweight',
        description: 'تمرين ممتاز لتقوية عضلات الصدر والذراعين'
    },
    {
        name: 'تمرين البنش بريس',
        muscle: 'chest',
        level: 'intermediate',
        equipment: 'barbell',
        description: 'تمرين أساسي لبناء كتلة عضلات الصدر'
    },
    {
        name: 'تمرين السكوات',
        muscle: 'legs',
        level: 'beginner',
        equipment: 'bodyweight',
        description: 'تمرين شامل لعضلات الساقين والمؤخرة'
    },
    {
        name: 'تمرين الديدليفت',
        muscle: 'back',
        level: 'advanced',
        equipment: 'barbell',
        description: 'تمرين متقدم لعضلات الظهر والجسم بالكامل'
    },
    {
        name: 'تمرين البول أوفر',
        muscle: 'back',
        level: 'intermediate',
        equipment: 'cable',
        description: 'تمرين لعضلات الظهر العلوية'
    },
    {
        name: 'تمرين شولدر بريس',
        muscle: 'shoulders',
        level: 'intermediate',
        equipment: 'dumbbells',
        description: 'تمرين لبناء عضلات الكتف'
    },
    {
        name: 'تمرين البيبس كيرل',
        muscle: 'arms',
        level: 'beginner',
        equipment: 'dumbbells',
        description: 'تمرين لتقوية عضلات البايبس'
    },
    {
        name: 'تمرين الترايسبس داون',
        muscle: 'arms',
        level: 'intermediate',
        equipment: 'cable',
        description: 'تمرين لعزل عضلات الترايسبس'
    },
    {
        name: 'تمرين البلانك',
        muscle: 'core',
        level: 'beginner',
        equipment: 'bodyweight',
        description: 'تمرين لتقوية عضلات البطن الأساسية'
    },
    {
        name: 'تمرين الكرانش',
        muscle: 'core',
        level: 'beginner',
        equipment: 'bodyweight',
        description: 'تمرين لعضلات البطن الأمامية'
    },
    {
        name: 'تمرين الجري',
        muscle: 'cardio',
        level: 'beginner',
        equipment: 'bodyweight',
        description: 'تمرين كارديو ممتاز لحرق السعرات'
    },
    {
        name: 'تمرين القفز بالحبل',
        muscle: 'cardio',
        level: 'intermediate',
        equipment: 'bodyweight',
        description: 'تمرين كارديو عالي الشدة'
    },
    {
        name: 'تمرين لانجز',
        muscle: 'legs',
        level: 'intermediate',
        equipment: 'bodyweight',
        description: 'تمرين لعضلات الفخذ والمؤخرة'
    },
    {
        name: 'تمرين لات ريز',
        muscle: 'back',
        level: 'intermediate',
        equipment: 'machine',
        description: 'تمرين لعزل عضلات الظهر'
    },
    {
        name: 'تمرين لاتيرال ريز',
        muscle: 'shoulders',
        level: 'intermediate',
        equipment: 'dumbbells',
        description: 'تمرين لعضلات الكتف الجانبية'
    },
    {
        name: 'تمرين ليج بريس',
        muscle: 'legs',
        level: 'beginner',
        equipment: 'machine',
        description: 'تمرين آمن لعضلات الساقين'
    }
];

const muscleNames = {
    chest: 'الصدر',
    back: 'الظهر',
    shoulders: 'الكتفين',
    arms: 'الذراعين',
    legs: 'الساقين',
    core: 'العضلات الأساسية',
    cardio: 'الكارديو'
};

const levelNames = {
    beginner: 'مبتدئ',
    intermediate: 'متوسط',
    advanced: 'متقدم'
};

const equipmentNames = {
    bodyweight: 'وزن الجسم',
    dumbbells: 'أثقال يدوية',
    barbell: 'بار',
    machine: 'آلات',
    cable: 'كابل'
};

const equipmentIcons = {
    bodyweight: 'fa-person-running',
    dumbbells: 'fa-dumbbell',
    barbell: 'fa-weight-hanging',
    machine: 'fa-cogs',
    cable: 'fa-link'
};

function renderExercises(exercises) {
    const grid = document.getElementById('exercises-grid');
    grid.innerHTML = '';
    
    exercises.forEach(exercise => {
        const card = document.createElement('div');
        card.className = 'exercise-card';
        
        card.innerHTML = `
            <div class="exercise-image">
                <i class="fas ${equipmentIcons[exercise.equipment]} exercise-placeholder"></i>
            </div>
            <div class="exercise-info">
                <h4 class="exercise-name">${exercise.name}</h4>
                <p class="exercise-muscle">${muscleNames[exercise.muscle]}</p>
                <span class="exercise-level">${levelNames[exercise.level]}</span>
                <div class="exercise-equipment">
                    <i class="fas ${equipmentIcons[exercise.equipment]}"></i>
                    <span>${equipmentNames[exercise.equipment]}</span>
                </div>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

function filterExercises() {
    const muscleFilter = document.getElementById('muscle-filter').value;
    const levelFilter = document.getElementById('level-filter').value;
    const equipmentFilter = document.getElementById('equipment-filter').value;
    
    let filtered = exercisesData;
    
    if (muscleFilter !== 'all') {
        filtered = filtered.filter(ex => ex.muscle === muscleFilter);
    }
    
    if (levelFilter !== 'all') {
        filtered = filtered.filter(ex => ex.level === levelFilter);
    }
    
    if (equipmentFilter !== 'all') {
        filtered = filtered.filter(ex => ex.equipment === equipmentFilter);
    }
    
    renderExercises(filtered);
}

// Initialize exercise library
document.addEventListener('DOMContentLoaded', () => {
    // Hide loading screen when page is loaded
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 1500);
    }
    
    renderExercises(exercisesData);
    
    // Add event listeners to filters
    document.getElementById('muscle-filter').addEventListener('change', filterExercises);
    document.getElementById('level-filter').addEventListener('change', filterExercises);
    document.getElementById('equipment-filter').addEventListener('change', filterExercises);
});

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log('%c كوتش محمد زايد - موقع رسمي ', 'background: #39FF14; color: #1A1A1A; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('%c تم تطوير الموقع بواسطة AhmedBsher ', 'background: #2A2A2A; color: #39FF14; font-size: 14px; padding: 5px;');
