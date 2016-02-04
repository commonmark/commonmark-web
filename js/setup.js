/* 
* Free to use under the MIT license.
* http://www.opensource.org/licenses/mit-license.php
* 4/18/2015
*/
	
// Set up progress bar
var nanobar = new Nanobar( {id:'bar', bg:'#000'} );
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
	nanobar.go( advancedPercentage );
}

function updateSlideNavigation(index) {
	$('.current').removeClass('current');
	$(".dotstyle li:eq(" + index + ")").addClass('current');
}

$(document).ready(function() {
	// Constants
	var NUMBER_OF_SECTIONS = 15;
	var COMMON_MD = 0;
	var GITHUB_MD = 1;
	var REDDIT_MD = 2;
	var EDITOR_ID_PREFIX = "editor_";
	var CK_SHOW_HTML_ID_PREFIX = "ck_show_html_";
	var BTN_SHOW_ANSWER_ID_PREFIX = "btn_answer_";
	var RENDER_PAD_ID_PREFIX = "render_pad_";
	var HTML_PAD_ID_PREFIX = "html_pad_";
	
	// swipe for mobile devices
	$( ".touch .slide" ).on( "swipeleft", function() {
		var slide = $(this);
		var nextSlide = slide.next(".slide");
		if(nextSlide.length != 0) {
			slide.removeClass('active');
			nextSlide.addClass("active");
			advanceBar(nextSlide.index());
		}
	} );
	$( ".touch .slide" ).on( "swiperight", function() {
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
	$('.cd-single-point').children('a').on('click', function(event){
		event.preventDefault();
		var selectedPoint = $(this).parent('li');
		if( selectedPoint.hasClass('is-open') ) {
			selectedPoint.removeClass('is-open').addClass('visited');
		} else {
			selectedPoint.addClass('is-open').siblings('.cd-single-point.is-open').removeClass('is-open').addClass('visited');
		}
	});
	// Close interest point descriptions
	$('.cd-close-info').on('click', function(event){
		event.preventDefault();
		$(this).parents('.cd-single-point').eq(0).removeClass('is-open').addClass('visited');
	});
	var interestPointsSlide = $(".slide:eq(0)");
	interestPointsSlide.css("-webkit-tap-highlight-color", "transparent"); //To eliminate the flicker on iOS when tapping
	interestPointsSlide.on('click', function(event){
		closeInterestPoint(event);
	});
	function closeInterestPoint(event) {
		if( !$(event.target).is('.cd-single-point a') && !$(event.target).is('.cd-close-info')){
			$('.cd-single-point.is-open').removeClass('is-open').addClass('visited');
		}
	}
	
	// Set up markdown editors
	$('.editor').each(function() {
		var elementId = $(this)[0].id;
		var exerciseId = getExerciseId(elementId);
		
		// Set up event to update markdown/html when the user writes something
		$(this).on('keyup', function(event){
			var md = generateMd(exerciseId);
			
			if(exercises[exerciseId] != undefined && md.trim() == exercises[exerciseId]["answer"]) {
				if(exerciseId == "15-1") {
					swal({title:"Excellent job!", text: "You are now a Markdown Master", type: "success"});
				} else {
					swal({title:"Good job!", text: "That's correct. Now you can go to the next exercise.", type: "success"});
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
	
	// Set up show html checkboxes
	$('.show-html').each(function() {
		var elementId = $(this)[0].id;
		var exerciseId = getExerciseId(elementId);
		
		// Set up click event for the checkbox
		$(this).on('click', function(event){
			var toggle = 'hidden';
			var element = $("#" + HTML_PAD_ID_PREFIX + exerciseId);
			element.toggle();
			/*if( element.css('visibility') == 'hidden' ) {
				toggle = 'visible';
			}
			element.css('visibility', toggle);*/
			generateMd(exerciseId);
		});
	});
	
	
	function generateMd(exerciseId) {
		var text = $("#" + EDITOR_ID_PREFIX + exerciseId).val();
		var mdFlavour = configureExtensions(exerciseId);
		var md;
		
		// Set up marked options
		if(mdFlavour == GITHUB_MD) {
			md = window.markdownit({
			  linkify: true,
			  highlight: function(code, lang) {
				var languageToDetect = typeof(lang) !== "undefined" ? lang.toLowerCase() : '';
				return hljs.highlightAuto(code, [languageToDetect]).value;
			  }
			});
		} else {
			md = window.markdownit();
		}
		
		var html = "";
		if(mdFlavour == REDDIT_MD) {
			html = SnuOwnd.getParser().render(text);
		} else {
			html = md.render(text);
		}
		$("#" + RENDER_PAD_ID_PREFIX + exerciseId).html("").html(html);
		
		var chk = $("#" + CK_SHOW_HTML_ID_PREFIX + exerciseId)[0];
		if(typeof(chk) !== 'undefined' && chk.checked) {
			var htmlSH = hljs.highlightAuto(html, ["html"]).value.replace(/(?:\r\n|\r|\n)/g, '<br />');
			$("#" + HTML_PAD_ID_PREFIX + exerciseId).html("").html(htmlSH);
		}
		
		return html;
	}
	
	function getExerciseId(elementId) {
		var exerciseId = elementId.substring(elementId.lastIndexOf("_") + 1);
		
		return exerciseId;
	}
	
	function configureExtensions(exerciseId) {
		// The format of exerciseId is lesson-exercise
		var lesson = parseInt(exerciseId.split("-")[0], 10);
		var mdFlavor = GITHUB_MD;
		
		// From lesson 10 onward, extensions have to be enable
		if(lesson == 13) {
			mdFlavor = REDDIT_MD;
		}
		else if (lesson < 10 || lesson == 15) {
			mdFlavor = COMMON_MD; 
		}
		
		return mdFlavor;
	}
});