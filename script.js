$(document).ready(function() {

  // Smooth scrolling for all anchor links
  $('a[href^="#"]').on('click', function(event) {
    var target = $(this.getAttribute('href'));
    if (target.length) {
      event.preventDefault();
      $('html, body').stop().animate({
        scrollTop: target.offset().top - 60
      }, 1000, 'easeInOutQuart');
    }
  });

  // Sticky header with smooth transition
  $(window).scroll(function() {
    if ($(this).scrollTop() > 50) {
      $(".header-area").addClass("sticky");
      $(".FirstElement").addClass("adjusted-padding");
    } else {
      $(".header-area").removeClass("sticky");
      $(".FirstElement").removeClass("adjusted-padding");
    }
    
    // Update active section
    updateActiveSection();
  });

  // Header navigation with active states
  $(".header ul li a").click(function(e) {
    e.preventDefault();
    
    var target = $(this).attr("href");
    
    if (target === "#home") {
      $("html, body").animate({
        scrollTop: 0
      }, 800, 'easeInOutQuart');
    } else {
      var offset = $(target).offset().top - 60;
      $("html, body").animate({
        scrollTop: offset
      }, 800, 'easeInOutQuart');
    }
    
    // Update active state
    $(".header ul li a").removeClass("active");
    $(this).addClass("active");
  });

  // Mobile menu toggle
  $(".menu_icon").click(function() {
    $(".header ul").toggleClass("mobile-menu");
  });

  // Enhanced ScrollReveal animations
  ScrollReveal({
    distance: "60px",
    duration: 1500,
    delay: 200,
    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    interval: 100
  });

  // Reveal animations for different sections
  ScrollReveal().reveal(".header a, .profile-photo", {
    origin: "left",
    delay: 300
  });
  
  ScrollReveal().reveal(".header ul, .profile-text", {
    origin: "right",
    delay: 400
  });
  
  ScrollReveal().reveal(".about-content", {
    origin: "left",
    delay: 200
  });
  
  ScrollReveal().reveal(".about-skills", {
    origin: "right",
    delay: 300
  });
  
  ScrollReveal().reveal(".skills-title", {
    origin: "top",
    delay: 200
  });
  
  ScrollReveal().reveal(".skill-category", {
    origin: "bottom",
    delay: 200,
    interval: 150
  });
  
  ScrollReveal().reveal(".experience-title", {
    origin: "top",
    delay: 200
  });
  
  ScrollReveal().reveal(".experience-card", {
    origin: "bottom",
    delay: 200,
    interval: 150
  });
  
  ScrollReveal().reveal(".education", {
    origin: "left",
    delay: 200
  });
  
  ScrollReveal().reveal(".internship", {
    origin: "right",
    delay: 300
  });
  
  ScrollReveal().reveal(".project-title", {
    origin: "top",
    delay: 200
  });
  
  ScrollReveal().reveal(".project", {
    origin: "bottom",
    delay: 200,
    interval: 150
  });

  ScrollReveal().reveal(".testimonials-title", {
    origin: "top",
    delay: 200
  });
  
  ScrollReveal().reveal(".testimonial-card", {
    origin: "bottom",
    delay: 200,
    interval: 150
  });

  // Project hover effects
  $('.project').hover(
    function() {
      $(this).find('i').addClass('animate-icon');
    },
    function() {
      $(this).find('i').removeClass('animate-icon');
    }
  );

  // Typing animation for the name
  if (typeof Typed !== 'undefined') {
    new Typed('.typing-text h2', {
      strings: ['Dibas Mainali', 'Frontend Developer', 'Web Designer', 'UI/UX Enthusiast'],
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
      loop: true,
      showCursor: true,
      cursorChar: '|'
    });
  }

  // Enhanced form submission
  const sendButton = document.getElementById('sendButton');
  
  sendButton.addEventListener('click', function(event) {
    event.preventDefault();
    
    // Add loading state
    this.classList.add('loading');
    
    // Simulate form processing
    setTimeout(function() {
      sendButton.classList.remove('loading');
      sendButton.classList.add('success');
      
      // Reset after animation
      setTimeout(function() {
        sendButton.classList.remove('success');
        sendButton.closest('form').submit();
      }, 2000);
    }, 1500);
  });

  // Smooth scroll to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 300) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  $('.scroll-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 800, 'easeInOutQuart');
  });

  // Parallax effect for profile photo
  // (Removed as per user request)
  // $(window).scroll(function() {
  //   var scrolled = $(this).scrollTop();
  //   var parallax = $('.profile-photo');
  //   var speed = 0.5;
  //   parallax.css('transform', 'translateY(' + (scrolled * speed) + 'px)');
  // });

});

// Update active section function
function updateActiveSection() {
  var scrollPosition = $(window).scrollTop();
  
  // Check if at top
  if (scrollPosition < 100) {
    $(".header ul li a").removeClass("active");
    $(".header ul li a[href='#home']").addClass("active");
    return;
  }
  
  // Check each section
  $("section, .FirstElement").each(function() {
    var target = $(this).attr("id");
    if (!target) return;
    
    var offset = $(this).offset().top;
    var height = $(this).outerHeight();
    
    if (scrollPosition >= offset - 100 && scrollPosition < offset + height - 100) {
      $(".header ul li a").removeClass("active");
      $(".header ul li a[href='#" + target + "']").addClass("active");
    }
  });
}

// Add CSS easing function
$.easing.easeInOutQuart = function (x, t, b, c, d) {
  if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
  return -c/2 * ((t-=2)*t*t*t - 2) + b;
};
  

 