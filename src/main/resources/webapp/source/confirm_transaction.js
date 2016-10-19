angular.module('zeroui').controller('confirm-transaction', ['$scope', '$http',


    function ($scope, $http) {
        $scope.submit = function () {
            $scope.isCollapsed = true;
            document.getElementById('transcript').value='';
            if (window.hasOwnProperty('webkitSpeechRecognition')) {

                var recognition = new webkitSpeechRecognition();

                recognition.continuous = false;
                recognition.interimResults = false;

                recognition.lang = "en-US";
                recognition.start();

                recognition.onresult = function (e) {
                    document.getElementById('transcript').value = e.results[0][0].transcript;
                    recognition.stop();
                    $scope.restCall();
                };
                recognition.onerror = function (e) {
                    recognition.stop();
                }
        }
    }