angular.module('earthApp', ['ui.router']).config(function($stateProvider, $urlRouterProvider){
    $stateProvider
        .state('home',{
            url:'/',
            templateUrl: "./src/earthMap/earthMap.html",
            controller: "earthCtrl"
        })

        .state('contact',{
            url:'/contact',
            templateUrl: "./src/contact/contact.html"
        })

        .state('about', {
            url: '/about',
            templateUrl: "./src/about/about.html"
        })

        .state('list', {
            url: '/list',
            templateUrl: "./src/list/list.html"
        })

        
        // $urlRouterProvider
        //     .outherwise('/');
});