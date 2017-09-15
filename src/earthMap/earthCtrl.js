angular.module('earthApp').controller('earthCtrl', function($scope, earthService, $state){

    $scope.test = earthService.tests;
    earthService.mapQuest().then(function(data){
        console.log(data);
        return $scope.earthData = data
    })

    $scope.quakeButtons = earthService.quakeButtons;

    

})