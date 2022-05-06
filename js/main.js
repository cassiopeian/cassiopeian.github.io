const karteikarten = {
    name: 'karteikarten',
    images: ['./images/projects/karteikarten/karteikarten-1.png',
    './images/projects/karteikarten/karteikarten-2.png',
    './images/projects/karteikarten/karteikarten-3.png'],
    imgIndex: 0
};

const aisudoku = {
    name: 'aisudoku',
    images: ['./images/projects/aisudoku/aisudoku-1.png',
    './images/projects/aisudoku/aisudoku-2.png',
    './images/projects/aisudoku/aisudoku-3.png'],
    imgIndex: 0
};

const caseConverter = {
    name: 'case-converter',
    images: ['./images/projects/case-converter/case-converter-1.png',
    './images/projects/case-converter/case-converter-2.png',
    './images/projects/case-converter/case-converter-3.png'],
    imgIndex: 0
};

const dogAgeCalculator = {
    name: 'dog-age-calculator',
    images: ['./images/projects/dog-age-calculator/dog-age-calculator-1.png',
    './images/projects/dog-age-calculator/dog-age-calculator-2.png',
    './images/projects/dog-age-calculator/dog-age-calculator-3.png'],
    imgIndex: 0
};

const memoryGame = {
    name: 'memory-game',
    images: ['./images/projects/memory-game/memory-game-1.png',
    './images/projects/memory-game/memory-game-2.png',
    './images/projects/memory-game/memory-game-3.png'],
    imgIndex: 0
};

const magicEightBall = {
    name: 'magic-eight-ball',
    images: ['./images/projects/magic-eight-ball/magic-eight-ball-1.png',
    './images/projects/magic-eight-ball/magic-eight-ball-2.png',
    './images/projects/magic-eight-ball/magic-eight-ball-3.png'],
    imgIndex: 0
}

const slides = [karteikarten, aisudoku, caseConverter, dogAgeCalculator, memoryGame, magicEightBall];

function setCardHeights() {
    tallestCard = $('#tallest-card').innerHeight();

    // use the tallest card's height to set the height for all cards
    $('.card-height').css('height', tallestCard);
};

$(window).on('load', function() {
    setCardHeights();
});

// open and close the hamburger menu
$('#hamburger').on('click', function(){
    $('nav').animate({left: 0});
});
$('.close-nav').on('click', function(){
    $('nav').animate({left: '100%'});
});
$(window).on('resize', function(){
    $('nav').removeAttr('style');

    setCardHeights();
});

// close the mobile nav, to view index page sections
$('#see-about, #see-projects').on('click', function() {
    $('nav').removeAttr('style');
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

    function constellationGlow() {
        // play the star-pulse keyframes animation
        $('#constellation').addClass('star-pulse');

        setTimeout(function() {
            // remove the animation, so it can be replayed
            $('#constellation').removeClass('star-pulse');
        }, 2000);
    }

    // if the header is over the...
    if (headerHeight > projectsTop) {
        // projects section: make the header bg color blue
        $('header').css('backgroundColor', 'rgb(121, 141, 175)');
        // display the default constellation
        $('#constellation').attr('src', './images/stars/constellation.svg');
        constellationGlow();
    } else if (headerHeight > aboutTop) {
        // about section: make the header bg color olive
        $('header').css('backgroundColor', 'rgb(106, 120, 86)');
        // display the yellow constellation
        $('#constellation').attr('src', './images/stars/yellow-constellation.svg');
        constellationGlow();
    } else {
        // hero section: make the header bg color charcoal 
        $('header').css('backgroundColor', 'rgb(32, 30, 30)');
        // display the default constellation
        $('#constellation').attr('src', './images/stars/constellation.svg');
        constellationGlow();
    }
});

// move project-card slideshow forward
$('.prev').on('click', function() {
    slides.forEach(obj => {
        // if the object's name matches a .card-image id
        if (obj.name == $(this).siblings('img').attr('id')) {
            // decrease imgIndex's value by 1
            obj.imgIndex -= 1;
            
            // move the active dot backward
            $(this).siblings('div').find('.current-dot').removeClass('current-dot').prev().addClass('current-dot');

            // if the first image is displayed
            if (obj.imgIndex < 0) {
                // jumpt to the end of the obj.images array
                obj.imgIndex = 2;

                // send the active dot to the end
                $(this).siblings('div').children().last().addClass('current-dot');
            }

            // update the appropriate card image
            $(this).siblings('img').fadeTo(250, .7).fadeTo(100, 1).attr('src', obj.images[obj.imgIndex]);

            console.log(`${obj.name} index is ${obj.imgIndex}`);
        }
    });
});

// move project-card slideshow backward
$('.next').on('click', function() {
    // if the object's name matches a .card-image id
    slides.forEach(obj => {
        if (obj.name == $(this).siblings('img').attr('id')) {
            // increase imgIndex's value by 1
            obj.imgIndex += 1;

            // move the active dot forward
            $(this).siblings('div').find('.current-dot').removeClass('current-dot').next().addClass('current-dot');

            // if the last image is displayed
            if (obj.imgIndex == obj.images.length) {
                // jump to the beginning of the obj.images array
                obj.imgIndex = 0;

                // send the active dot back to the beginning
                $(this).siblings('div').children().first().addClass('current-dot');
            }

            // update the appropriate card image
            $(this).siblings('img').fadeTo(250, .7).fadeTo(100, 1).attr('src', obj.images[obj.imgIndex]);

            console.log(`${obj.name} index is ${obj.imgIndex}`);
        }
    });
});

