const courses = [
    {
        id: "basic-lecture",
        title: "المحاضرة الأساسية",
        subject: "اللغة العربية",
        grade: "الأول الثانوي",
        price: 400,
        currency: "ج.م",
        paid: true,
        image: "https://i.ibb.co/Ldz1hbfq/file-000000006fa482108a78a09df263e4f4.png",
        description: "كورس تأسيسي متكامل لطلاب الصف الأول الثانوي"
    }
];

const teacherInfo = {
    name: "عادل عيد",
    title: "مدرس اللغة العربية",
    phone: "+201007004818",
    phoneDisplay: "+20 10 07004818",
    whatsapp: "201007004818"
};

document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
});

document.addEventListener('dragstart', function(e) {
    e.preventDefault();
    return false;
});

document.addEventListener('copy', function(e) {
    e.preventDefault();
    return false;
});

document.addEventListener('cut', function(e) {
    e.preventDefault();
    return false;
});

document.addEventListener('paste', function(e) {
    e.preventDefault();
    return false;
});

document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && (e.key === 'c' || e.key === 'x' || e.key === 'u' || e.key === 's' || e.key === 'p')) {
        e.preventDefault();
        return false;
    }
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) {
        e.preventDefault();
        return false;
    }
    if (e.key === 'F12') {
        e.preventDefault();
        return false;
    }
});

const loader = document.getElementById('loader');
const scrollTopBtn = document.getElementById('scrollTop');
const siteHeader = document.getElementById('siteHeader');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const pageTransition = document.getElementById('pageTransition');
const bookingModal = document.getElementById('bookingModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const bookingForm = document.getElementById('bookingForm');
const bookingSuccess = document.getElementById('bookingSuccess');
const whatsappBtn = document.getElementById('whatsappBtn');
const closeSuccessBtn = document.getElementById('closeSuccessBtn');
const whatsappContactBtn = document.getElementById('whatsappContactBtn');
const contactForm = document.getElementById('contactForm');
const contactSuccess = document.getElementById('contactSuccess');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

window.addEventListener('load', () => {
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.style.overflow = '';
        }, 600);
    }
});

if (loader) {
    document.body.style.overflow = 'hidden';
}

let currentPage = 'home';

function showPage(pageId) {
    if (pageId === currentPage) return;
    
    const pages = document.querySelectorAll('.page');
    const targetPage = document.getElementById('page-' + pageId);
    
    if (!targetPage) return;
    
    document.querySelectorAll('.nav-link, .mobile-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });
    
    if (pageTransition && !prefersReducedMotion.matches) {
        pageTransition.classList.add('active');
    }
    
    setTimeout(() => {
        pages.forEach(page => {
            page.style.display = 'none';
        });
        
        targetPage.style.display = 'block';
        
        currentPage = pageId;
        
        closeMobileMenu();
        
        window.scrollTo({ top: 0, behavior: 'instant' });
        
        setTimeout(() => {
            initScrollAnimations();
            if (pageId === 'home') {
                animateHero();
            }
            if (pageId === 'home') {
                initCounterAnimation();
            }
        }, 100);
        
        if (pageTransition && !prefersReducedMotion.matches) {
            setTimeout(() => {
                pageTransition.classList.remove('active');
            }, 350);
        }
    }, prefersReducedMotion.matches ? 0 : 350);
}

document.addEventListener('click', function(e) {
    const link = e.target.closest('[data-page]');
    if (link) {
        e.preventDefault();
        const pageId = link.getAttribute('data-page');
        showPage(pageId);
    }
});

function openMobileMenu() {
    mobileMenu.classList.add('open');
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

if (hamburger) {
    hamburger.addEventListener('click', () => {
        if (mobileMenu.classList.contains('open')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        closeMobileMenu();
    }
});

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    if (siteHeader) {
        if (scrollY > 50) {
            siteHeader.classList.add('scrolled');
        } else {
            siteHeader.classList.remove('scrolled');
        }
    }
    
    if (scrollTopBtn) {
        if (scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }
});

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function animateHero() {
    const heroElements = document.querySelectorAll('#page-home .hero-anim');
    if (prefersReducedMotion.matches) {
        heroElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
        return;
    }
    
    heroElements.forEach((el, index) => {
        el.style.animation = 'none';
        el.offsetHeight;
        el.style.animation = 'fadeInUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) ' + (index * 0.1 + 0.1) + 's forwards';
        if (el.classList.contains('hero-image')) {
            el.style.animation = 'fadeInLeft 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.5s forwards';
        }
    });
}

let revealObserver;

function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    
    if (prefersReducedMotion.matches) {
        revealElements.forEach(el => el.classList.add('visible'));
        return;
    }
    
    if (revealObserver) {
        revealObserver.disconnect();
    }
    
    revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
        if (!el.classList.contains('visible')) {
            revealObserver.observe(el);
        }
    });
}

function initCounterAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    
    if (prefersReducedMotion.matches) {
        statNumbers.forEach(el => {
            const target = parseInt(el.getAttribute('data-target'));
            const prefix = el.getAttribute('data-prefix') || '';
            el.textContent = prefix + target;
        });
        return;
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'));
                const prefix = el.getAttribute('data-prefix') || '';
                const duration = 2000;
                const startTime = performance.now();
                
                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = Math.round(eased * target);
                    el.textContent = prefix + current;
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        el.textContent = prefix + target;
                    }
                }
                
                requestAnimationFrame(updateCounter);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(el => observer.observe(el));
}

function openBookingModal(courseId) {
    if (!bookingModal) return;
    
    const formCourseId = document.getElementById('formCourseId');
    const formCourseTitle = document.getElementById('formCourseTitle');
    
    if (formCourseId && formCourseTitle) {
        const course = courses.find(c => c.id === courseId);
        if (course) {
            formCourseId.value = course.id;
            formCourseTitle.value = course.title;
        }
    }
    
    if (bookingForm) bookingForm.style.display = 'block';
    if (bookingSuccess) bookingSuccess.hidden = true;
    
    bookingModal.classList.add('open');
    bookingModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeBookingModal() {
    if (!bookingModal) return;
    
    bookingModal.classList.remove('open');
    bookingModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

document.querySelectorAll('.btn-book-now').forEach(btn => {
    btn.addEventListener('click', function() {
        const courseId = this.getAttribute('data-course-id') || 'basic-lecture';
        openBookingModal(courseId);
    });
});

if (modalOverlay) {
    modalOverlay.addEventListener('click', closeBookingModal);
}

if (modalClose) {
    modalClose.addEventListener('click', closeBookingModal);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && bookingModal && bookingModal.classList.contains('open')) {
        closeBookingModal();
    }
});

if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const studentName = document.getElementById('studentName').value.trim();
        const studentPhone = document.getElementById('studentPhone').value.trim();
        const studentGrade = document.getElementById('studentGrade').value;
        const studentMessage = document.getElementById('studentMessage').value.trim();
        const courseTitle = document.getElementById('formCourseTitle').value;
        
        if (!studentName || !studentPhone || !studentGrade) {
            ['studentName', 'studentPhone', 'studentGrade'].forEach(id => {
                const el = document.getElementById(id);
                if (!el.value.trim()) {
                    el.classList.add('error');
                    setTimeout(() => el.classList.remove('error'), 2000);
                }
            });
            return;
        }
        
        const phoneRegex = /^01[0-9]{9}$/;
        if (!phoneRegex.test(studentPhone)) {
            const phoneInput = document.getElementById('studentPhone');
            phoneInput.classList.add('error');
            phoneInput.focus();
            setTimeout(() => phoneInput.classList.remove('error'), 2000);
            return;
        }
        
        bookingForm.style.display = 'none';
        bookingSuccess.hidden = false;
        
        window.bookingData = {
            studentName: studentName,
            studentPhone: studentPhone,
            studentGrade: studentGrade,
            studentMessage: studentMessage,
            courseTitle: courseTitle
        };
    });
}

