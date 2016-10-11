app.controller('HomeCtrl', ['$scope', '$http', function ($scope, $http) {
  'use strict'

  $http.get('http://pokeapi.co/api/v2/pokemon?limit=151')
  .success(function (data) {
    // console.log(data)
    data.results.forEach(function (pokemon) {
      pokemon.name = capitalize(pokemon.name)
    })
    $scope.pokemon = data.results
  })
  .error(function (err) {
    alert(err)
  })

  function capitalize (string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

}])