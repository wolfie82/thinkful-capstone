(function() {
  angular.module('voxChef')
    .controller('SigninFormController', ['$window', '$scope', SigninFormController]);

  function SigninFormController($window, $scope) {

    $scope.tokenData = "Waiting for Token Data...";

    // This is mock data
    // Server side would need to be implemented for challenge
    var beginEnrollResponse = {
      "enroll_data": {
        "appId": "http://localhost:9000",
        "challenge": "AZXvS3SEikfIDb-UgjZKg",
        "version": "U2F_V2"
      },
      "sign_data": []
    };

    $scope.addToken = function() {
      $window.u2f.register(
        [beginEnrollResponse.enroll_data],
        beginEnrollResponse.sign_data,
        function (response) {
          if (response.errorCode) {
            onError(response.errorCode, true);
          } else {
            response['sessionId'] = beginEnrollResponse.sessionId;
            onTokenEnrollSuccess(response);
          }
        });
    };

    function onError(code, enrolling) {
      console.log(code, enrolling);
    }

    function onTokenSignSuccess(responseData) {
      console.log(responseData);
    }

    function onTokenEnrollSuccess(finishEnrollData) {
      console.log(finishEnrollData);
      $scope.$apply(function(){
        $scope.tokenData = finishEnrollData.registrationData;
      });
    }
  }

})();

