angular.module('zeroui', ['ui.bootstrap'])
angular.module('zeroui').directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});
angular.module('zeroui').controller('voice-converter', ['$scope', '$http',


    function ($scope, $http) {

        $scope.helpShown = false;
        $scope.transferShown = false;
        $scope.showmeShown = false;

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
                $scope.restCall=function(){
                    var inputText = 'https://api.projectoxford.ai/luis/v1/application?id=fd8fe0e7-2216-41ad-a509-c811c48baef3&subscription-key=fee7cf84355e468fac27b39957a0f8d6&q=' + document.getElementById('transcript').value;

                    $http.get(inputText)
                        .success(function (data) {
                            $scope.isCollapsed = false;
                            $scope.result = data;
                            var result = data.intents[0];

                            if (result.intent == 'Transfer') {
                                $scope.helpShown = false;
                                $scope.transferShown = true;
                                $scope.showmeShown = false;
                                $scope.howmuchShown=false;
                                $scope.transfer = result.actions[0].parameters;


                            } else if (result.intent == 'Show Me') {
                                $scope.helpShown = false;
                                $scope.transferShown = false;
                                $scope.showmeShown = true;
                                $scope.howmuchShown=false;
                                $scope.showme = data.entities;


                            } else if (result.intent == 'Help') {
                                $scope.helpShown = true;
                                $scope.transferShown = false;
                                $scope.showmeShown = false;
                                $scope.howmuchShown=false;
                                $scope.help = "Tips: Transfer $100 from Sara To Cherry. / How much did I spend on shopping last week? / Show me payment to Cherry yesterday.";

                            } else if (result.intent == 'How Much') {
                                 $scope.howmuchShown=true;
                                 $scope.helpShown = false;
                                 $scope.transferShown=false;
                                 $scope.showmeShown=false;
                                 $scope.howmuch = result.actions[0].parameters;

                            } else {
                                alert('error intent!');
                            }

                        }).error(function (response) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                    });
                };
                recognition.onerror = function (e) {
                    recognition.stop();
                };
                $scope.cancel=function(){
                    document.getElementById('transcript').value='';
                    $scope.isCollapsed = true;
                };
                $scope.confirm=function(){
                    $scope.transferShown=false;
                    $scope.transferDone=true;
                }

            }
        }
    }
]);
