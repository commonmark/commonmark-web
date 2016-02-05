/* 
* Free to use under the MIT license.
* http://www.opensource.org/licenses/mit-license.php
* 4/18/2015
*/

$(document).ready(function() {
	var template = '<div id="cd-vertical-nav"> \
		<ul> \
			<li> \
				<a href="index.html" class="noselect {{? it.section == 0 }}is-selected{{?}}"> \
					<span class="cd-dot"></span> \
					<span class="cd-label">Intro</span> \
				</a> \
			</li> \
			<li> \
				<a href="02-emphasis.html" class="noselect {{? it.section == 1 }}is-selected{{?}}"> \
					<span class="cd-dot"></span> \
					<span class="cd-label">Emphasis</span> \
				</a> \
			</li> \
			<li> \
				<a href="03-paragraphs.html" class="noselect {{? it.section == 2 }}is-selected{{?}}"> \
					<span class="cd-dot"></span> \
					<span class="cd-label">Paragraphs</span> \
				</a> \
			</li> \
			<li> \
				<a href="04-headings.html" class="noselect {{? it.section == 3 }}is-selected{{?}}"> \
					<span class="cd-dot"></span> \
					<span class="cd-label">Headings</span> \
				</a> \
			</li> \
			<li> \
				<a href="05-links.html" class="noselect {{? it.section == 4 }}is-selected{{?}}"> \
					<span class="cd-dot"></span> \
					<span class="cd-label">Links</span> \
				</a> \
			</li> \
			<li> \
				<a href="06-images.html" class="noselect {{? it.section == 5 }}is-selected{{?}}"> \
					<span class="cd-dot"></span> \
					<span class="cd-label">Images</span> \
				</a> \
			</li> \
			<li> \
				<a href="07-code.html" class="noselect {{? it.section == 6 }}is-selected{{?}}"> \
					<span class="cd-dot"></span> \
					<span class="cd-label">Code</span> \
				</a> \
			</li> \
			<li> \
				<a href="08-blockquotes.html" class="noselect {{? it.section == 7 }}is-selected{{?}}"> \
					<span class="cd-dot"></span> \
					<span class="cd-label">Blockquotes</span> \
				</a> \
			</li> \
			<li> \
				<a href="09-lists.html" class="noselect {{? it.section == 8 }}is-selected{{?}}"> \
					<span class="cd-dot"></span> \
					<span class="cd-label">Lists</span> \
				</a> \
			</li> \
			<li> \
				<a href="10-nestedLists.html" class="noselect {{? it.section == 9 }}is-selected{{?}}"> \
					<span class="cd-dot"></span> \
					<span class="cd-label">Nested Lists</span> \
				</a> \
			</li> \
			<li> \
				<a href="99-end.html" class="noselect {{? it.section == 10 }}is-selected{{?}}"> \
					<span class="cd-dot"></span> \
					<span class="cd-label">The End</span> \
				</a> \
			</li> \
		</ul> \
	</div> \
	<a class="cd-nav-trigger cd-img-replace">Open navigation<span></span></a>';
    
	var menuFn = doT.template(template);
	$(document.body).append(menuFn({section: CURRENT_SECTION}));
	
	// open-close navigation on touch devices
    $('.touch .cd-nav-trigger').on('click', function(){
    	$('.touch #cd-vertical-nav').toggleClass('open');
  
    });
    // close navigation on touch devices when selecting an element from the list
    $('.touch #cd-vertical-nav a').on('click', function(){
    	$('.touch #cd-vertical-nav').removeClass('open');
    });
});