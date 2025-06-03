document.addEventListener('DOMContentLoaded', function() {
  // Sticky header
  const header = document.querySelector('.header-area');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 1) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }

    lastScroll = currentScroll;
    updateActiveSection();
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('.header ul li a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target.classList.contains('active-section')) {
        return;
      }
      
      const offset = target.offsetTop - 40;
      
      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
      
      document.querySelectorAll('.header ul li a').forEach(link => link.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Mobile menu toggle
  const menuIcon = document.querySelector('.menu_icon');
  const navbar = document.querySelector('.navbar');
  
  menuIcon.addEventListener('click', () => {
    navbar.style.display = navbar.style.display === 'flex' ? 'none' : 'flex';
  });

  // ScrollReveal animations
  const sr = ScrollReveal({
    distance: '100px',
    duration: 2000,
    delay: 200,
    reset: true
  });

  sr.reveal('.header a, .profile-photo, .about-content, .education', {
    origin: 'left'
  });
  
  sr.reveal('.header ul, .profile-text, .about-skills, .internship', {
    origin: 'right'
  });
  
  sr.reveal('.project-title, .contact-title', {
    origin: 'top'
  });
  
  sr.reveal('.projects, .contact', {
    origin: 'bottom'
  });

  // Contact form handling
  const form = document.querySelector('form');
  const sendButton = document.getElementById('sendButton');

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        sendButton.classList.add('sent');
        form.reset();
        setTimeout(() => {
          sendButton.classList.remove('sent');
        }, 2000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message. Please try again.');
    }
  });
});

function updateActiveSection() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.header ul li a');
  
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 60;
    const sectionHeight = section.clientHeight;
    
    if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}