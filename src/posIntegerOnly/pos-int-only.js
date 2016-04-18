/**
 * Created by ericjohndixon on 10/30/15.
 */
'use strict';

angular.module('angular-input-utilities')
    .directive('posIntOnly', function ($parse) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, iElement, iAttrs) {
                scope.$watch(iAttrs.ngModel, function (value, oldValue) {
                    //The use can remove the number so it's null or enter a 0 so return
                    if (value === 0 || value === null && typeof value !== 'undefined') {
                        return;
                    }
                    //The user entered a character so value is undefined
                    if (!value || isNaN(value)) {
                        if(value !== '' && value !== undefined && value !== null) {
                            $parse(iAttrs.ngModel).assign(scope, oldValue);
                        }
                        return;
                    }

                    //If you don't have the type of input set to number then this will get hit otherwise it will never hit this
                    var newValue = (iAttrs.numberValidation === 'rank') ? parseInt(value.toString().replace(/[^0-9]/g, '').slice(0, 2)) : parseInt(value.toString().replace(/[^0-9]/g), '');
                    $parse(iAttrs.ngModel).assign(scope, newValue);
                });
            }
        };
    });
