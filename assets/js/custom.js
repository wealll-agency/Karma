/**
 * KARMA INTERNATIONAL - Custom JavaScript
 * assets/js/custom.js
 */

(function ($) {
  'use strict';

  $(document).ready(function () {
    // 1. Header scroll effect
    const $header = $('.site-header');

    $(window).on('scroll', function () {
      if ($(this).scrollTop() > 30) {
        $header.addClass('scrolled');
      } else {
        $header.removeClass('scrolled');
      }
    });

    // Trigger on page load in case user is already scrolled
    if ($(window).scrollTop() > 30) {
      $header.addClass('scrolled');
    }

    // 2. Mobile nav toggle close on link click
    $('.navbar-nav .nav-link').on('click', function () {
      if ($(window).width() < 992) {
        $('.navbar-collapse').collapse('hide');
      }
    });

    // 3. Hero Section Slider Sync (Bootstrap 5 Carousel)
    const heroSlider = document.getElementById('heroSlider');
    if (heroSlider) {
      heroSlider.addEventListener('slide.bs.carousel', function (event) {
        $('.hero-pagination .page-num').removeClass('active');
        $('.hero-pagination .page-num').eq(event.to).addClass('active');
      });
    }

    // 4. "AS FEATURED IN" Press Logo Slider (Owl Carousel)
    const $featuredCarousel = $('.featured-carousel');
    if ($featuredCarousel.length) {
      $featuredCarousel.owlCarousel({
        loop: true,
        margin: 20,
        autoplay: true,
        autoplayTimeout: 3200,
        autoplayHoverPause: true,
        smartSpeed: 600,
        dots: false,
        nav: false,
        responsive: {
          0: {
            items: 2,
            margin: 10
          },
          480: {
            items: 3,
            margin: 12
          },
          768: {
            items: 4,
            margin: 14
          },
          992: {
            items: 5,
            margin: 16
          },
          1200: {
            items: 6,
            margin: 16
          }
        }
      });

      // Custom Navigation chevrons
      $('.featured-prev').on('click', function () {
        $featuredCarousel.trigger('prev.owl.carousel');
      });

      $('.featured-next').on('click', function () {
        $featuredCarousel.trigger('next.owl.carousel');
      });
    }

    // 5. Events Section Horizontal Slider
    const eventsTrack = document.getElementById('eventsCardsTrack');
    const eventsPrevBtn = document.getElementById('eventsPrevBtn');
    const eventsNextBtn = document.getElementById('eventsNextBtn');

    if (eventsTrack && eventsPrevBtn && eventsNextBtn) {
      let scrollIndex = 0;
      
      const updateSlider = () => {
        if (!eventsTrack.children.length) return;
        const cardWidth = eventsTrack.children[0].offsetWidth;
        const gap = 20; 
        const offset = (cardWidth + gap) * scrollIndex;
        eventsTrack.style.transform = `translateX(-${offset}px)`;
      };

      eventsNextBtn.addEventListener('click', function() {
        const visibleCards = window.innerWidth < 576 ? 1 : (window.innerWidth < 992 ? 2 : 3);
        const maxIndex = eventsTrack.children.length - visibleCards;
        
        if (scrollIndex < maxIndex) {
          scrollIndex++;
          updateSlider();
        }
      });

      eventsPrevBtn.addEventListener('click', function() {
        if (scrollIndex > 0) {
          scrollIndex--;
          updateSlider();
        }
      });
      
      window.addEventListener('resize', function() {
        const visibleCards = window.innerWidth < 576 ? 1 : (window.innerWidth < 992 ? 2 : 3);
        const maxIndex = eventsTrack.children.length - visibleCards;
        if (scrollIndex > maxIndex) {
           scrollIndex = Math.max(0, maxIndex);
        }
        updateSlider();
      });
    }
  });
})(jQuery);