$('.carousel-dot').on('click', function() {
    let allImages = [];
    let dots = $('.carousel-dot');
    
    // create a .carousel-dot array
    let dotsArr = Array.from(dots);
    
    // grab the index of whichever dot is clicked
    let dotIndex = dotsArr.indexOf(this);

    // group the dotIndex positions
    let firstDotArr = [0, 3, 6, 9, 12, 15];
    let middleDotArr = [1, 4, 7, 10, 13, 16];
    let lastDotArr = [2, 5, 8, 11, 14, 17];
    
    // loop through each object in the slides array
    slides.forEach(obj => {
        // and add each obj.images file path to the allImages array
        allImages.push.apply(allImages, obj.images);
    });

    // traverse up to the img associated with the clicked dot, and update the src with the allImages path that matches the dotIndex position
    $(this).parent().siblings('img').fadeTo(250, .7).fadeTo(100, 1).attr('src', allImages[dotIndex]);

    // ensure there's only one "current dot" in each carousel
    $(this).addClass('current-dot').siblings().removeClass('current-dot');

    // update obj.imgIndex, so there are no discrepancies with the prev/next functions
    slides.forEach(obj => {
        // group the dotIndex positions by object, so the correct object can be targeted, when the imgIndex is updated, below
        if (dotIndex <= 2) {
            obj = karteikarten;
        } else if (dotIndex >= 3 && dotIndex <= 5) {
            obj = aisudoku;
        } else if (dotIndex >= 6 && dotIndex <= 8) {
            obj = caseConverter;
        } else if (dotIndex >= 9 && dotIndex <= 11) {
            obj = dogAgeCalculator;
        } else if (dotIndex >= 12 && dotIndex <= 14) {
            obj = memoryGame;
        } else if (dotIndex >= 15 && dotIndex <= 17) {
            obj = magicEightBall;
        }

        // based on the given dot's position
        if (firstDotArr.includes(dotIndex) === true) {
            // update the object's imageIndex
            obj.imgIndex = 0;
        } else if (middleDotArr.includes(dotIndex) === true) {
            obj.imgIndex = 1;
        } else if (lastDotArr.includes(dotIndex) === true) {
            obj.imgIndex = 2;
        }

        console.log(`${obj.name} index is ${obj.imgIndex}`);
    });
});

// ------------------
// ILLUSTRATION PAGE
// ------------------

$('.parallelogram').on('click', function() {
    // if only one pattern is displayed
    if ($(this).siblings().css('width') === '0px') {
        // reset the width of all parallelograms
        $('.parallelogram').animate({
            width: '20%'
        }, 2000);
    } else {
        // if one parallelogram is selected
        $(this).animate({
            // expand its width to 100%
            width: '100%'
        }, 2000).siblings().animate({
            // and shrink the rest to nothing
            width: '0px'
        }, 2000);
    }
});

$('.parallelogram').on('mouseenter', function() {
    // expand the one being hovered over, and shrink the rest
    $(this).animate({
        width: '60%'
    }, 1000).siblings().animate({
        width: '10%'
    }, {queue: false,
        duration: 1000});
});

$('.parallelogram').on('mouseleave', function() {
    // reset all parallelograms to an equal width
    $('.parallelogram').animate({
        width: '20%'
    }, {queue: false,
        duration: 1000});
});

$('#sloth').hover(
    function() {
    $(this).attr('src', './images/menus/sloth-menu-hover.svg');
}, function() {
    $(this).attr('src', './images/menus/sloth-menu.svg');
});

// recreate hover effect, when sloth hover button is clicked
$('#sloth-hover').on('click', function() {
    $('#sloth').attr('src', './images/menus/sloth-menu-hover.svg');
    
    setTimeout(function() {
        $('#sloth').attr('src', './images/menus/sloth-menu.svg');
    }, 800); 
});

// recreate hover effect, when highlighters hover button is clicked
$('#highlighters-hover').on('click', function() {
    // if the close x is displayed
    if ($('#highlighters').css('display') === 'none') {
        // rotate the background gradient
        $('#highlighters-x-bg').css('backgroundImage', 'linear-gradient(rgb(237, 79, 84), rgb(237, 160, 117))');
        // spin the x
        $('#highlighters-x').css({'transform': 'rotate(360deg)', 'transition': 'transform 2s'});

        // reset the gradient and the x, after a second
        setTimeout(function() {
            $('#highlighters-x-bg').css('backgroundImage', 'linear-gradient(rgb(236, 123, 82), rgb(239, 82, 84))');

            $('#highlighters-x').css({'transform': '', 'transition': 'transform 0s'});
        }, 1000);
    } else {
        // slide the highlighter pens
        $('#highlighter-pens').css('transform', 'translateX(6.5px)');
    
        // reset the highlighters, after a second
        setTimeout(function() {
            $('#highlighter-pens').css('transform', 'translateX(-6.5px)');
        }, 1000);
    }
});

$('#highlighters-click, #highlighters-menu').on('click', function() {
    // if the button says "reset"
    if ($('#highlighters-click').html() === 'Reset') {
        // revert button text back to "click"
        $('#highlighters-click').html('Click');
        // restore the highlighters menu
        $('#highlighters').css('display', 'block');
        // hide the close x
        $('#highlighters-x-bg').css('display', 'none');
    } else {
        $('#highlighters-click').html('Reset');
        $('#highlighters').css('display', 'none');
        $('#highlighters-x-bg').css('display', 'flex');
    }
});