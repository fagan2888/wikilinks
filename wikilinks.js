javascript:(function(){
	var linkChecker = {
		isNavLink: function(l){
			return l.getAttribute('accesskey') != null || l.parentNode.className.match(/icon/) != null;
		},
		isCitationLink: function(l){
			return l.parentNode.className.match(/citation/) != null || l.parentNode.parentNode.className.match(/citation/) != null;
		},
		isWikiPageLink: function(l){
			return l.getAttribute('title') != null && l.getAttribute('href').indexOf('/wiki/') == 0;
		},
		isSpecialLink: function(l){
			return l.getAttribute('href').indexOf(':') >= 0 || l.getAttribute('style') != null;
		}
	};
	
	var processedLinks = {};

	var links = document.links;
	var docTitle = document.title;
	var header = document.createElement('h2');
	var tblContainer = document.createElement('div');
		
	var tbl = '<table style="font-size: 16px; line-height:20px;">';
	tbl += '<thead style="font-weight:bold;"><tr><td>Referenced Articles</td></tr></thead><tbody>';

	
	for(var i = 0; i < links.length; i++){
		var link = links[i];
		if(typeof processedLinks[link.href] === 'undefined'){
			processedLinks[link.href] = true;
		
			if(linkChecker.isWikiPageLink(link) &&
				!linkChecker.isNavLink(link) &&
				!linkChecker.isSpecialLink(link) &&
				!linkChecker.isCitationLink(link)){
				
				var href = link.getAttribute('href');
				var title = link.getAttribute('title');
				tbl += '<tr><td><a href="' + href + '">' + title + '</a></td></tr>';
			}
		}
	}
	
	tbl += '</tbody></table>';
		
	header.innerHTML = docTitle;
	tblContainer.innerHTML = tbl;
	document.body.innerHTML = '';
	document.body.appendChild(header);
	document.body.appendChild(tblContainer);
	document.title = docTitle;
}());
