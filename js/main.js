// open and close the hamburger menu
$('#hamburger').on('click', function(){
    $('nav').animate({left: 0});
});
$('.close-nav').on('click', function(){
    $('nav').animate({left: '100%'});
});
$(window).on('resize', function(){
    $('nav').removeAttr('style');
});

// close the mobile nav, to view index page sections
$('#see-about, #see-projects').on('click', function() {
    $('nav').animate({left: '100%'});
});

$(window).on('scroll', function() {
    let about = $('#about');
    let transparentZone = about.offset().top - $(window).scrollTop();
    let vanishingPoint = $('#hero').height() * .75;

    // if vanishingPoint is below transparentZone
    if (transparentZone < vanishingPoint) {
        // hide the contents of #hero-wrapper
        $('#hero-wrapper').css('opacity', 0);
    } else {
        // reveal them
        $('#hero-wrapper').css('opacity', 1);
    }
});