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
    // 6. Stats Counter Animation
    $('.counter').each(function () {
      $(this).prop('Counter', 0).animate({
        Counter: $(this).data('target')
      }, {
        duration: 2000,
        easing: 'swing',
        step: function (now) {
          $(this).text(Math.ceil(now));
        }
      });
    });

    // 7. Events Carousel (Owl Carousel fallback/alternative)
    if ($('.events-carousel').length) {
      var eventsOwl = $('.events-carousel').owlCarousel({
        loop: true,
        margin: 24,
        nav: false,
        dots: false,
        autoplay: false,
        responsive: {
          0: { items: 1 },
          768: { items: 2 },
          1024: { items: 2 },
          1200: { items: 3 }
        }
      });
      $('#upcomingNextBtn').click(function () { eventsOwl.trigger('next.owl.carousel'); });
      $('#upcomingPrevBtn').click(function () { eventsOwl.trigger('prev.owl.carousel'); });
    }

    // 8. Gallery Carousel
    if ($('.gallery-carousel').length) {
      var galleryOwl = $('.gallery-carousel').owlCarousel({
        loop: true,
        margin: 15,
        nav: false,
        dots: false,
        autoplay: true,
        autoplayTimeout: 4000,
        responsive: {
          0: { items: 1 },
          576: { items: 2 },
          768: { items: 3 },
          1024: { items: 4 }
        }
      });
      $('#galleryNextBtn').click(function () { galleryOwl.trigger('next.owl.carousel'); });
      $('#galleryPrevBtn').click(function () { galleryOwl.trigger('prev.owl.carousel'); });
    }

    // 9. Premium Testimonial Carousel
    if ($('.premium-testimonial-carousel').length) {
      var sponsorOwl = $('.premium-testimonial-carousel').owlCarousel({
        items: 1,
        loop: true,
        margin: 0,
        nav: false,
        dots: false,
        autoplay: true,
        autoplayTimeout: 5000
      });
      $('.premium-next-btn').click(function () { sponsorOwl.trigger('next.owl.carousel'); });
      $('.premium-prev-btn').click(function () { sponsorOwl.trigger('prev.owl.carousel'); });
    }

    // 10. Gallery Filter & Search Logic
    $('.gallery-filter-btn').on('click', function() {
        $('.gallery-filter-btn').removeClass('active');
        $(this).addClass('active');
        let filter = $(this).text().toLowerCase();
        
        if (filter === 'all') {
            $('.grid-item').fadeIn(400);
        } else {
            $('.grid-item').hide();
            $('.grid-item').filter(function() {
                return $(this).data('category') === filter;
            }).fadeIn(400);
        }
    });

    // 11. Gallery Search
    $('.gallery-search-input').on('keyup', function() {
        let query = $(this).val().toLowerCase();
        $('.grid-item').each(function() {
            let title = $(this).data('title') ? $(this).data('title').toLowerCase() : '';
            if (title.indexOf(query) > -1) {
                $(this).fadeIn(400);
            } else {
                $(this).hide();
            }
        });
    });

    // 12. Image Lightbox Logic
    $('.grid-item').not('.grid-text-item').on('click', function() {
        let imgSrc = $(this).find('img').attr('src');
        if (imgSrc) {
            $('#lightboxImage').attr('src', imgSrc);
            $('#imageModal').modal('show');
        }
    });

    // 13. Video Modal Logic
    $('.open-video-modal').on('click', function() {
        let url = $(this).data('video-url');
        if (url) {
            let encodedUrl = encodeURIComponent(url);
            let iframe = `<iframe src="https://www.facebook.com/plugins/video.php?height=476&href=${encodedUrl}&show_text=false&width=267&t=0" width="267" height="476" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>`;
            $('#videoContainer').html(iframe);
            $('#videoModal').modal('show');
        }
    });

    // Clear video src when modal closes to stop playback
    $('#videoModal').on('hidden.bs.modal', function () {
        $('#videoContainer').html('');
    });
  });
})(jQuery);



