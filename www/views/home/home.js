'Use Strict';
angular.module('App').controller('homeController', function ($state, $cordovaOauth, $localStorage, $location, $http, $ionicPopup, $firebaseObject, Auth, FURL, $cordovaCamera, Utils,States,$scope,$ionicModal,toaster,myStates) {

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
  $scope.myFunction = function () {
    alert($scope.states);
  };


  $scope.selected = undefined;


  var ref = new Firebase(FURL);
  var model = this;

  model.sayWhat = function () {
   alert("say what");
    };

    model.logOut = function () {
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
    };

    model.choosePhoto = function () {
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

  $scope.closeModal = function() {
    $scope.modal.hide();
    myStates.selectedStates(States);
    console.log(myStates.returnStates());
    toaster.pop('success', "Successfully Saved :", ""+myStates.returnStates());


  };
  }

);
