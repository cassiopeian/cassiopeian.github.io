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

// close the mobile nav, to view the projects section
$('#see-projects').on('click', function() {
    $('nav').animate({left: '100%'});
});