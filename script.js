// Import animations libraries
import AOS from 'aos';
import 'aos/dist/aos.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Swiper from 'swiper';
import 'swiper/css';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS
  AOS.init({
    duration: 1000,
    once: true,
    mirror: false
  });

  // GSAP Animations
  // Hero section animation
  gsap.from('.profile-photo', {
    duration: 1.5,
    y: 100,
    opacity: 0,
    ease: 'power4.out'
  });

  gsap.from('.profile-text h1', {
    duration: 1,
    y: 50,
    opacity: 0,
    delay: 0.5,
    ease: 'power4.out'
  });

  // Scroll animations for sections
  gsap.utils.toArray('section').forEach(section => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse'
      },
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power4.out'
    });
  });

  // Projects slider
  new Swiper('.projects', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    breakpoints: {
      640: {
        slidesPerView: 2
      },
      992: {
        slidesPerView: 3
      }
    }
  });

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

  // Smooth scrolling
  document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const target = document.querySelector(this.getAttribute('href'));
      const offset = target.offsetTop - 100;
      
      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
    });
  });

  // Mobile menu
  const menuIcon = document.querySelector('.menu_icon');
  const navbar = document.querySelector('.navbar');
  
  menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('active');
    menuIcon.querySelector('i').classList.toggle('fa-times');
  });

  // Form handling with animation
  const form = document.querySelector('form');
  const sendButton = document.getElementById('sendButton');

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    try {
      sendButton.classList.add('sending');
      
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        sendButton.classList.remove('sending');
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
      sendButton.classList.remove('sending');
      alert('Failed to send message. Please try again.');
    }
  });
});

function updateActiveSection() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.navbar a');
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.clientHeight;
    const scroll = window.pageYOffset;
    
    if (scroll >= sectionTop && scroll < sectionTop + sectionHeight) {
      const currentId = section.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}