var homeModule = angular.module('home');

homeModule.controller('HomeCtrl', function HomeCtrl($scope, $parse, $modal, loginService, $location) {

	$scope.openLoginModal = function(){
		//open the login modal
		$scope.animationsEnabled = true;

		//$scope.open = function (size) {

		var modalInstance = $modal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'loginModalContent.html',
			controller: 'ModalInstanceCtrl',
			size: 'lg',
			resolve: {
				items: function () {
					return $scope.items;
				}
			}
		});

		modalInstance.result.then(function (selectedItem) {
			$scope.selected = selectedItem;
		}, function () {
			// $log.info('Modal dismissed at: ' + new Date());
		});
		// };


		/* $scope.verifyLogin = function(){

    	            var username = $scope.username;
    	            var password = $scope.password;

    	            var result = loginService.verify(username, password);
    	            if (result) {
    	                $location.path('/userDashboard');
    	            }
    	        }*/
	};

	$scope.items = [
	                'The first choice!',
	                'And another choice for you.',
	                'but wait! A third!'
	                ];

	$scope.status = {
			isopen: false
	};

	$scope.toggled = function(open) {
		// $log.log('Dropdown is now: ', open);
	};

	$scope.toggleDropdown = function($event) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope.status.isopen = !$scope.status.isopen;
	};


	/*crousel for the images data setting*/
	$scope.myInterval = 500000;
	$scope.noWrapSlides = false;
	var slides = $scope.slides = [];
	$scope.addSlide = function() {
		//var newWidth = 1300 + slides.length + 1;
		slides.push({
			image: 'assets/img/Social-Media-College-Student.jpg',
			text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
			['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
		});
	};
	for (var i=0; i<4; i++) {
		$scope.addSlide();
	}




});


homeModule.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items, loginService,$location) {

	$scope.loginModalBody = "modal-body";
	$scope.showSignInButton = true;
	$scope.showSignInTitle = true;
	$scope.showSignUpButton = true;
	$scope.showBackToSignIn = false;
	$scope.emailPwdNotMatchModel=false;

	$scope.login = function(){

		$scope.showCnfPwdInputBox = false;
		$scope.showCollegeInputBox = false;
		$scope.showSemInputBox = false;
		$scope.showSignUpTitle = false;
		$scope.showSignInTitle = true;
		$scope.showSignInButton = true;

		$scope.showBackToSignIn = false;

		//verify the user and password
		var loginData={};
		loginData.email=$scope.emailIdModel;
		loginData.password=$scope.passwordModel;
		
		var verifyLogin = loginService.verifyLogin();
		verifyLogin.call(loginData).$promise.then(function(data){
			if(data.authenticated){
				$location.path('/studentDashboard');
				$modalInstance.dismiss('cancel');
			}else{
				$scope.emailPwdNotMatchModel=true;
			}
				
				
			});
		/*var matched = loginService.verifyLogin($scope.emailIdModel, $scope.passwordModel);
		if(matched) {
			
			$location.path('/studentDashboard');
		}*/
	};

	$scope.signUp = function(){
		$scope.showCnfPwdInputBox = true;
		$scope.showCollegeInputBox = true;
		$scope.showSemInputBox = true;
		$scope.showSignInButton = false;
		$scope.showSignInTitle = false;
		$scope.showSignUpTitle = true;
		$scope.showBackToSignIn = true;
		$scope.emailPwdNotMatchModel=false;
	};

	$scope.backToSignIn = function(){
		$scope.login();
	};
	$scope.items = items;
	$scope.selected = {
			item: $scope.items[0]
	};

	/*  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };*/

	$scope.closeModal = function () {
		$modalInstance.dismiss('cancel');
	};
});