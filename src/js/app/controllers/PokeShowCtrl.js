app.controller('PokeShowCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
  'use strict'

  $scope.show = $routeParams.pokeName

  $http.get('http://pokeapi.co/api/v2/pokemon/' + $routeParams.pokeName.toLowerCase())
  .success(function (data) {
    // console.log(data)
    $scope.data = data
    typeBattling(data.types, data.types[0].type.url)
    getEvolutionChain(data.id)
  })
  .error(function (err) {
    alert(err)
  })

  function typeBattling (typeArr, endpoint) {
    $scope.pokeTypes = []
    typeArr.forEach(function (val) {
      // console.log(val.type)
      $scope.pokeTypes.push(val.type)
    })
    $http.get(endpoint)
    .success(function (data) {
      // console.log(data)
      $scope.types = data
    })
    .error(function (err) {
      alert(err)
    })
  }

  function getEvolutionChain (id) {
    $http.get('http://pokeapi.co/api/v2/pokemon-species/' + id + '/')
    .success(function (data) {
      $http.get(data.evolution_chain.url)
      .success(function (chain) {
        // console.log(chain)
        $scope.chain = []
        fullChain(chain.chain)
      })
      .error(function (error) {
        alert(error)
      })
    })
    .error(function (err) {
      alert(err)
    })
  }

  function fullChain (obj) {
    $scope.chain.push(obj.species)
    if (obj['evolves_to'] && obj.evolves_to.length > 0) {
      obj.evolves_to.forEach(function (val) {
        fullChain(val)
      })
    }
  }

}])