/**
 * Created by ericjohndixon on 9/21/15.
 */
(function () {
  'use strict';

  angular.module('angular-input-utilities')
    .directive('focusOnStateLoad', [function () {
      return {
        restrict: 'A',
        link: linker
      };

      ////////////////////////////////////////////////////
      function linker(scope, element, attrs) {
        $(element).focus();
      }

    }]);
})();
