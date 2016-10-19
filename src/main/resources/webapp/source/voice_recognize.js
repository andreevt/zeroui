angular.module('zeroui',['ui.bootstrap'])

angular.module('zeroui').controller('voice-converter',['$scope','$http',



  function($scope, $http) {

  $scope.submit = function() {

    if (window.hasOwnProperty('webkitSpeechRecognition')) {

      var recognition = new webkitSpeechRecognition();

      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.lang = "en-US";
      recognition.start();

      recognition.onresult = function(e) {
        document.getElementById('transcript').value
                                 = e.results[0][0].transcript;
        recognition.stop();
        //document.getElementById('labnol').submit();

var inputText = "https://api.projectoxford.ai/luis/v1/application?id=fd8fe0e7-2216-41ad-a509-c811c48baef3&subscription-key=fee7cf84355e468fac27b39957a0f8d6&"+document.getElementById('labnol');
        $http({
          method: 'GET',
          url: inputText
        }).then(function successCallback(response) {
            alert("success");
          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            alert("error");
          });
      };

      recognition.onerror = function(e) {
        recognition.stop();
      }

    }
  }
}
  ]);