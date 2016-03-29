/**
 * Created by ericjohndixon on 9/23/15.
 */
(function () {
  'use strict';

  angular.module('angular-input-utilities')
    .directive('selectAllOnFocus', [function () {
      return {
        restrict: 'A',
        link: linker
      };

      ////////////////////////////////////////////////////
      function linker(scope, element, attrs) {
        $(element).on('click', function(){
            $(this).select();
        });
      }

    }]);
})();
