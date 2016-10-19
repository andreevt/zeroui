
angular.module('zeroui').controller('AlertDemoCtrl', function ($scope) {
  $scope.alerts = [
  ];

  $scope.addAlert = function() {
    $scope.alerts.push({type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.'});
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };
});