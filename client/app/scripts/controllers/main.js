'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('MainCtrl', function ($scope, $http, PagerService, API) {
    $scope.query = '';

    $scope.autoSearch = function() {
      if ($scope.query && $scope.query.length >= 3) {
        $scope.search();
      }
    };

    $scope.search = function() {
      var req = $http.get(API + '?q=' + $scope.query);

      $scope.loading = true;
      req.then(function (res) {
        $scope.domains = res.data;
        $scope.pager = {};
        $scope.setPage(1);
        $scope.loading = false;
      });
      req.catch(function (err) {
        $scope.error = err;
      });
    };

    $scope.navigate = function(domain) {
      if (!domain) {
        return;
      }

      var win = window.open('http://' + domain, '_blank');
      win.focus();
    };

    $scope.setPage = function(page) {
      if (page < 1 || page > $scope.pager.totalPages) {
          return;
      }

      $scope.pager = PagerService.getPager($scope.domains.length, page);
      $scope.currentDomains = $scope.domains.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
    };

  });
