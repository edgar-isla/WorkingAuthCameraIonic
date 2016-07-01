'Use Strict';
angular.module('App').controller('homeController', function ($state, $cordovaOauth, $localStorage, $location, $http, $ionicPopup, $firebaseObject, Auth, FURL, $cordovaCamera, Utils) {
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
    }


  }
);
