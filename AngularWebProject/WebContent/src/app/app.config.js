// Declare app level module which depends on controllers, services, directives and filters module.
var module = angular.module('collegeDays',['home','studentDashboard', 'ui.router',
                                           'ui.bootstrap','blockUI','ngResource','awesome-rating']);

module.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/home');
	
	//$stateProvider.state('home',{url:'/home', templateUrl:'app/home/home.tpl.html', controller:'HomeCtrl'});
});

/*module.config(function($routeProvider) {
	$routeProvider.otherwise('#/home');
}); */





