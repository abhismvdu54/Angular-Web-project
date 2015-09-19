angular.module('ui.bootstrap.demo', ['ngAnimate', 'ui.bootstrap']);
angular.module('ui.bootstrap.demo').controller('ModalDemoCtrl', function ($scope, $modal, $log) {

  $scope.items = ['item1', 'item2', 'item3'];

  $scope.animationsEnabled = true;

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'loginModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

 /* $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };
*/
});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

angular.module('ui.bootstrap.demo').controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

	$scope.loginModalBody = "modal-body";
	$scope.showSignInButton = true;
	$scope.showSignInTitle = true;
	$scope.showSignUpButton = true;
	$scope.showBackToSignIn = false;
	
	$scope.login = function(){
		$scope.showCnfPwdInputBox = false;
		$scope.showCollegeInputBox = false;
		$scope.showSemInputBox = false;
		$scope.showSignUpTitle = false;
		$scope.showSignInTitle = true;
		$scope.showSignInButton = true;
		
		$scope.showBackToSignIn = false;
	};
	
	$scope.signUp = function(){
		$scope.showCnfPwdInputBox = true;
		$scope.showCollegeInputBox = true;
		$scope.showSemInputBox = true;
		$scope.showSignInButton = false;
		$scope.showSignInTitle = false;
		$scope.showSignUpTitle = true;
		$scope.showBackToSignIn = true;
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