/**
 * Created by i97139 on 22/07/2016.
 */
(function () {
  "use strict";

  angular.module("reassignService", [])
    .service("reassignService", reassignService);

  function reassignService($http, $q, $log) {
    //variables
    var self = this;

    //exposing public functions
    self.loadAvailableAssignees = loadAvailableAssignees;
    self.requestReassign = requestReassign;

    // public functions
    // function loadAvailableAssignees(ddid) {
    //     var deferred = $q.defer();
    //
    //     var params = {
    //         mfnList: ddid
    //     };
    //
    //     $http.get("/apps/api/addressLookup", {params: params})
    //         .success(function(data) {
    //             deferred.resolve(data);
    //         })
    //         .error(function() {
    //             $log.debug("Error making HTTP GET request to retrieve available assignees for assignment/reassignment");
    //             deferred.reject();
    //         });
    //
    //     return deferred.promise;
    // }
    function loadAvailableAssignees(ddid,start,stop) {
      var params = {
        mfnList: ddid,
        start:start,
        stop:stop
      };
      return $http({
        method: "GET",
        url: '/apps/api/addressLookup',
        params: params,
        dataType: "json",
        async: true,
        headers: {"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"},
        cache: false
      }).then(function(response) {
        console.log(response.data);

        if (angular.isObject(response.data) && response.data.length && response.data.length > 0) {
          return response.data;
        }
        else {
          return $q.reject(response.data);
        }
      }, function(response) {
        return $q.reject(response.data);
      });
    }

    function requestReassign(ddid, xnAddress) {
      var deferred = $q.defer();

      var params = {
        mfnList: ddid,
        xnAddr: xnAddress,
        opr: "reassign"
      };

      $http.post("/apps/api/reassignToJson", null, {params: params})
        .success(function(data) {
          deferred.resolve(data);
        })
        .error(function() {
          $log.debug("Error making HTTP POST request to assign/reassign");
          deferred.reject();
        });

      return deferred.promise;
    }
  }
}());
