var studentDashboardModule = angular.module('studentDashboard', ['library',
    'ui.router']);


studentDashboardModule.config(function config($stateProvider) {
    $stateProvider.state('studentDashboard', {
        url: '/studentDashboard',
        views: {
            "main": {
                controller: 'studentDashboardCtrl',
                templateUrl: 'app/studentDashboard/studentDashboard.tpl.html'
            }
        },
        data: {pageTitle: 'Student Dashboard'}
    })
    
.state('library', {
        url: '/library',
        parent:'studentDashboard',
        views: {
            "studentPage": {
                controller: 'libraryCtrl',
                templateUrl: 'app/library/library.tpl.html',
                
            }
        },
        data: {pageTitle: 'Student Dashboard'}
    });
});


