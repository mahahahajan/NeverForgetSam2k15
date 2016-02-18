(function($) {
    "use strict";
    
	// mobile navigation
    $(".open").pageslide({ direction: "left" });

    // set default search text
    $('#searchform input[type="text"]').attr('placeholder', 'Type and hit enter...');

    // check if mobile device
	var isMobile =
	{
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };
    if ( isMobile.any() )
	{
	    $('#primary').css({
	        background : '#323a45',
            padding    : '15px 0'
        });
	}
	else
	{
        // force chrome to go back to top on refresh. prevents nav bug
        $( 'html, body' ).scrollTop(0);

        // instantiate scrollreveal
        var config = {
            after: '0.02s',
            enter: 'bottom',
            move: '50px',
            over: '0.5s',
            easing: 'ease-in-out',
            viewportFactor: 0.40,
            reset: true,
            init: true
        };
        
        window.scrollReveal = new scrollReveal( config );

       
        // make sure nav stays full width on resize
        $( window ).resize( function() {
            $( "#primary" ).css({ width: '100%' });
            $( "#primary" ).css({ height: '100%' });
        });
        
        // parallax header
        $( window ).scroll( function() {
    		var scroll = $(window).scrollTop(), slowScroll = scroll / 2;
    		$( ".swiper-slide, #video-header video, #image-header img" ).css({ transform: "translateY(" + slowScroll + "px)" });
    	});
    }
    
    // modify styles if slider, video or image header active
    if ( $( "#swiper, #video-header, #image-header" ).length ) 
    {   
        $('body').addClass('hasHeader');
        
        $( "#filters" ).hide();

        $( "#folio" ).css({
            paddingTop    : '75px',
            marginTop     : '0px',
            marginBottom  : '-50px',
            borderTop     : '1px solid #f3f3f3' 
        });
        
        $( "#team" ).css({
            padding    : '75px 0 25px 0',
            marginTop  : '75px',
            borderTop  : '1px solid #f3f3f3' 
        });
    }
    
    // search
    $( '.search-button' ).click( function() {
          $('#searchform').stop(true, true).animate({
                width: ['toggle', 'swing'],
                opacity: 'toggle'
          }, 300, 'linear');
    });
    
    // primary drop menu
    $( '.navigation li' ).hover( function() {
          $(this).find('ul:first').stop(true, true).animate({
                height: ['toggle', 'swing'],
                opacity: 'toggle'
          }, 300, 'linear');
    });

    // portfolio filter
    $( '#filter a' ).click( function() {
        var opacity = 1, toOpacity = 0.05, duration = 200;

        $( '#filter .current' ).removeClass( 'current' );
        $( this ).parent().addClass( 'current' );

        var filterVal = $( this ).text().toLowerCase().replace(' ', '-');

        if ( filterVal == 'all' )
        {
            $( '#folio li' ).css( 'z-index', 999 ).fadeTo( duration, opacity );
        }
        else
        {
            $( '#folio li' ).each( function() {
                if ( ! $( this ).hasClass( filterVal ) )
                {
                    $( this ).css( 'z-index', -1 ).fadeTo( duration, toOpacity );
                }
                else
                {
                    $( this ).css( 'z-index', 999 ).fadeTo( duration, opacity );
                }
            });
        }
        return false;
    });
    
    // add button class to elements
    $(".postnavi span").addClass("button");

    // gmap
    $( "#map-overlay" ).click( function() 
    {
      $( this ).removeClass( "map-overlay" )
    });
    
    $('#gmap').on('mouseleave', function() 
    {
        $('#map-overlay').addClass('map-overlay');
    });
    
    // testimonials
    var scrollSpeed = 20;
    var current = 0;
    var direction = "h" ;
    
    function bgscroll()
    {
        current -= 1;
        // $("#testimonials").css("backgroundPosition", (direction == "h") ? current+"px 0" : "0 " + current+"px");
        $('#testimonials').css({
            backgroundPosition: (direction == "h") ? current+"px 0" : "0 " + current+"px",
            backgroundSize: 'auto 100%'
        });
    }
    setInterval(bgscroll, scrollSpeed);
            
    
    
    // prettyprint
    $( "pre" ).addClass( "prettyprint" );
    
    // typer
    $('[data-typer-targets]').typer({
        highlightSpeed    : 20,
        typeSpeed         : 200,
        clearDelay        : 200,
        typeDelay         : 20,
        clearOnHighlight  : true,
        typerDataAttr     : 'data-typer-targets',
        typerInterval     : 2000
    });
})(jQuery);