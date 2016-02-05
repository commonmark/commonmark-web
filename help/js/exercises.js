/* 
* Free to use under the MIT license.
* http://www.opensource.org/licenses/mit-license.php
* 4/18/2015
*/

// Exercise data
var exercises = {
	"1-1": {
		answer: "<p>The music video for Rihanna’s song <strong>American Oxygen</strong> depicts various moments from American history, including the inauguration of Barack Obama.</p>",
		correctMd: "The music video for Rihanna’s song **American Oxygen** depicts various moments from American history, including the inauguration of Barack Obama."
	}, 
	"1-2": {
		answer: "<p>Why, sometimes I’ve believed as many as <em>six</em> impossible things before breakfast.</p>",
		correctMd: "Why, sometimes I’ve believed as many as _six_ impossible things before breakfast."
	},
    "1-3": {
        answer: "<p><strong>Everyone <em>must</em> attend the meeting at 5 o’clock today.</strong></p>",
        correctMd: "**Everyone _must_ attend the meeting at 5 o’clock today.**"
    }, 
	"1-4": {
		answer: "<p>I am totally awesome.*</p>\n<p>* for certain very small values of awesome</p>",
		correctMd: "I am totally awesome.*\n\n\\* for certain very small values of awesome"
	}, 
	"2-1": {
		answer: "<h2>Chapter 1</h2>\n<p>Something about the room made him uneasy.</p>\n<h2>Chapter 2</h2>\n<p>It's behind you! Hurry before it</p>",
		correctMd: "## Chapter 1\nSomething about the room made him uneasy.\n## Chapter 2\nIt's behind you! Hurry before it"
	}, 
	"2-2": {
		answer: "<h1>After the Big Bang</h1>\n<p>A brief summary of time</p>\n<h2>Life on earth</h2>\n<p>10 billion years</p>\n<h2>You reading this</h2>\n<p>13.7 billion years</p>",
		correctMd: "# After the Big Bang\nA brief summary of time\n## Life on earth\n10 billion years\n## You reading this\n13.7 billion years"
	},     
	"3-1": {
		answer: "<p>You can do anything at <a href=\"http://html5zombo.com\">http://html5zombo.com</a></p>",
		correctMd: "You can do anything at <http://html5zombo.com>"
	}, 
	"3-2": {
		answer: "<p>The <a href=\"http://www.ur.ac.rw\">University of Rwanda</a> was formed in 2013 through the merger of Rwanda’s seven public institutions of higher education.</p>",
		correctMd: "The [University of Rwanda](http://www.ur.ac.rw) was formed in 2013 through the merger of Rwanda’s seven public institutions of higher education."
	}, 
	"3-3": {
		answer: "<p><a href=\"https://goo.gl/YEEHP0\">Hurricane</a> Erika was the strongest and longest-lasting tropical cyclone in the 1997 Atlantic <a href=\"https://goo.gl/YEEHP0\">hurricane</a> season.</p>",
		correctMd: "[Hurricane][1] Erika was the strongest and longest-lasting tropical cyclone in the 1997 Atlantic [hurricane][1] season.\n\n[1]:https://goo.gl/YEEHP0"
	}, 
	"4-1": {
		answer: "<p><img src=\"http://commonmark.org/help/images/favicon.png\" alt=\"\"></p>",
		correctMd: "![](http://commonmark.org/help/images/favicon.png)"
	}, 
	"4-2": {
		answer: "<p><img src=\"http://commonmark.org/help/images/favicon.png\" alt=\"Logo\" title=\"The Markdown logo is Creative Commons\"></p>",
		correctMd: "![Logo][1]\n\n[1]: http://commonmark.org/help/images/favicon.png \"The Markdown logo is Creative Commons\""
	}, 
	"5-1": {
		answer: "<p>When <code>x = 3</code>, that must mean <code>x + 2 = 5</code></p>",
		correctMd: "When `x = 3`, that must mean `x + 2 = 5`"
	}, 
	"5-2": {
		answer: "<p>Who ate the most donuts this week?</p>\n<pre><code>Jeff  15\nSam   11\nRobin  6</code></pre>",
		correctMd: "Who ate the most donuts this week?\n\n    Jeff  15\n    Sam   11\n    Robin  6"
	},  
	"5-3": {
		answer: "<p>A loop in JavaScript:</p>\n<pre><code>var i;\nfor (i=0; i&lt;5; i++) {\n  console.log(i);\n}\n</code></pre>\n<p>What numbers will this print?</p>",
		correctMd: "A loop in JavaScript:\n```\nvar i;\nfor (i=0; i<5; i++) {\n  console.log(i);\n}\n```\nWhat numbers will this print?"
	},  
	"6-1": {
		answer: "<p>The quote</p>\n<blockquote>\n<p>Somewhere, something incredible is waiting to be known</p>\n</blockquote>\n<p>has been ascribed to Carl Sagan.</p>",
		correctMd: "The quote\n\n> Somewhere, something incredible is waiting to be known\n\nhas been ascribed to Carl Sagan."
	}, 
	"6-2": {
		answer: "<p>My favorite Miss Manners quotes:</p>\n<blockquote>\n<p>Allowing an unimportant mistake to pass without comment is a wonderful social grace.</p>\n<p>Ideological differences are no excuse for rudeness.</p>\n</blockquote>",
		correctMd: "My favorite Miss Manners quotes:\n\n> Allowing an unimportant mistake to pass without comment is a wonderful social grace.\n>\n> Ideological differences are no excuse for rudeness."
	}, 
	"7-1": {
		answer: "<p>The sky above the port was the color of television, tuned to a dead channel.</p>\n<p>It was a bright cold day in April, and the clocks were striking thirteen.</p>",
		correctMd: "The sky above the port was the color of television, tuned to a dead channel.\n\nIt was a bright cold day in April, and the clocks were striking thirteen."
	}, 
	"7-2": {
		answer: "<p>I have eaten<br>\nthe plums<br>\nthat were in<br>\nthe icebox</p>",
		correctMd: "I have eaten\\\nthe plums\\\nthat were in\\\nthe icebox"
	},
	"8-1": {
		answer: "<ul>\n<li>Flour</li>\n<li>Cheese</li>\n<li>Tomatoes</li>\n</ul>",
		correctMd: "- Flour\n- Cheese\n- Tomatoes"
	}, 
	"8-2": {
		answer: "<p>Four steps to better sleep:</p>\n<ol>\n<li>Stick to a sleep schedule</li>\n<li>Create a bedtime ritual</li>\n<li>Get comfortable</li>\n<li>Manage stress</li>\n</ol>",
		correctMd: "Four steps to better sleep:\n1. Stick to a sleep schedule\n2. Create a bedtime ritual\n3. Get comfortable\n4. Manage stress"
	},
    "8-3": {
		answer: "<p>1986. What a great season. Arguably the finest season in the history of the franchise.</p>",
		correctMd: "1986\\. What a great season. Arguably the finest season in the history of the franchise."
	},     
	"9-1": {
		answer: "<ul>\n<li>Fruit\n<ul>\n<li>Apple</li>\n<li>Orange</li>\n<li>Banana</li>\n</ul>\n</li>\n<li>Dairy\n<ul>\n<li>Milk</li>\n<li>Cheese</li>\n</ul>\n</li>\n</ul>",
		correctMd: "* Fruit\n  * Apple\n  * Orange\n  * Banana\n* Dairy\n  * Milk\n  * Cheese"
	}, 
	"9-2": {
		answer: "<ul>\n<li>World Cup 2014\n<ol>\n<li>Germany</li>\n<li>Argentina</li>\n<li>Netherlands</li>\n</ol>\n</li>\n<li>Rugby World Cup 2015\n<ol>\n<li>New Zealand</li>\n<li>Australia</li>\n<li>South Africa</li>\n</ol>\n</li>\n</ul>",
		correctMd: "+ World Cup 2014\n  1. Germany\n  2. Argentina\n  3. Netherlands\n+ Rugby World Cup 2015\n  1. New Zealand\n  2. Australia\n  3. South Africa"
	},
	"9-3": {
		answer: "<ol>\n<li>\n<p>Ingredients</p>\n<ul>\n<li>spaghetti</li>\n<li>marinara sauce</li>\n<li>salt</li>\n</ul>\n</li>\n<li>\n<p>Cooking</p>\n<p>Bring water to boil, add a pinch of salt and spaghetti. Cook until pasta is <strong>tender</strong>.</p>\n</li>\n<li>\n<p>Serve</p>\n<p>Drain the pasta on a plate. Add heated sauce.</p>\n<blockquote>\n<p>No man is lonely eating spaghetti; it requires so much attention.</p>\n</blockquote>\n<p>Bon appetit!</p>\n</li>\n</ol>",
		correctMd: "1. Ingredients\n\n    - spaghetti\n    - marinara sauce\n    - salt\n\n2. Cooking\n\n   Bring water to boil, add a pinch of salt and spaghetti. Cook until pasta is **tender**.\n\n3. Serve\n\n   Drain the pasta on a plate. Add heated sauce. \n\n   > No man is lonely eating spaghetti; it requires so much attention.\n\n   Bon appetit!"
	}
};