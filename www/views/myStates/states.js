/**
 * Created by i97139 on 26/07/2016.
 */
'Use Strict';
angular.module('App').controller('statesController', function (States,myStates,$cordovaCamera) {
  var model= this;
  model.states=[];
  model.picTrue=false;
  getStates();
  function getStates() {
    model.states=myStates.returnStates();

  }
  model.click=function () {
    alert(model.imgURI);

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
      model.picTrue=true;
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
      model.picTrue=true;
      alert(model.imgURI);
    }, function (err) {
      // An error occured. Show a message to the user
    });
  };

  

  }

);
