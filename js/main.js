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

function animateScrollIndicator() {
    // animate the hero section's scroll indicator
    $('#scroll-indicator').addClass('point-down');

    // reset the pointDown keyframes animation
    $('#scroll-indicator').on('animationend', function() {
        $(this).removeClass('point-down');
    });
};

animateScrollIndicator();

// animate the scroll indicator, if it's hovered over
$('#scroll-indicator').on('mouseenter', function() {
    animateScrollIndicator();
});

$(window).on('scroll', function() {
    let headerHeight = $('header').height();
    let headerColor = $('header').css('backgroundColor');
    const blueStars = './images/stars/constellation.svg';
    const yellowStars = './images/stars/yellow-constellation.svg';

    function constellationGlow() {
        // play the star-pulse keyframes animation
        $('#constellation').addClass('star-pulse');

        setTimeout(function() {
            // remove the animation, so it can be replayed
            $('#constellation').removeClass('star-pulse');
        }, 2000);
    };

    function updateHeader(bgColor, constellationColor) {
        // set the header's color
        $('header').css('backgroundColor', bgColor);
        
        // set the constellation's color
        $('#constellation').attr('src', constellationColor);
        
        constellationGlow();
    };

    // for elements on the index page
    if ($('#about, #hero, #projects').length) {
        let hero = $('#hero');
        let aboutTop = $('#about').offset().top - $(window).scrollTop();
        let vanishingPoint = $('#hero').height() * .75;
        let projectsTop = Math.floor($('#projects').offset().top) - $(window).scrollTop();

        // if vanishingPoint is below aboutTop
        if (aboutTop < vanishingPoint) {
            // hide the contents of #hero-wrapper
            $('#hero-wrapper').css('opacity', 0);

            $('#about .doodle').animate({
                opacity: 1
            }, 1000);

            // make the about section slide up and fade in
            $('#about-wrapper').animate({
                opacity: 1,
                top: 0
            }, 2000);
        } else {
            // reveal the #hero-wrapper
            $('#hero-wrapper').css('opacity', 1);
        }

        // if the index page is scrolled all the way up
        if (hero.scrollHeight === hero.clientHeight) {
            animateScrollIndicator();
        }

        // if the header is over the...
        if (headerHeight > projectsTop) {
            // projects section: make the header periwinkle blue
            updateHeader('rgb(121, 141, 175)', blueStars);
        } else if (headerHeight > aboutTop) {
            // about section: make the header olive green
            updateHeader('rgb(106, 120, 86)', yellowStars);
        } else {
            // hero section: make the header charcoal grey
            updateHeader('rgb(32, 30, 30)', blueStars);
        }
    } 

    // for elements on the illustration page
    if ($('#patterns, #menus').length) {
        let patternsTop = Math.floor($('#patterns').offset().top) - $(window).scrollTop();
        let menusTop = Math.floor($('#menus').offset().top) - $(window).scrollTop();
        let albumsTop = Math.floor($('#albums').offset().top) - $(window).scrollTop();

        // if the header is over the...
        if (headerHeight > albumsTop) {
            // albums section: make the header aubergine
            updateHeader('rgb(133, 73, 96)', blueStars);
        } else if (headerHeight > menusTop) {
            // menus section: make the header cerulean blue
            updateHeader('rgb(30, 109, 147)', yellowStars);
        } else if (headerHeight > patternsTop) {
            // patterns section: make the header jade green
            updateHeader('rgb(111, 143, 120)', yellowStars);
        } else {
            // intro section: make the header charcoal grey
            updateHeader('rgb(32, 30, 30)', blueStars);
        }
    }
    
    // update Safari tab color, as the header color changes
    $('meta[name="theme-color"]').attr('content', headerColor);
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

let bannerBuffer = $('header').outerHeight(true);
let albumImg = document.querySelector('.active-album');
let firstAlbum = document.querySelector('.first-album');

// add margin above the banner, to offset the header
$('#illustration-banner').css('margin-top', bannerBuffer);

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
    let shapeName = $(this).attr('id');

    function labelShape(label) {
        $('#pattern-name').html(label);
    };

    // expand the one being hovered over, and shrink the rest
    $(this).animate({
        width: '60%'
    }, 1000).siblings().animate({
        width: '10%'
    }, {queue: false,
        duration: 1000
    });

    // update label below the patterns
    if (shapeName === 'parallelogram1') {
        labelShape('Art Deco fans');
    } else if (shapeName === 'parallelogram2') {
        labelShape('Art Deco fish scale');
    } else if (shapeName === 'parallelogram3') {
        labelShape(`Rubik's Cubes`);
    } else if (shapeName === 'parallelogram4') {
        labelShape('Ogee Sunrise');
    } else if (shapeName === 'parallelogram5') {
        labelShape('Pupdemonium');
    }
});

