/**
 * service to get the records from the service
 */
appModule.service('studentService', function($resource) {
	
	this.testCall = function(){
		return  $resource("http://localhost:8080/test",{}, 
				{query: {method:'GET', isArray: false}});;
	};
	
	this.searchBook = function(textSearch) {
		var toBeSearchedText = "";
		var splitsearchText = textSearch.split(/\s+/);
		if(splitsearchText.length > 0){
		toBeSearchedText = splitsearchText[0];
		
		for(var i=1;i<splitsearchText.length;i++){
			toBeSearchedText = toBeSearchedText+"+"+splitsearchText[i];
		}
		
		}
		
		return  $resource("http://openlibrary.org/search.json?q="+toBeSearchedText+"&has_fulltext=true",{}, 
				{query: {method:'GET', isArray: false}});;
	};
	
	this.getReadableLinksFromInternetArchieve = function(query) {
		return  $resource(query+"?callback=JSON_CALLBACK",{}, 
				{query: {method:'jsonp', isArray: false}});;
	};
	
	this.callReadBook = function(){
		return $resource("http://localhost:9092/web/bySubject",{},{ call : { method : 'POST',
			isArray: false }});
	};
	
});