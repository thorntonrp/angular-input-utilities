/**
 * Created by ericjohndixon on 2/18/16.
 */
'use strict';

angular.module('angular-input-utilities',[])
    .directive('alphaNumericOnly', function ($parse) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, iElement, iAttrs) {
                scope.$watch(iAttrs.ngModel, function (value, oldValue) {
                    //The use can remove the number so it's null or enter a 0 so return
                    if (value === 0 || value === null && typeof value !== 'undefined') {
                        return;
                    }
                    var newValue =(value) ? value.toString().replace(/\W/g, '') : '';
                    $parse(iAttrs.ngModel).assign(scope, newValue);
                });
            }
        };
    });