function generateWhatsAppLink(bookingData) {
    const message = 'مرحبًا أستاذ ' + teacherInfo.name + '،\n' +
                   'أريد حجز كورس ' + bookingData.courseTitle + '.\n' +
                   'اسم الطالب: ' + bookingData.studentName + '\n' +
                   'الصف: ' + bookingData.studentGrade + '\n' +
                   'رقم الهاتف: ' + bookingData.studentPhone +
                   (bookingData.studentMessage ? '\nملاحظات: ' + bookingData.studentMessage : '');
    
    const encodedMessage = encodeURIComponent(message);
    return 'https://wa.me/' + teacherInfo.whatsapp + '?text=' + encodedMessage;
}

if (whatsappBtn) {
    whatsappBtn.addEventListener('click', function() {
        if (window.bookingData) {
            const link = generateWhatsAppLink(window.bookingData);
            window.open(link, '_blank');
            closeBookingModal();
        }
    });
}

if (closeSuccessBtn) {
    closeSuccessBtn.addEventListener('click', closeBookingModal);
}

if (whatsappContactBtn) {
    whatsappContactBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const message = 'مرحبًا أستاذ ' + teacherInfo.name + '،\nأود الاستفسار عن الكورسات المتاحة.';
        const encodedMessage = encodeURIComponent(message);
        window.open('https://wa.me/' + teacherInfo.whatsapp + '?text=' + encodedMessage, '_blank');
    });
}

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const contactName = document.getElementById('contactName').value.trim();
        const contactPhone = document.getElementById('contactPhone').value.trim();
        const contactGrade = document.getElementById('contactGrade').value;
        const contactMessage = document.getElementById('contactMessage').value.trim();
        
        if (!contactName || !contactPhone || !contactMessage) {
            ['contactName', 'contactPhone', 'contactMessage'].forEach(id => {
                const el = document.getElementById(id);
                if (!el.value.trim()) {
                    el.classList.add('error');
                    setTimeout(() => el.classList.remove('error'), 2000);
                }
            });
            return;
        }
        
        const message = 'مرحبًا أستاذ ' + teacherInfo.name + '،\n' +
                       'الاسم: ' + contactName + '\n' +
                       'رقم الهاتف: ' + contactPhone +
                       (contactGrade ? '\nالصف: ' + contactGrade : '') +
                       '\n\n' + contactMessage;
        
        const encodedMessage = encodeURIComponent(message);
        
        if (contactSuccess) {
            contactSuccess.hidden = false;
            setTimeout(() => {
                contactSuccess.hidden = true;
            }, 5000);
        }
        
        window.open('https://wa.me/' + teacherInfo.whatsapp + '?text=' + encodedMessage, '_blank');
        
        contactForm.reset();
    });
}

document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
        if (this.value.length > 11) {
            this.value = this.value.slice(0, 11);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach(img => {
        if (!img.closest('.hero')) {
            img.setAttribute('loading', 'lazy');
        }
    });
});

const footerBottom = document.querySelector('.footer-bottom p');
if (footerBottom) {
    const year = new Date().getFullYear();
    footerBottom.textContent = 'جميع الحقوق محفوظة © ' + year + ' عادل عيد';
}

document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initCounterAnimation();
    animateHero();
    
    if (bookingModal) {
        bookingModal.classList.remove('open');
        bookingModal.setAttribute('aria-hidden', 'true');
    }
    
    const formCourseId = document.getElementById('formCourseId');
    const formCourseTitle = document.getElementById('formCourseTitle');
    if (formCourseId && formCourseTitle) {
        formCourseId.value = 'basic-lecture';
        formCourseTitle.value = 'المحاضرة الأساسية';
    }
});

window.teacherInfo = teacherInfo;
window.courses = courses;
window.showPage = showPage;
