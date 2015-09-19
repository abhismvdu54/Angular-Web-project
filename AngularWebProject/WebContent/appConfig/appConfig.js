var appModule = angular.module('appModule',['ngRoute','ngResource','blockUI','awesome-rating','ui.bootstrap']);

/*appModule.controller('reviewController',['$scope',reviewController]);

function reviewController ($scope) {
	//alert("In review controller");
//	alert("In cons");
	var vm = this;
	vm.prop1  = 1.5;
	//vm.prop2  = 2;
	//vm.prop3  = 3;
	//vm.prop4  = 4;
	//vm.prop5  = 5;
}*/

//Add dependency of ng route.

 appModule.config(function($routeProvider, $httpProvider, blockUIConfigProvider) {
	
	 $httpProvider.defaults.useXDomain = true;
     delete $httpProvider.defaults.headers.common['X-Requested-With'];
     delete $httpProvider.defaults.headers.post['Content-type'];
     
	$routeProvider.when('/student', {
		controller : "studentController",
		templateUrl : "student/student.html"
	}).when('/admin', {
		controller : "adminController",
		templateUrl : "admin/admin.html"
	}).otherwise({
		redirectTo : '/student'
	});
	
	 blockUIConfigProvider.message ="executing...";
}); 

/* appModule.config(function(blockUIConfigProvider){
	 blockUIConfigProvider.message ="executing...";
 });*/
 var adminController = appModule.controller('adminController', function($scope) {
 	
 });
