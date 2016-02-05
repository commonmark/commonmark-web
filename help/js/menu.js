/* 
* Free to use under the MIT license.
* http://www.opensource.org/licenses/mit-license.php
* 4/18/2015
*/

$(document).ready(function() {
	var template = '<div id="cd-vertical-nav"> \
		<ul> \
			<li> \
				<a href="index.html" class="{{? it.section == 0 }}is-selected{{?}}"> \
					<span class="cd-dot"></span> \
					<span class="cd-label">Intro</span> \
				</a> \
			</li> \
			<li> \
				<a href="emphasis.html" class="{{? it.section == 1 }}is-selected{{?}}"> \
					<span class="cd-dot"></span> \
					<span class="cd-label">Emphasis</span> \
				</a> \
			</li> \
			<li> \
				<a href="headings.html" class="{{? it.section == 2 }}is-selected{{?}}"> \
					<span class="cd-dot"></span> \
					<span class="cd-label">Headings</span> \
				</a> \
			</li> \
			<li> \
				<a href="links.html" class="{{? it.section == 3 }}is-selected{{?}}"> \
					<span class="cd-dot"></span> \
					<span class="cd-label">Links</span> \
				</a> \
			</li> \
			<li> \
				<a href="images.html" class="{{? it.section == 4 }}is-selected{{?}}"> \
					<span class="cd-dot"></span> \
					<span class="cd-label">Images</span> \
				</a> \
			</li> \
			<li> \
				<a href="code.html" class="{{? it.section == 5 }}is-selected{{?}}"> \
					<span class="cd-dot"></span> \
					<span class="cd-label">Code</span> \
				</a> \
			</li> \
			<li> \
				<a href="blockquotes.html" class="{{? it.section == 6 }}is-selected{{?}}"> \
					<span class="cd-dot"></span> \
					<span class="cd-label">Blockquotes</span> \
				</a> \
			</li> \
			<li> \
				<a href="paragraphs.html" class="{{? it.section == 7 }}is-selected{{?}}"> \
					<span class="cd-dot"></span> \
					<span class="cd-label">Paragraphs</span> \
				</a> \
			</li> \
			<li> \
				<a href="lists.html" class="{{? it.section == 8 }}is-selected{{?}}"> \
					<span class="cd-dot"></span> \
					<span class="cd-label">Lists</span> \
				</a> \
			</li> \
			<li> \
				<a href="nestedLists.html" class="{{? it.section == 9 }}is-selected{{?}}"> \
					<span class="cd-dot"></span> \
					<span class="cd-label">Nested Lists</span> \
				</a> \
			</li> \
			<li> \
				<a href="autolinking.html" class="{{? it.section == 10 }}is-selected{{?}}"> \
					<span class="cd-dot"></span> \
					<span class="cd-label">Autolinking</span> \
				</a> \
			</li> \
			<li> \
				<a href="strikethrough.html" class="{{? it.section == 11 }}is-selected{{?}}"> \
					<span class="cd-dot"></span> \
					<span class="cd-label">Strikethrough</span> \
				</a> \
			</li> \
			<li> \
				<a href="githubCodeBlocks.html" class="{{? it.section == 12 }}is-selected{{?}}"> \
					<span class="cd-dot"></span> \
					<span class="cd-label">Github Code Blocks</span> \
				</a> \
			</li> \
			<li> \
				<a href="redditSuperscript.html" class="{{? it.section == 13 }}is-selected{{?}}"> \
					<span class="cd-dot"></span> \
					<span class="cd-label">Reddit Superscripts</span> \
				</a> \
			</li> \
			<li> \
				<a href="tables.html" class="{{? it.section == 14 }}is-selected{{?}}"> \
					<span class="cd-dot"></span> \
					<span class="cd-label">Tables</span> \
				</a> \
			</li> \
			<li> \
				<a href="end.html" class="{{? it.section == 15 }}is-selected{{?}}"> \
					<span class="cd-dot"></span> \
					<span class="cd-label">The End</span> \
				</a> \
			</li> \
		</ul> \
	</div> \
	<a class="cd-nav-trigger cd-img-replace">Open navigation<span></span></a>';
	var menuFn = doT.template(template);
	$(document.body).append(menuFn({section: CURRENT_SECTION}));
	
	//open-close navigation on touch devices
    $('.touch .cd-nav-trigger').on('click', function(){
    	$('.touch #cd-vertical-nav').toggleClass('open');
  
    });
    //close navigation on touch devices when selecting an element from the list
    $('.touch #cd-vertical-nav a').on('click', function(){
    	$('.touch #cd-vertical-nav').removeClass('open');
    });
});