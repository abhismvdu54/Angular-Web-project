/**
 * controller for student .. inject the service
 */
appModule.controller('studentController', function($scope, studentService, blockUI) {
	
	/*options for the rating system*/
	 $scope.options = {
		    	values 			: [ 1, 2, 3,4,5 ],
		        /*cssFractional           : "rating-star-fractional",*/
		        allowFractional         : true,
		        readOnly                : true,
		        htmlEvent               : null,
		        
		        cssValuesSelected 	: [
		            "first-selected",
		            "second-selected",
		            "third-selected",],
		        cssValuesUnselected	: [
		            "first-unselected",
		            "second-unselected",
		            "third-unselected",],
		      /* cssHover		: "rating-star-hover"*/
		    };
	
	
	$scope.enterEvent = function(event){
		if(event.keyCode == 13){
			$scope.searchBooks();
		}
	};

	var docs = null;
	var isbns_ReadableBooks = "";
	var isbns_BorrowableBooks = "";
	var isbns_otherBooks = "";
	$scope.searchBooks = function(){
		var readableBooks=[];
		var leandableBooks=[];
		var leandableBooksCount = 0;
		var readableBooksCount = 0;
		var otherKindOfBooks = [];
		var otherKindOfBooksCount = 0;
		var goodBookReviewsResponse = [];
		
		blockUI.start();
		blockUI.message("Message");
		var query = "";
		var resource = studentService.searchBook($scope.searchBookText);
		resource.query().$promise.then(function(response) {
			if(response.docs.length == 0){
				alert("No books Found");
				blockUI.stop();
			}else {
			docs = response.docs;
			query =  populateQueryForAllBooks(docs);
			
			
			//make the ajax call to get the readable/ borrowable links.
			var queryForInternetArchieve = studentService.getReadableLinksFromInternetArchieve(query);
			queryForInternetArchieve.query().$promise.then(function(data){
				
				
				for(var i = 0; i<docs.length ; i++){
		        	if( data[i]!= null && data[i].items != null && data[i].items.length >0){
		        		docs[i].readableObject = data[i].items[0];	
		        		console.log("status is "+data[i].items[0].status +" , for item is : "+i);
		        		// set the data for all other books who are not readable or not borrowable....
		        		if(!docs[i].has_fulltext){
		        			otherKindOfBooks[otherKindOfBooksCount++] = docs[i];
		        		}
		        		if(data[i].items[0].status == 'lendable'){
		        			leandableBooks[leandableBooksCount++] = docs[i];
		        		}
		        		else if(data[i].items[0].status == 'full access'){
		        			//find the isbns for all the readable books to get the good read reviews

		        			if(docs[i]['isbn'] != null && docs[i]['isbn'].length>0){
		    		    		isbns_ReadableBooks = isbns_ReadableBooks+docs[i]['isbn'][0]+",";
		    		    	}
		        			
		        			readableBooks[readableBooksCount++] = docs[i];
		        		}else {
		        			var status = data[i].items[0].status;
		        			console.log("status is: "+status);
		        		}
		        	}else{
		        		docs[i].readableObject = null;
		        	}
		        	
		        }
				
				//get the data for the readable reviews and the rest of the data
				var reviewQuery = studentService.callReadBook();
				reviewQuery.call(isbns_ReadableBooks).$promise.then(function(data){
					var goodReviews = data.books;
					var goodReveiwsCount_readable = 0;
			
					for(var i= 0 ;i< readableBooks.length; i++){
						if(readableBooks[i]['isbn'] != null){
							if(goodReviews[goodReveiwsCount_readable]!=null && (goodReviews[goodReveiwsCount_readable]['isbn'] == readableBooks[i]['isbn'] [0])){
							readableBooks[i].goodReadReviews = goodReviews[goodReveiwsCount_readable++];
							}else{
								readableBooks[i].goodReadReviews = null;
							}
						}else{
							readableBooks[i].goodReadReviews = null;
						}
					}
					console.log("reviews : "+goodBookReviewsResponse);
					
					$scope.readableBooks = readableBooks;
					$scope.lendableBooks = leandableBooks;
					blockUI.stop();
				}, function(error){
					blockUI.stop();
					alert("error happened while getting good read reviews");
				});
			});
			
			}	
	},
	function(error) {
		alert(error);
		blockUI.stop();
	}
		);
		
		console.log("In the search books method last ");
	};
	
	
	function populateQueryForAllBooks (docs){
		// 'constants'
		var readapi_bibids = ['isbn', 'lccn', 'oclc', 'olid', 'iaid', 'bibkeys'];
		// Find all book divs and concatenate ids from them to create a read
		// API query url
		    var q = 'http://openlibrary.org/api/volumes/brief/json/';
		    function add_el(i, doc) {
			        if (i > 0) {
			            q += '|';
			        }
			        q += 'id:' + i;

			       // var idHasBeenIncluded = false;
			        for (bi in readapi_bibids) {
			            bibid = readapi_bibids[bi];
			            if ( doc[bibid]!=null && doc[bibid][0]) {
			                q += ';' + bibid + ':' + doc[bibid][0];
			                //idHasBeenIncluded = true;
			            }
			           /* if(!idHasBeenIncluded && doc['edition_key']!= null && doc['edition_key'][0]!= null){
			            	q+=';'+'olid'+':'+doc['edition_key'][0];
			            	idHasBeenIncluded = true;
			            }*/
			        }
			    }
		    for(var i = 0; i<docs.length; i++ ){
		    	add_el(i, docs[i]);
		    }
		    return q;
	};
	
	console.log("In the controller last ");
	});