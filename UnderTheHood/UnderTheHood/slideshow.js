window.onload=init;
function init () {
	var body, len, i, child, top, bottom, slideNumber;
	
	body = document.body;
	slideNumber = 1;
	for (i=0, len = body.children.length; i<len; i++) {
		child = body.children[i];
		if (child.tagName == 'DIV') {
			if (child.firstChild.nextSibling) {
				child.id = 'slide' + slideNumber;
				top = document.createElement('span');
				top.innerHTML='<button onclick="prev(' + slideNumber +')">&lt;</button> <button onclick="next(' + slideNumber + ')">&gt;</button>';
				child.insertBefore(top, child.firstChild.nextSibling);

				bottom = document.createElement('span');
				bottom.innerHTML=top.innerHTML;
				child.appendChild(bottom);
				slideNumber++;
			}
		}
	}
}


function move (slide, inc) {
	var id, matches, n, div;
	
	id = slide.id;
	matches = /(\d+)$/.exec(id);
	n = parseInt(matches[1]);
	n += inc;
	div = document.getElementById('slide' + n);
	if (div && div.children.length > 0) {
		slide.style.display = 'none'
		div.style.display='block';
	}
	document.body.scrollTop = 0;
}

function prev (slideNumber) {
	move(document.getElementById('slide'+slideNumber), -1);
}

function next (slideNumber) {
	move(document.getElementById('slide'+slideNumber), 1);
}

