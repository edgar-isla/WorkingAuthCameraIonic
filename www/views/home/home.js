'Use Strict';
angular.module('App').factory("States", function(){
  var states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Dakota", "North Carolina", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];

  return states;

}).controller('homeController', function ($state, $cordovaOauth, $localStorage, $location, $http, $ionicPopup, $firebaseObject, Auth, FURL, $cordovaCamera, Utils,States,$scope) {

  $scope.selected = undefined;

  $scope.states = States;

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
      console.log($scope.states);
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
    }


  }
);
