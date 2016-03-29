/**
 * Created by ericjohndixon on 8/10/15.
 */
(function () {
    'use strict';
    //'<i ng-if="showUncloseIcon" class="lds-icon unclose-icon lds-icon-dont"></i>' +
    angular.module('angular-input-utilities')
        .directive('closeIcon', [function () {
            return {
                restrict: 'E',
                scope: {
                    showUncloseIcon: '=showUncloseIcon',
                    closeTitle: '@closeTitle',
                    uncloseTitle: '@uncloseTitle'
                },
                template: '<div class="close-icon-group" tooltip-popup-delay="1000" tooltip-append-to-body="true" tooltip="{{(showUncloseIcon) ? uncloseTitle : closeTitle}}">' +
                '<i class="fa fa-close close-icon" ng-class="{\'un-close-icon\' : showUncloseIcon}"></i> ' +
                '</div>'
            };
        }]);
})();
