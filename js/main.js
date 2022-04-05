const karteikarten = {
    name: 'karteikarten',
    images: ['./images/projects/karteikarten/karteikarten-1.png',
    './images/projects/karteikarten/karteikarten-2.png',
    './images/projects/karteikarten/karteikarten-3.png']
};

const aisudoku = {
    name: 'aisudoku',
    images: ['./images/projects/aisudoku/aisudoku-1.png',
    './images/projects/aisudoku/aisudoku-2.png',
    './images/projects/aisudoku/aisudoku-3.png']
};

const caseConverter = {
    name: 'case-converter',
    images: ['./images/projects/case-converter/case-converter-1.png',
    './images/projects/case-converter/case-converter-2.png',
    './images/projects/case-converter/case-converter-3.png']
};

const dogAgeCalculator = {
    name: 'dog-age-calculator',
    images: ['./images/projects/dog-age-calculator/dog-age-calculator-1.png',
    './images/projects/dog-age-calculator/dog-age-calculator-2.png',
    './images/projects/dog-age-calculator/dog-age-calculator-3.png']
};

const memoryGame = {
    name: 'memory-game',
    images: ['./images/projects/memory-game/memory-game-1.png',
    './images/projects/memory-game/memory-game-2.png',
    './images/projects/memory-game/memory-game-3.png']
};

const magicEightBall = {
    name: 'magic-eight-ball',
    images: ['./images/projects/magic-eight-ball/magic-eight-ball-1.png',
    './images/projects/magic-eight-ball/magic-eight-ball-2.png',
    './images/projects/magic-eight-ball/magic-eight-ball-3.png']
}

const slides = [karteikarten, aisudoku, caseConverter, dogAgeCalculator, memoryGame, magicEightBall];
let picIndex = 0;

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
            // increase picIndex's value by 1
            picIndex -= 1;
            
            // move the active dot backward
            $(this).siblings('div').find('.current-dot').removeClass('current-dot').prev().addClass('current-dot');

            // if the first image is displayed
            if (picIndex < 0) {
                // jumpt to the end of the obj.images array
                picIndex = 2;

                // send the active dot to the end
                $(this).siblings('div').children().last().addClass('current-dot');
            }

            // update the appropriate card image
            $(this).siblings('img').fadeTo(250, .7).fadeTo(100, 1).attr('src', obj.images[picIndex]);
        }
    });
});

// move project-card slideshow backward
$('.next').on('click', function() {
    // if the object's name matches a .card-image id
    slides.forEach(obj => {
        if (obj.name == $(this).siblings('img').attr('id')) {
            // decrease picIndex's value by 1
            picIndex += 1;

            // move the active dot forward
            $(this).siblings('div').find('.current-dot').removeClass('current-dot').next().addClass('current-dot');

            // if the last image is displayed
            if (picIndex == obj.images.length) {
                // jump to the beginning of the obj.images array
                picIndex = 0;

                // send the active dot back to the beginning
                $(this).siblings('div').children().first().addClass('current-dot');
            }

            // update the appropriate card image
            $(this).siblings('img').attr('src', obj.images[picIndex]);
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
    
    // loop through each object in the slides array
    slides.forEach(obj => {
        // and add each obj.images file path to the allImages array
        allImages.push.apply(allImages, obj.images);
    });

    // traverse up to the img associated with the clicked dot, and update the src with the allImages path that matches the dotIndex position
    $(this).parent().siblings('img').attr('src', allImages[dotIndex]);

    // ensure there's only one "current dot" in each carousel
    $(this).addClass('current-dot').siblings().removeClass('current-dot');

    // update picIndex, to prevent issues with prev/next arrows
    if (dotIndex === 0 ||
        dotIndex === 3 ||
        dotIndex === 6 ||
        dotIndex === 9 ||
        dotIndex === 12 ||
        dotIndex === 15) {
            // for each carousel's first dot, picIndex is 0
            picIndex = 0;
    } else if (dotIndex === 1 ||
        dotIndex === 4 ||
        dotIndex === 7 ||
        dotIndex === 10 ||
        dotIndex === 13 ||
        dotIndex === 16) {
            // for each carousel's middle dot, picIndex is 1
            picIndex = 1;
    } else if (dotIndex === 2 ||
        dotIndex === 5 ||
        dotIndex === 8 ||
        dotIndex === 11 ||
        dotIndex === 14 ||
        dotIndex === 17) {
            // for each carousel's last dot, picIndex is 2
            picIndex = 2;
    }
});