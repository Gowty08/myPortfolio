 document.addEventListener('DOMContentLoaded', function() {
      // Mobile Menu Toggle
      const menuToggle = document.querySelector('.menu-toggle');
      const navLinks = document.querySelector('.nav-links');
      
      menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.innerHTML = navLinks.classList.contains('active') ? 
          '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
      });

      // Close mobile menu when clicking a link
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('active');
          menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
      });

      // Header scroll effect
      window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        header.classList.toggle('scrolled', window.scrollY > 50);
      });

      // Back to top button
      const backToTop = document.querySelector('.back-to-top');
      window.addEventListener('scroll', () => {
        backToTop.classList.toggle('active', window.scrollY > 300);
      });

      // Animate stats counter
      const statNumbers = document.querySelectorAll('.stat-number');
      const animateStats = () => {
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-count'));
          const duration = 2000;
          const step = target / (duration / 16);
          let current = 0;

          const updateCount = () => {
            current += step;
            if (current < target) {
              stat.textContent = Math.floor(current);
              requestAnimationFrame(updateCount);
            } else {
              stat.textContent = target;
            }
          };

          updateCount();
        });
      };

      // Intersection Observer for animations
      const observerOptions = { threshold: 0.1 };
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (entry.target.id === 'about') animateStats();
            entry.target.classList.add('animated');
          }
        });
      }, observerOptions);

      document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
      });

      // Open project links in a new tab
      document.querySelectorAll('.project a').forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      });

      // Form submission
      const contactForm = document.getElementById('contactForm');
      if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
          e.preventDefault();
          alert('Thank you for your message! I will get back to you soon.');
          contactForm.reset();
        });
      }

      // Animate skill bars
      const skillBars = document.querySelectorAll('.progress-bar');
      const animateSkillBars = () => {
        skillBars.forEach(bar => {
          const width = bar.style.width;
          bar.style.width = '0';
          setTimeout(() => {
            bar.style.width = width;
          }, 100);
        });
      };

      const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateSkillBars();
            skillsObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });

      const skillsSection = document.querySelector('.skills');
      if (skillsSection) {
        skillsObserver.observe(skillsSection);
      }
    });