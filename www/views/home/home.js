'Use Strict';
angular.module('App').factory("States", function(){
  var states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Dakota", "North Carolina", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];

  return states;

}).controller('homeController', function ($state, $cordovaOauth, $localStorage, $location, $http, $ionicPopup, $firebaseObject, Auth, FURL, $cordovaCamera, Utils,States,$scope,$ionicModal) {
  var states = ["AL", "AK", "AS", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FM", "FL", "GA", "GU", "HI", "ID", "IL",
    "IN", "IA", "KS", "KY", "LA", "ME", "MH", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM",
    "NY", "NC", "ND", "MP", "OH", "OK", "OR", "PW", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VI", "VA",
    "WA", "WV", "WI", "WY"];
  $scope.states=States;
  $scope.createDummyData = function () {
    var dataTemp = {};
    angular.forEach(states, function (state, key) {
      dataTemp[state] = {value: Math.random()}
    });
    $scope.dummyData = dataTemp;
    console.log($scope.dummyData);
  };
 // $scope.createDummyData();

  $scope.changeHoverRegion = function (region) {
    $scope.hoverRegion = region;
    console.log($scope.hoverRegion);
  };


  $scope.selected = undefined;


  var ref = new Firebase(FURL);
    var model = this;

  model.sayWhat = function () {
   alert("say what");
    };

    model.logOut = function () {
      alert("say whatzzzzz");

      Auth.logout();
      $location.path("/login");
    };
    model.takePhoto = function () {
      var options = {
        quality: 75,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 300,
        targetHeight: 300,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
      };

      $cordovaCamera.getPicture(options).then(function (imageData) {
        model.imgURI = "data:image/jpeg;base64," + imageData;
      }, function (err) {
        // An error occured. Show a message to the user
      });
    }

    model.choosePhoto = function () {
      console.log("photozzzzzzzzzzzzz");

      var options = {
        quality: 75,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 300,
        targetHeight: 300,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
      };

      $cordovaCamera.getPicture(options).then(function (imageData) {
        model.imgURI = "data:image/jpeg;base64," + imageData;
      }, function (err) {
        // An error occured. Show a message to the user
      });
    };
  $ionicModal.fromTemplateUrl('views/home/modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) { $scope.modal = modal; });


  }
);
