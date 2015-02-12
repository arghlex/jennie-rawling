
(function(preloadImages){
    var galleryImgSrc = $('.gallery a'),
        tmpArr = [];
    $.each(galleryImgSrc, function(){
      tmpArr.push($(this).attr('href'));
    });
    var preload = function(arr) {
      for (var i = 0; i < arr.length; i++){
        $('<img />').attr('src', arr[i]);
      }  
    }
    preload(tmpArr);
})();

(function(setSectionHeight){
    var sections = $('.head, .contact'); 
    var jumpTo = function(e) {
      e.preventDefault();
      var anchor = $(this).attr('href');
      var topOffset = $(anchor).offset().top;
      $('html, body').animate({ scrollTop: topOffset }, 500);
    }
    var sectionHeight = function() {
      var windowHeight = $(window).height();
      sections.css('min-height', windowHeight);
    }
    // John Hann Debounce
    var debounce = function (func, threshold, execAsap) {
        var timeout;
        return function debounced () {
            var obj = this, args = arguments;
            function delayed () {
                if (!execAsap)
                    func.apply(obj, args);
                timeout = null; 
            };
            if (timeout)
                clearTimeout(timeout);
            else if (execAsap)
                func.apply(obj, args);
            timeout = setTimeout(delayed, threshold || 100); 
        };
    }
    sectionHeight();
    $('.nav-main a').on('click', jumpTo);
    $(window).on('resize', debounce(sectionHeight, 100, false));
})();

(function(imgGallery){
    var galleryItems = $('.gallery a'),
        pswpElement = $('.pswp')[0],
        slides = [];
    galleryItems.each(function(i,e){
      var dimensions = $(this).data('size').split('x'),
          imgLg = $(this).attr('href'),
          imgSm = $(this).find('img').attr('src'),
          slide = {
            src: imgLg,
            w: parseInt(dimensions[0], 10),
            h: parseInt(dimensions[1], 10),
            msrc: imgSm
      }
      slides.push(slide);
    });
    galleryItems.on('click', function(e){
      e.preventDefault();
      var itemIndex = $(this).parent().index();
      var options = {
          index: itemIndex
      };
      var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, slides, options);
      gallery.init();
    });

})();