$('.parallelogram').on('mouseleave', function() {
    // reset all parallelograms to an equal width
    $('.parallelogram').animate({
        width: '20%'
    }, {queue: false,
        duration: 1000
    });

    // remove the pattern label
    $('#pattern-name').html('');
});

$('#sloth').hover(
    function() {
    $(this).attr('src', './images/menus/sloth-menu-hover.svg');
}, function() {
    $(this).attr('src', './images/menus/sloth-menu.svg');
});

$('#monstera-x').hover(
    function() {
        $('#monstera-x img').attr('src', './images/menus/bitten-monstera.svg').css('opacity', '1');
    }, function() {
        $('#monstera-x img').attr('src', './images/menus/monstera.svg').css('opacity', '.6');
    }
);

// recreate hover effect, when sloth hover button is clicked
$('#sloth-hover').on('click', function() {
    if ($('#sloth-click').html() === 'Reset') {
        $('#monstera-x img').attr('src', './images/menus/bitten-monstera.svg').css('opacity', '1');

        setTimeout(function() {
            $('#monstera-x img').attr('src', './images/menus/monstera.svg').css('opacity', '.6');
        }, 800);
    } else {
        $('#sloth').attr('src', './images/menus/sloth-menu-hover.svg');
        
        setTimeout(function() {
            $('#sloth').attr('src', './images/menus/sloth-menu.svg');
        }, 800); 
    }
});

$('#sloth-click, #sloth-menu').on('click', function() {
    if ($('#sloth-click').html() === 'Reset') {
        // update button text
        $('#sloth-click').html('Click');
        // hide the close x
        $('#monstera-x').css('display', 'none');
        // display the sloth menu
        $('#sloth').css('display', 'block');

    } else {
        // update button text
        $('#sloth-click').html('Reset');
        // hide the sloth menu
        $('#sloth').css('display', 'none');
        // display the close x
        $('#monstera-x').css('display', 'flex');
    }
});

// nudge the pool cues independently, on hover
function nudgeCues(cue, wait) {
    $(cue)
    .stop(true)
    .delay(wait)
    .animate({left: '10px'}, 400)
    .queue(function() {
        $(cue).animate({left: '-15px'}, 400).dequeue()
    })
    .queue(function() {
        $(cue).animate({left: ''}, 400).dequeue()
    })
    .removeAttr('style');
};

function scissorX() {
    // rotate the top and bottom cues a bit more
    $('#top-cue').css('transform', 'rotate(320deg)');
    $('#bottom-cue').css('transform', 'rotate(35deg)');

    setTimeout(function() {
        // quickly return them to their previous positions
        $('#top-cue').removeAttr('style');
        $('#bottom-cue').removeAttr('style');
    }, 400);
}

$('#cues').on('mouseenter', function() {
    if ($('#cues-click').html() === 'Reset') {
        scissorX();
    } else {
        nudgeCues('#top-cue', 300);
        nudgeCues('#middle-cue', 0);
        nudgeCues('#bottom-cue', 600);
    }
});

$('#cues-hover').on('click', function() {
    if ($('#cues-click').html() === 'Reset') {
        scissorX();
    } else {
        nudgeCues('#top-cue', 300);
        nudgeCues('#middle-cue', 0);
        nudgeCues('#bottom-cue', 600);
    }

    // make the cues flash brighter
    $('#cues').css('filter', 'brightness(1.5)');
    
    setTimeout(function() {
        // unset the filter property
        $('#cues').css('filter', '');
    }, 800);
});

