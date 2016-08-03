/**
 * Created by i97139 on 26/07/2016.
 */
'Use Strict';
angular.module('App').controller('statesController', function (States,myStates,$cordovaCamera,$ionicModal,$scope) {
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
  $ionicModal.fromTemplateUrl('views/myStates/modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) { $scope.modal = modal; });

  $scope.closeModal = function() {
    $scope.modal.hide();


  };



  }

);
//
//
// /////
// <html ng-app="ionicApp">
//
//   <head>
//   <meta charset="utf-8">
//   <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">
//
//   <title>Tabs Example</title>
//
// <link href="//code.ionicframework.com/nightly/css/ionic.css" rel="stylesheet">
//   <script src="//code.ionicframework.com/nightly/js/ionic.bundle.js"></script>
//   </head>
//
//   <body>
//
//   <ion-nav-bar class="bar-positive">
//   <ion-nav-back-button class="button-icon ion-arrow-left-c">
//   </ion-nav-back-button>
//   </ion-nav-bar>
//
//   <ion-nav-view></ion-nav-view>
//
//
//   <script id="templates/tabs.html" type="text/ng-template">
//   <ion-tabs class="tabs-icon-top tabs-positive">
//
//   <ion-tab title="Home" icon="ion-home" href="#/tab/home">
//   <ion-nav-view name="home-tab"></ion-nav-view>
//   </ion-tab>
//
//   <ion-tab title="About" icon="ion-ios-football" href="#/tab/about">
//   <ion-nav-view name="about-tab"></ion-nav-view>
//   </ion-tab>
//
//   <ion-tab title="Contact" icon="ion-bag" ui-sref="tabs.contact">
//   <ion-nav-view name="contact-tab"></ion-nav-view>
//   </ion-tab>
//
//   </ion-tab>
//
//   </ion-tabs>
//   </script>
//
//   <script id="templates/home.html" type="text/ng-template">
//   <ion-view view-title="Home">
//   <ion-content class="padding">
//   <p>
//   <a class="button icon icon-right ion-chevron-right" href="#/tab/facts">Scientific Facts</a>
// <a class="button icon icon-right ion-chevron-right" ng-click="openModal()">FORM</a>
//   </p>
//   </ion-content>
//   </ion-view>
//   </script>
//
//   <script id="templates/facts.html" type="text/ng-template">
//   <ion-view view-title="Facts">
//   <ion-content class="padding">
//   <p>Banging your head against a wall uses 150 calories an hour.</p>
// <p>Dogs have four toes on their hind feet, and five on their front feet.</p>
// <p>The ant can lift 50 times its own weight, can pull 30 times its own weight and always falls over on its right side when intoxicated.</p>
// <p>A cockroach will live nine days without it's head, before it starves to death.</p>
// <p>Polar bears are left handed.</p>
// <p>
// <a class="button icon ion-home" href="#/tab/home"> Home</a>
//   <a class="button icon icon-right ion-chevron-right" href="#/tab/facts2">More Facts</a>
// </p>
// </ion-content>
// </ion-view>
// </script>
//
// <script id="templates/facts2.html" type="text/ng-template">
//   <ion-view view-title="Also Factual">
//   <ion-content class="padding">
//   <p>111,111,111 x 111,111,111 = 12,345,678,987,654,321</p>
// <p>1 in every 4 Americans has appeared on T.V.</p>
// <p>11% of the world is left-handed.</p>
// <p>1 in 8 Americans has worked at a McDonalds restaurant.</p>
// <p>$283,200 is the absolute highest amount of money you can win on Jeopardy.</p>
// <p>101 Dalmatians, Peter Pan, Lady and the Tramp, and Mulan are the only Disney cartoons where both parents are present and don't die throughout the movie.</p>
// <p>
// <a class="button icon ion-home" href="#/tab/home"> Home</a>
//   <a class="button icon ion-chevron-left" href="#/tab/facts"> Scientific Facts</a>
// </p>
// </ion-content>
// </ion-view>
// </script>
//
// <script id="templates/mylongform.html" type="text/ng-template">
//   <ion-modal-view class="product edit create">
//   <form name="itemEdit" novalidate>
// <ion-header-bar class="bar-positive fix-buttons">
//   <a class="button" ng-click="closeModal()">Cancel</a>
//   <h1 class="title">Form</h1>
//   </ion-header-bar>
//   <ion-content has-bouncing="true">
//   <div class="row" ng-class="{'no-padding-top': !data.editItem}">
//   <div class="col">
//   <label class="item item-input large">
//   <input type="text" placeholder="Title">
//   </label>
//   </div>
//   </div>
//   <div class="editable-image horizontal-image">
//   <div class="add"><i class="icon ion-upload"></i>
//   <div class="instructions">Tap to upload photo</div>
// </div>
// </div>
// <div class="row">
//   <div class="col">
//   <label class="item item-input large">
//   <input type="text" placeholder="Price">
//   </label>
//   </div>
//   </div>
//   <div class="row description-row">
//   <div class="col">
//   <label class="item item-input text">
//   <textarea placeholder="Description" rows="5" ng-model="item.description" ng-Required="true" name="description" lose-focus-on-return></textarea>
// </label>
// </div>
// </div>
//
// <div class="row charity-row">
//   <div class="col col-10 vert-center">
//   <div class="charity large"></div>
//   </div>
//   </div>
//
//
//   </ion-content>
//   </form>
//   </ion-modal-view>
//   </script>
//
//   <script id="templates/about.html" type="text/ng-template">
//   <ion-view view-title="About">
//   <ion-content class="padding">
//   <h3>Create hybrid mobile apps with the web technologies you love.</h3>
// <p>Free and open source, Ionic offers a library of mobile-optimized HTML, CSS and JS components for building highly interactive apps.</p>
// <p>Built with Sass and optimized for AngularJS.</p>
//                                      <p>
//                                      <a class="button icon icon-right ion-chevron-right" href="#/tab/navstack">Tabs Nav Stack</a>
// </p>
// </ion-content>
// </ion-view>
// </script>
//
// <script id="templates/nav-stack.html" type="text/ng-template">
//   <ion-view view-title="Tab Nav Stack">
//   <ion-content class="padding">
//   <p><img src="http://ionicframework.com/img/diagrams/tabs-nav-stack.png" style="width:100%"></p>
//   </ion-content>
//   </ion-view>
//   </script>
//
//   <script id="templates/contact.html" type="text/ng-template">
//   <ion-view title="Contact">
//   <ion-content>
//   <div class="list">
//   <div class="item">
// @IonicFramework
// </div>
// <div class="item">
// @DriftyTeam
// </div>
// </div>
// </ion-content>
// </ion-view>
// </script>
//
// </body>
//
// </html>
