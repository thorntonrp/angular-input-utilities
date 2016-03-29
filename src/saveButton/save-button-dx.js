/**
 * Created by ericjohndixon on 9/8/15.
 */
(function () {
  'use strict';

  angular.module('angular-input-utilities')
    .directive('saveButton', [function () {
          return {
              restrict: 'E',
              controller: 'SaveButtonCtrl',
              controllerAs: 'saveButton',
              templateUrl: 'app/sharedServices/input/saveButton/save-button-tpl.html',
              scope: {
                  unsavedChangesTrigger : '=unsavedChangesTrigger',
                  savingChangesTrigger : '=savingChangesTrigger',
                  saveFn : '=saveFn'
              },
              bindToController: true
          };
      }])
    .controller('SaveButtonCtrl', [function() {
        var saveButton = this;

    }]);
})();
