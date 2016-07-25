/**
 * Created by i97139 on 22/07/2016.
 */
(function () {
  "use strict";

  angular.module("reassignController", [])
    .controller("reassignController", reassignController);

  function reassignController($ionicHistory, $scope, reassignService, $state, $stateParams, utilService, $log, ionicLoadingInterceptor) {
    //variables
    var self = this;
    self.searchText = null;
    self.assignees = null;
    self.pageTitle = $stateParams.action;
    self.showNoneFound = false;
    self.showNoMoreFound = false;//
    self.searchParams = undefined;
    self.start = undefined;
    self.stop = undefined;
    self.infiniteScroll = undefined;//

    var confirmPopup = null;

    //exposing public functions
    self.confirmReassign = confirmReassign;
    self.loadMoreAssignees=loadMoreAssignees;
    self.canLoadMore=canLoadMore;

    $scope.$on("$stateChangeSuccess", function () {
      confirmPopup && confirmPopup.close();

      if (angular.isUndefined(self.assignments) || self.assignments.length === 0) {
        self.start = 1;
        self.stop = 25;
        self.assignees = [];
        self.searchText = "";

        loadAssignees();
      }
      // if(!self.assignees) {
      //     self.searchText = "";
      //     self.assigness = [];
      //     self.showNoneFound = false;
      //     loadSetup();
      // }
    });

    //public functions
    function confirmReassign(assignee) {
      var assigneeName = assignee.name ? assignee.name + " (" + assignee.xn_address + ")" : assignee.xn_address;
      var title = self.pageTitle.toLowerCase() === 'assign'
        ? utilService.getTranslation("Confirm Assignment") // full strings are translated easier by code scanners
        : utilService.getTranslation("Confirm Reassignment");
      var message = self.pageTitle.toLowerCase() === 'assign'
        ? utilService.getTranslation("Assign to {0}?", [assigneeName])
        : utilService.getTranslation("Reassign to {0}?", [assigneeName]);

      confirmPopup = utilService.showConfirm(message, title);

      confirmPopup.then(function (response) {
        if (response) {
          reassignService.requestReassign($stateParams.ddid, assignee.xn_address)
            .then(requestReassignSuccess.bind(null, assigneeName), requestReassignFail.bind(null, assigneeName));
        }
      });
    }
    function loadMoreAssignees() {                 /////
      ionicLoadingInterceptor.suppressForNextRequest();
      loadAssignees();
    }

    function canLoadMore() {
      return self.infiniteScroll;
    }
    // } function canLoadMore() {
    //     return (["current", "completed", "search"].indexOf($stateParams.scope) > -1
    //     && self.infiniteScroll);
    // }                                                /////

    //private functions
    // function loadSetup() {
    //     reassignService.loadAvailableAssignees($stateParams.ddid)
    //         .then(loadSetupSuccess, loadSetupFail);
    // }
    function loadAssignees() {                          ////
      self.searchParams = $stateParams;
      if (self.start === 1) {
        for (var i in self.searchParams) {
          if (angular.isUndefined(self.searchParams[i])) {
            // test[i] === undefined is probably not very useful here
            delete self.searchParams[i];
          }
        }
      }
      self.searchParams.start = self.start;
      self.searchParams.stop = self.stop;
      reassignService.loadAvailableAssignees(self.searchParams.ddid)
        .then(listSuccess, listError);
      self.start = self.stop + 1;
      self.stop = self.start + 2;
      $scope.$broadcast('scroll.infiniteScrollComplete');
    }
    function listSuccess(data) {
      self.assignees = self.assignees.concat(data);
      self.showNoneFound = self.assignees.length === 0;
      self.showNoMoreFound = data.length === 0;
      if (self.assignees.length < 25){
        self.infiniteScroll = false;
      } else {
        self.infiniteScroll = true;
      }
    }

    function listError() {
      $log.debug("Unable to load assignees");
      if (self.assignees.length > 20) {
        self.showNoMoreFound = true;
      }
      else {
        self.showNoneFound = true;
      }
      self.infiniteScroll = false;
    }
    // function loadSetupSuccess(data) {
    //     if (data && data.length > 0) {
    //         self.assignees = data;
    //     }
    //     else {
    //         self.showNoneFound = true;
    //     }
    // }
    //
    // function loadSetupFail() {
    //     $log.debug("Unable to load assignees");
    //     self.showNoneFound = true;
    // }

    function requestReassignSuccess(assigneeName, data) {
      if (!data.success) {
        requestReassignFail(assigneeName);
        return;
      }

      $ionicHistory.clearCache()
        .then($state.go("app.assignment", {ddid: data.newMfn}));
    }

    function requestReassignFail(assigneeName) {
      var message = utilService.getTranslation("Unable to " + self.pageTitle.toLowerCase() + " to ") + assigneeName;
      var title = utilService.getTranslation("Error");

      utilService.showAlert(message, title);
    }
  }
}());
