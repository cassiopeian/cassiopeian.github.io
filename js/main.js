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
    let aboutTop = $('#about').offset().top - $(window).scrollTop();
    let vanishingPoint = $('#hero').height() * .75;
    let headerHeight = $('header').height();
    let projectsTop = Math.floor($('#projects').offset().top) - $(window).scrollTop();

    // if vanishingPoint is below aboutTop
    if (aboutTop < vanishingPoint) {
        // hide the contents of #hero-wrapper
        $('#hero-wrapper').css('opacity', 0);

        // make the about section slide up and fade in
        $('#about-wrapper').animate({
            opacity: 1,
            top: 0
        }, 800);
    } else {
        // reveal the #hero-wrapper
        $('#hero-wrapper').css('opacity', 1);
    }

    // if the header is over the...
    if (headerHeight > projectsTop) {
        // projects section: make the header bg color blue
        $('header').css('backgroundColor', 'rgb(121, 141, 175)');
    } else if (headerHeight > aboutTop) {
        // about section: make the header bg color olive
        $('header').css('backgroundColor', 'rgb(171, 169, 106)');
    } else {
        // hero section: make the header bg color charcoal 
        $('header').css('backgroundColor', 'rgb(32, 30, 30)');
    }
});