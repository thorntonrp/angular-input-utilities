/**
 * Created by ericjohndixon on 8/4/15.
 */
(function () {
  'use strict';

  angular.module('angular-input-utilities')
    .directive('checkboxList', [function () {
      return {
          restrict: 'E',
          controller: 'CheckboxListCtrl',
          controllerAs: 'checkboxList',
          bindToController: true,
          templateUrl: 'src/checkbox-list/checkbox-list-tpl.html',
          scope: {
              items: '=items',
              isHierarchical: '=isHierarchical'
          }
      };
    }])
      .controller('CheckboxListCtrl', ['$filter', function($filter){
          var checkboxList = this;
          checkboxList.hierarchyCheck = hierarchyCheck;
          //checkboxList.validationCheck = validationCheck;
          checkboxList.valid = '';
          checkboxList.validationChecker = validationCheck;
          //checkboxList.orderedItems = checkboxList.items;
              //$filter('orderBy')(checkboxList.items, 'description');


          function hierarchyCheck(selected, index) {
              var i;
              if (selected) {
                  for (i = index; i >= 0; i--) {
                      checkboxList.items[i].selected = true;
                  }
              } else {
                  for (i = index; i < checkboxList.items.length; i++) {
                      checkboxList.items[i].selected = false;
                  }
              }
          }


          function validationCheck() {
              var valid = null;
              angular.forEach(checkboxList.items, function(item) {
                  if(item.selected) {
                      valid = true;
                  }
              });
              checkboxList.valid = valid;
              return true;
          }
      }]);
})();
