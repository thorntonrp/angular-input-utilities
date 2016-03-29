/**
 * Created by ericjohndixon on 8/28/15.
 */
(function () {
  'use strict';

  angular.module('angular-input-utilities')
    .directive('utilTypeAhead', ['$compile', function ($compile) {
          return {
              restrict: 'A',
              link: linker,
              require: '^ngModel',
              scope: {
                  queryFn : '=queryFn'
              }
          };

      ////////////////////////////////////////////////////
      function linker(scope, element, attrs, ngModelCtrl) {

          var typeAheadBox = angular.element('<div id="typeAheadBox" class="type-ahead-box show-hide ng-hide" ng-show="showBox"><div ng-repeat="item in items"> <div>{{item.unitWard}}</div></div></div>');

          scope.showBox = false;
          setupElements();

          // initial creation of elements
          function setupElements() {
              element.after(typeAheadBox);
              $compile(typeAheadBox)(scope);

              $('html').bind('click',function() {
                  if(!$('#typeAheadBox').is(':active')) {
                      scope.$apply(function () {
                          scope.showBox = false;
                      });
                  }
              });
              angular.element(element).bind('blur', function () {
                  if(!$('#typeAheadBox').is(':active')) {
                      scope.$apply(function () {
                          scope.showBox = false;
                      });
                  }
              });

              angular.element(typeAheadBox).bind('blur', function () {
                  scope.$apply(function () {
                      scope.showBox = false;
                  });
              });

              scope.$watch(function() {
                  return ngModelCtrl.$modelValue;
              }, function(nv, ov) {
                  if(nv) {
                      scope.queryFn(nv).then(function(data){
                          scope.items = data;
                      });
                      scope.showBox = true;
                  } else {
                      scope.showBox = false;
                  }
              });
          }
      }

    }]);
})();
