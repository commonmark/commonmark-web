/* 
* Free to use under the MIT license.
* http://www.opensource.org/licenses/mit-license.php
* 4/18/2015
*/
	
// Set up progress bar
var nanobar = new Nanobar( {id:'bar', bg:'#33C3F0'} );
var numberSlides = $(".slide").length;
advanceBar(0);

function goToSlide(n) {
	$('.slide.active').removeClass('active');
	var slide = $(".slide:eq(" + n + ")");
	slide.addClass("active");
	updateSlideNavigation(n);
	advanceBar(n);
}
	
function advanceBar(currentSlide) {
	var advancedPercentage = ((currentSlide + 1) / numberSlides) * 100;
	if (advancedPercentage == 0) advancedPercentage = 0.01;
	else if (advancedPercentage == 100) advancedPercentage = 99.99999;
	nanobar.go(advancedPercentage);
}

function updateSlideNavigation(index) {
	$('.current').removeClass('current');
	$(".dotstyle li:eq(" + index + ")").addClass('current');
    $(".cd-label").addClass("make-it-opaque");
}


//
// stuff we do when the page is finished loading
//
$(document).ready(function() {

	// Constants
	var EDITOR_ID_PREFIX = "editor_";
	var CK_SHOW_HTML_ID_PREFIX = "ck_show_html_";
	var RENDER_PAD_ID_PREFIX = "render_pad_";
	var HTML_PAD_ID_PREFIX = "html_pad_";
    var RESET_ID_PREFIX = "btn_reset_";
    	
	// swipe for mobile devices
	$(".touch .slide").on("swipeleft", function() {
		var slide = $(this);
		var nextSlide = slide.next(".slide");
		if(nextSlide.length != 0) {
			slide.removeClass('active');
			nextSlide.addClass("active");
			advanceBar(nextSlide.index());
		}
	} );
	$(".touch .slide").on("swiperight", function() {
		var slide = $(this);
		var prevSlide = slide.prev(".slide");
		if(prevSlide.length != 0) {
			slide.removeClass('active');
			prevSlide.addClass("active");
			advanceBar(prevSlide.index());
		}
	} );
	
	// Set up next/previous buttons
	$(".button-next").on('click', function(event){
		var slide = $(this).parents(".slide").next(".slide").index();
		goToSlide(slide);
		updateSlideNavigation(slide);
	});
	$(".button-previous").on('click', function(event){
		var slide = $(this).parents(".slide").prev(".slide").index();
		goToSlide(slide);
		updateSlideNavigation(slide);
	});
	
	// Open interest point descriptions
	$('.cd-single-point').children('a').on('click', function(event) {
		event.preventDefault();
		var selectedPoint = $(this).parent('li');
		if( selectedPoint.hasClass('is-open') ) {
			selectedPoint.removeClass('is-open').addClass('visited');
		} else {
			selectedPoint.addClass('is-open').siblings('.cd-single-point.is-open').removeClass('is-open').addClass('visited');
		}
	});
    
	// Close interest point descriptions
	$('.cd-close-info').on('click', function(event) {
		event.preventDefault();
		$(this).parents('.cd-single-point').eq(0).removeClass('is-open').addClass('visited');
        completeInterestPoints();
	});
    
	var interestPointsSlide = $(".slide:eq(0)");
    //To eliminate the flicker on iOS when tapping
	interestPointsSlide.css("-webkit-tap-highlight-color", "transparent"); 
	interestPointsSlide.on('click', function(event) {
		closeInterestPoint(event);
	});
    
	function closeInterestPoint(event) {
		if( !$(event.target).is('.cd-single-point a') && !$(event.target).is('.cd-close-info')){
			$('.cd-single-point.is-open').removeClass('is-open').addClass('visited');
		}
        completeInterestPoints();
	}
    
    function completeInterestPoints() {
        if ($('li.cd-single-point').length == $('li.cd-single-point.visited').length) {
            $('.try-it button').addClass("button-urgent");
        }
    }
	
	// Set up markdown editors
	$('.editor').each(function() {
        
		var elementId = $(this)[0].id;
		var exerciseId = getExerciseId(elementId);
		
		// Set up event to update markdown/html when the user writes something
		$(this).on('keyup', function(event) {        
                        			
            var md = generateMd(exerciseId);
            
			if(exercises[exerciseId] != undefined && $(this).data('win') == undefined) {
                                               
                if (md.trim().toLowerCase() == exercises[exerciseId]["answer"].toLowerCase()) {
					setTimeout(
            			function () {
							$(this).data('win', 1);
							$('').addClass('button-urgent');
							swal({title: randomSuccessTitle(), type: "success", allowOutsideClick: "true", timer: "2000" });
							markComplete(exerciseId);                    
						}, 1000            
        			);
                }
                
			}
		});
		
		// For the initial text
		generateMd(exerciseId);
	});
	
	// Set up show answer buttons
	$('.button-answer').each(function() {
		var elementId = $(this)[0].id;
		var exerciseId = getExerciseId(elementId);
		var htmlPadElement = $("#" + RENDER_PAD_ID_PREFIX + exerciseId)
		
		// Set up click event for the button
		$(this).on('click', function(event){
			$("#" + EDITOR_ID_PREFIX + exerciseId).val(exercises[exerciseId]["correctMd"]);
			generateMd(exerciseId);
		});
	});
    
  	// Set up reset buttons
	$('.button-reset').each(function() {
		var elementId = $(this)[0].id;
		var exerciseId = getExerciseId(elementId);
        var editor = $("#" + EDITOR_ID_PREFIX + exerciseId); 
        $(this).toggle();
        
		// Set up click event for the button
		$(this).on('click', function(event){
			editor.val(editor.data("original"));
			generateMd(exerciseId);
            $(this).hide();
		});
        
    });

	
	// Set up show html checkboxes
	$('.show-html').each(function() {
		var elementId = $(this)[0].id;
		var exerciseId = getExerciseId(elementId);
		
		// Set up click event for the checkbox
		$(this).on('click', function(event){
            var htmlPadElement = $("#" + RENDER_PAD_ID_PREFIX + exerciseId)
			var element = $("#" + HTML_PAD_ID_PREFIX + exerciseId);
			element.toggle();
            htmlPadElement.toggle();
			generateMd(exerciseId);
		});
	});
    
    // highlight the 'next' button if the exercise is complete
    function markComplete(exerciseId) {
        var x = exerciseId.substring(exerciseId.lastIndexOf("-") + 1);
        $('.slide.' + x + ' .button-next').addClass('button-urgent');     
        $('.slide.' + x + ' .button-next-lesson').addClass('button-urgent');
        console.log('.slide.' + x + ' .button-next');   
    }
    
    // vary the success alert text so it doesn't get boring
    function randomSuccessTitle() {
        var a = [
            'Good Job!',
            'Fantastic!',
            'Well Done!',
            'Excellent!',
            'Perfect!',
            'Super!', 
            'Just Right!',
            'You Did It!',
            'Great Work!',
            'Stellar!',
            'Yes!',
            'You Got It!',
            'That’s Right!',
            'That’s It!',
            'Awesome!',
            'Superb!',
            'Outstanding!'
        ]
        return a[Math.floor(Math.random() * a.length)];
    }	
	
	function generateMd(exerciseId) {
        var editor = $("#" + EDITOR_ID_PREFIX + exerciseId); 
		var editortext = editor.val();		        
        var md = window.markdownit();	
        
        // store the original text the first time we call this
        if (editor.data("original") == undefined) {
            editor.data("original", editortext); 
        } else {        
            // if user changed text, allow reset button
            if (editortext != editor.data("original")) {
                $("#" + RESET_ID_PREFIX + exerciseId).show();
            } else {
                $("#" + RESET_ID_PREFIX + exerciseId).hide();
            }
        }
        
        // bake the raw editor Markdown into HTML
		var html = md.render(editortext);
		$("#" + RENDER_PAD_ID_PREFIX + exerciseId).html("").html(html);        
		
        // if 'Show Generated HTML' is checked, populate that
		var chk = $("#" + CK_SHOW_HTML_ID_PREFIX + exerciseId)[0];
		if(typeof(chk) !== 'undefined' && chk.checked) {
			var htmlSH = hljs.highlightAuto(html, ["html"]).value.replace(/(?:\r\n|\r|\n)/g, '<br />');
			$("#" + HTML_PAD_ID_PREFIX + exerciseId).html("").html(htmlSH);
		}
		
		return html;
	}
	
	function getExerciseId(elementId) {
		return elementId.substring(elementId.lastIndexOf("_") + 1);
	}
	
});