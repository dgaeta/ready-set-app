// app.js

var so = angular.module('so', [
    'ui.router',
    'ui.bootstrap',
    'so.home',
    'so.auth',
    'so.stay',
    'so.invest',
    'so.about',
    'so.works',
    'so.signup',
    'so.profile',
    'AuthService',
    'FireRefService',
    'UserService',
    'so.private',
    'ngCookies',
    'ngFileUpload',
    'ngImgCrop',
    'ngAnimate',
    'ui.bootstrap'
]);

so.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/');
    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;
    
});

so.controller("soCtrl", ["$scope", "$rootScope", "$cookies", "$state", "UserService",
	function($scope, $rootScope, $cookies, $state, UserService) {

        // $cookies.put('token', '');
        $scope.token = UserService.token;

        $scope.tokenExists = function() {
            if ($rootScope.token != ""){
                return true;
            }
            else {
                return false;
            }
        }

        $scope.logout = function() {
            $rootScope.token = "";
            $cookies.put('token', '');
            $scope.token = "";
            $state.go('home');

        }

  //       FireRefService.onAuth( function(authData) {
  //           $scope.authData = authData;

  //           if (FireRefService.getAuth()) {
  //               $scope.uid = FireRefService.getAuth().uid;
  //               $scope.user = UserService($scope.uid);
  //           };
  //       })

		// if ($scope.authData) {
		//   console.log("Logged in as:", $scope.authData.uid);
		// } else {
		//   console.log("Logged out");
		// }

	}
]);

so.run(function($rootScope, $state) {

    // $state.go('soHome');

    $rootScope.$on('$routeChange', function(event, next, previous) {
        $scope.token = $cookies.get('token');
        
    });

    // $rootScope.$on('$stateChangeStart', 
    // function(event, toState, toParams, fromState, fromParams){ 
    //     console.log("in here");
    // })

    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        if (error === 'AUTH_REQUIRED') {
            $state.go('soAuthLogin');
        }
    });
});