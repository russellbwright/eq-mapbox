angular.module('earthApp').controller('listCtrl', function($scope, earthService){
    

    earthService.quaker().then(function(data){
        console.log(data.features)
        $scope.quakes = data.features;
    })

    // earthService.fixIt().then(function(data){
    //     console.log(data.features)
    //     $scope.quakes = data.features;
    // })

})