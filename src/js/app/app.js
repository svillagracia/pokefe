var app = angular.module('PokeFE', ['ngRoute', 'ngResource'])

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  'use strict'

  $locationProvider.html5Mode(false)

  $routeProvider
  .when('/', {
    templateUrl: 'bld/views/home.html',
    controller: 'HomeCtrl'
  })
  .when('/about', {
    templateUrl: 'bld/views/about.html',
    controller: 'AboutCtrl'
  })
  .when('/pokemon/:pokeName', {
    templateUrl: 'bld/views/show-pokemon.html',
    controller: 'PokeShowCtrl'
  })
  .otherwise({
    redirectTo: '/'
  })

}])