$('#cues-click, #cues').on('click', function() {
    if ($('#cues-click').html() === 'Reset') {
        // update button text
        $('#cues-click').html('Click');
        // remove the pool cue transformations
        $('#top-cue').removeClass('rotate-top-cue');
        $('#middle-cue').removeClass('hide-middle-cue');
        $('#bottom-cue').removeClass('rotate-bottom-cue');
    } else {
        // update button text
        $('#cues-click').html('Reset');
        // add the pool cue transformations
        $('#top-cue').addClass('rotate-top-cue');
        $('#middle-cue').addClass('hide-middle-cue');
        $('#bottom-cue').addClass('rotate-bottom-cue');
    }
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
            $('#highlighter-pens').css('transform', '');
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

$('#squid-popup').hover(
    function() {
        // make the squid peek above the waves
        $('#squid').show().stop(true).animate({
            top: '-25px'
        }, 800);
    }, function() {
        // make him sink back down
        $('#squid').stop(true).animate({
            top: ''
        }, 800).fadeOut('fast');
    }
);

function releaseBubbles() {
    // part the tridents, with keyframes animations 
    $('#left-trident').addClass('rotate-trident-l');
    $('#right-trident').addClass('rotate-trident-r');

    // reveal and release the bubbles
    $('#bubbles').show().stop(true).delay(500).animate({
        opacity: 1,
        bottom: '40px'
    }, 1000).fadeOut('fast');

    // make the close text brighter
    $('#tridents-x p').css('color', 'rgb(255, 255, 255)');
};

function crossTridents() {
    // cross the tridents back into an x
    $('#left-trident').removeClass('rotate-trident-l');
    $('#right-trident').removeClass('rotate-trident-r');

    // reset the bubbles animation
    $('#bubbles').removeAttr('style');
};

$('#tridents-x').hover(
    function() {
        releaseBubbles();
    }, function() {
        // return to the original text color
        $('#tridents-x p').css('color', 'rgb(217, 241, 249)');
    }
);

// when the trident animations end
$('#tridents-x').on('animationend', function() {
    crossTridents();
});

$('#waves-hover').on('click', function() {
    if ($('#waves-click').html() === 'Reset') {
        releaseBubbles();

        setTimeout(function() {
            crossTridents();

            $('#tridents-x p').css('color', 'rgb(217, 241, 249)');
        }, 2000);
    } else {
        $('#squid').show().stop(true).animate({
            top: '-25px'
        }, 800);

        setTimeout(function() {
            $('#squid').stop(true).animate({
                top: ''
            }, 800).fadeOut('fast');
        }, 1500);
    }
});

$('#waves-click, #waves-menu').on('click', function() {
    if ($('#waves-click').html() === 'Reset') {
        $('#waves-click').html('Click');
        $('#squid-popup').css('display', 'flex');
        $('#tridents-x').css('display', 'none');
    } else {
        $('#waves-click').html('Reset');
        $('#tridents-x').css('display', 'block');
        $('#squid-popup').css('display', 'none');
    }
});

$('#right').on('click', function() {
    // scroll the second album into view
    albumImg.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
    });
    
    if ($(window).width() <= 415) {
        // if the last album is displayed 
        if (albumImg === document.querySelector('.album:last-child')) {
            // send the carousel back to the beginning
            albumImg = document.querySelector('.album:first-child');
        } else {
            // move on to the next album
            albumImg = albumImg.nextElementSibling;
        }
    } else {
        // move on to the next album
        albumImg = albumImg.nextElementSibling;

        // if the last album is displayed 
        if (albumImg === document.querySelector('.album:last-child')) {
            // send the carousel back to the beginning
            albumImg = document.querySelector('.album:first-child');
        }
    }        
});

$('#left').on('click', function() {
    // scroll back to the beginning of the carousel
    firstAlbum.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
    });
});

