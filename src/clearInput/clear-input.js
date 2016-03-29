/**
 * Created by ericjohndixon on 5/12/15.
 */
(function () {
  "use strict";

  // directive attribute that is used to add a clear button to input elements
  angular.module('angular-input-utilities')
    .directive('clearInput', ['$compile', '$timeout', function ($compile, $timeout) {
      return {
        restrict: 'A',
        link: linker,
        require: 'ngModel',
        scope: {}
      };

      ////////////////////////////////////////////////////
      function linker(scope, element, attrs, ngModelCtrl) {
          var template = $compile('<i ng-show="enabled" ng-mousedown="reset()" class="clear-input fa fa-close show-hide"></i>')(scope);
          element.after(template);

          //accounts for any html 5 stuff that could be on the far right
          element.css('padding-right', '25px');

          scope.reset = function () {
              ngModelCtrl.$setViewValue('');
              ngModelCtrl.$render();
              if (!attrs.uiDate) {
                  $timeout(function () {
                      element[0].focus();
                  }, 0, false);
              }
          };
          element.bind('mouseenter', function () {
              scope.enabled = (ngModelCtrl.$viewValue !== null && ngModelCtrl.$viewValue !== '');
              scope.$apply();
          });
          element.parent().bind('mouseleave', function () {
              scope.enabled = false;
              scope.$apply();
          });
          //element.parent().bind('focusout', function () {
          //  if(!attrs.uiDate) {
          //    scope.enabled = false;
          //      if(!scope.$$phase) {
          //          scope.$apply();
          //      }
          //  }
          //});

          element.bind('input', function () {
              scope.enabled = (ngModelCtrl.$viewValue !== null && ngModelCtrl.$viewValue !== '');
          });

      }

    }])
})();
