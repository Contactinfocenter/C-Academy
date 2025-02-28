document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for animations
    const elements = document.querySelectorAll('.animate');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    elements.forEach(element => observer.observe(element));

    // Scroll to Top Button
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");

    window.addEventListener('scroll', function() {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
        }
    });

    scrollToTopBtn.addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});

      // JavaScript to shrink header on scroll
      window.onscroll = function() {
        var header = document.querySelector('.site-navbar');
        if (window.pageYOffset > 100) { // Change 100 to the scroll distance where you want to shrink the header
          header.classList.add('shrink');
        } else {
          header.classList.remove('shrink');
        }
      };


  