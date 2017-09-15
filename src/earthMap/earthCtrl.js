angular.module('earthApp').controller('earthCtrl', function($scope, earthService, $state){
    $scope.test = earthService.tests;
    angular.element(document).ready(function(){
        earthService.intiMap()
        earthService.mapQuest().then(function(data){
            return $scope.earthData = data
        })
        // $scope.quakeButtons = earthService.quakeButtons;
    })
    $scope.quakeButtons = earthService.quakeButtons;
})