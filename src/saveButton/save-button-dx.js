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
              templateUrl: 'src/saveButton/save-button-tpl.html',
              scope: {
                  unsavedChangesTrigger : '=unsavedChangesTrigger',
                  saveFn : '=saveFn'
              },
              bindToController: true
          };
      }])
    .controller('SaveButtonCtrl', [function() {
        var saveButton = this;
        saveButton.save = save;

        function save() {
            saveButton.savingChangesTrigger = true;
            saveButton.saveFn().then(function(response) {
                saveButton.savingChangesTrigger = false;
                return response;
            });
        }


    }]);
})();
