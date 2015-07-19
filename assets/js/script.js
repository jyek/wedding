(function($) {

  var mobileBreakpoint = 720;
  var prevWindowWidth = $(window).innerWidth();
  $(window).resize(function () {
    initResizeJs();
  });
  initLoading();

  function initLoading() {
    var icons = $('.icon-holder'),
        i = 0, timer;

    $('.loading-section').height($(window).innerHeight());
    animateLoading();

    function animateLoading() {
      $('.loading-section').ready(function() {
        setTimeout(function() { $('.loading-logo').addClass('is-showing'); }, 1000);
        setTimeout(function() { $('.loading-banner').addClass('is-showing'); }, 1000);
        setTimeout(function() {
          animateIcons();
          $('#content-load').load('home.html', function(){
            setTimeout(function(){
              initScroll();
              initCountdown();
              initBannerList();
              initMobile();
              doPageTransition();
              $('.main').fadeIn(1000);
            }, 0);
          });
        }, 0);
      });
    }

    function doPageTransition(){
      $('.loading-logo').addClass('is-fading');
      $('.loading-banner').addClass('is-fading');
      $('.loading-section').animate({ height: 0 }, 0);
      //setTimeout(function() { $('body').removeClass('no-scroll'); }, 1000);
    }

    function animateIcons() {
      $(icons[i]).addClass("beat");
      if(i < icons.length) {
        i++;
      } else {
        i = 0;
        setTimeout(function() { icons.removeClass("beat"); }, 500);
      }

      timer = setTimeout(function() { animateIcons(); }, 500);
    }
  }

  $.fn.bannerSlides = function (options) {

  if (this.length > 1) {
    this.each(function () { $(this).bannerSlides(options) });
    return this;
  }

  var that = this;

    this.slideContainer = $(this),
    this.slides = that.slideContainer.find('li'),
    this.transitionTime = 1300,
    this.delay = 7000,
    this.index = 1,
    this.loadingSpan = $('.loading-bar span');

    this.initialize = function () {
      setTimeout(function() { that.loadingSpan.addClass('loading'); }, that.transitionTime);
    setTimeout(function() { that.doTransition(1); that.setLoadingClass(); }, that.delay);
  };

    this.doTransition = function(index) {
      if(index < that.slides.length)
      {
        $(that.slides[index - 1]).fadeOut(that.transitionTime);
        $(that.slides[index]).fadeIn(that.transitionTime);
        index++;
      }
      else
      {
        $(that.slides[that.slides.length - 1]).fadeOut(that.transitionTime);
        $(that.slides[0]).fadeIn(that.transitionTime);
        index = 1;
      }
      setTimeout(function() { that.doTransition(index); that.setLoadingClass(); }, that.delay);
    }

    this.setLoadingClass = function() {
      that.loadingSpan.removeClass('loading');
      //setTimeout(function() { that.loadingSpan.removeClass('loading'); }, that.transitionTime - 10);
      setTimeout(function() { that.loadingSpan.show().addClass('loading'); }, that.transitionTime);
    }

    return this.initialize();
  }

  function initCountdown() {
    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
    var today = new Date();
    var secondDate = new Date(2016,3,19);

    var diffDays = Math.round(Math.abs((today.getTime() - secondDate.getTime())/(oneDay)));
    $('.countdown__number').text(diffDays);
  }

  function initBannerList() {
    if($('.banner-list').length) {
      $('.banner-list').bannerSlides();
    }
  }

  function initScroll() {
  var navHeight = $('.navigation-container').innerHeight();
    $(window).on("scroll", function(){
      if($(window).scrollTop() > 200) {
        $('.navigation-container').addClass('is-visible');
      } else {
        $('.navigation-container').removeClass('is-visible');
      }
    });
    $('.navigation-container li a').click(function (e) {
    var target = $(this).attr("href");
    if(target.search("mailto") < 0) {
      e.preventDefault();
      var targetTop = $(target).offset().top;
      $('.hamburger').trigger("click");
      $('html, body').animate({ scrollTop: targetTop - navHeight }, 'slow');
    }
  });
    $('.top-link, .header-logo').click(function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 'slow', 'swing');
  });
  }

  function initMobile() {
    if($(window).innerWidth() < 720) {
      $('.two-column-holder__column-one ul li:last-child').appendTo($('.two-column-holder__column-two ul'));
      initHamburger();
      var mobileLogo = $('.logo-container img').data("mobile-logo");
      $('.logo-container img').attr("src", mobileLogo);
    }
  }

  function initHamburger() {
    $('.hamburger').on("click", function(){
      $(this).toggleClass("close");
      $('.navigation ul').slideToggle(300);
    });
  };

  function initResizeJs() {
    if (($(window).innerWidth() <= mobileBreakpoint && prevWindowWidth > mobileBreakpoint) || ($(window).innerWidth() > mobileBreakpoint && prevWindowWidth <= mobileBreakpoint)) {
      window.location.href = window.location.href;
    }
    prevWindowWidth = $(window).innerWidth();
  }

})(jQuery);