const albumBlurbs = [
    {
        name: 'cadet-info',
        title: 'Space Cadet',
        src: './images/albums/space-cadet.svg',
        color: 'rgb(216, 157, 136)',
        info: 'Part space opera, part rock opera&NoBreak;—a Spock opera, if you will&NoBreak;—<span class="ital">Space Cadet</span> includes songs from artists like David Bowie, Stevie Nicks, Gorillaz, ELO, Elton John, and Skott.',
        link: 'https://open.spotify.com/playlist/3RXsLWC9GPv8AubYyqNCH8?si=d4b747309e404ee5'
    },
    {
        name: 'fatale-info',
        title: `Manic Pixie Kinda '60s Femme Fatale`,
        src: './images/albums/manic-sixties-femme.svg',
        color: 'rgb(238, 214, 141)',
        info: `Imagine Gidget getting jilted and going full-on <span class="ital">Gone Girl</span>. This 1960s-inspired playlist includes artists like Nancy Sinatra, Shirley Bassey, Janis Joplin, Céline Dion, Adele, and Sandie Shaw.`,
        link: 'https://open.spotify.com/playlist/6EsTIAJJFV1tt2j3yFh2KN?si=eb35b7f9fdfd4856'
    },
    {
        name: 'romcom-info',
        title: 'Rom-com Soundtrack',
        src: './images/albums/romcom-soundtrack.svg',
        color: 'rgb(232, 168, 176)',
        info: `From meet cute to HEA, this playlist pairs songs that have featured in rom-coms and songs that, well, haven’t, but seem as though they could have! This collection includes artists like Whitney Houston, Michelle Branch, Robyn, Fiona Apple, and Selena.`,
        link: 'https://open.spotify.com/playlist/6ZIVn3hqUNVvdSymktczUA?si=161008bb5794407a'
    },
    {
        name: 'out-info',
        title: 'Let Me Out',
        src: './images/albums/let-me-out.png',
        color: 'rgb(189, 189, 175)',
        info: 'Transport yourself abroad to (probably?) greener pastures, with this selection of bilingual and foreign-language songs. <span class="ital">Let Me Out</span> includes artists like Calle 13, Rammstein, Haru Nemuri, Kero Kero Bonito, BTS, and Stromae.',
        link: 'https://open.spotify.com/playlist/731YaL0szk5CXaycZa4bUi?si=b08ebf7b6ee54ed1'
    },
    {
        name: 'gfy-info',
        title: 'GFY',
        src: './images/albums/gfy.svg',
        color: 'rgb(126, 156, 124)',
        info: `We all know people who deserve a gentle suggestion to leave and get better acquainted with themselves. If you can’t tell them, this playlist is for you. Artists include Alkaline Trio, Le Tigre, Ida Maria, Arctic Monkeys, Aesop Rock, and Beastie Boys.`,
        link: 'https://open.spotify.com/playlist/4oDF0zFDuhKs9qbPz1B4ue?si=d04b31542ffa4cb2'
    },
    {
        name: 'venus-info',
        title: 'Five Petals of Venus',
        src: './images/albums/fpov_kairras.png',
        color: 'rgb(140, 150, 187)',
        info: `I created this cosmic album cover for KAIRRAS’s debut EP, <span class="ital">Five Petals of Venus</span>. The Seattle-based artist’s exploration of Afro electric funk, released in October 2020, was deemed “very epic <span class="nbsp">. . .</span> and certainly groovy” by <a href="https://www.innersleevemagazine.com/featured-media-artists/october-2020-featured-artists-week-2-kairras" target="_blank" rel="noopener noreferrer">Inner Sleeve</a> magazine.`,
        link: 'https://open.spotify.com/album/6laNtjB5mkFMEuhRyP4PM3?si=sjiIjnWXTH-yBmR1gVIwLg'
    }
];

$('.fa-circle-info').on('click', function() {
    let albumThumbnail = $('<img src="" />');
    let albumTitle = $('<h2></h2>');
    let albumInfo = $('<p class="art-page-text"></p>');
    let spotifyLink = $('<a class="spotify-link" href="" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-spotify"></i><p>Listen on Spotify</p></a>');

    // loop through the albumBlurbs albums
    albumBlurbs.forEach(album => {
        // if an album's name property matches the ID of the clicked info icon
        if (album.name === $(this).attr('id')) {
            // set the album thumbnail
            $(albumThumbnail).attr('src', album.src);
            // set that album title in an h2 element
            $(albumTitle).text(album.title);
            // set that album info in a paragraph element
            $(albumInfo).html(album.info);
            // set the spotify link
            $(spotifyLink).attr('href', album.link);

            // populate the popup's img and title
            $('#modal-head').append(albumThumbnail, albumTitle);
            // populate the info popup's blurb 
            $('#modal-text').append(albumInfo);
            // display the spotify link
            $('#modal-text').append(spotifyLink);

            //set the thumbnail's box-shadow property
            $('#modal-box img').css('boxShadow', `-15px -12px 0px 0px ${album.color}`);
            // set the border color
            $('#modal-text').css('borderColor', album.color);
        }
    });

    // display the popup
    $('#modal').css('display', 'block');
});

$('#close-modal').on('click', function() {
    // hide the album-info popup
    $('#modal').css('display', 'none');

    //clear the popup's info
    $('#modal-box div').children().detach();
    $('#modal-box').children('p').detach();
});

// set copyright year
$('#copyright-year').html(new Date().getFullYear());
