/**
 * Created by ericjohndixon on 10/8/15.
 */
(function () {
  'use strict';

  angular.module('angular-input-utilities')
    .directive('multiSelectRow', ['UniqueAnchor', function (UniqueAnchor) {
      return {
          restrict: 'E',
          controller: 'MultiSelectRowCtrl',
          controllerAs: 'multiSelectRow',
          templateUrl: 'src/multi-select-row/multi-select-row-tpl.html',
          bindToController: true,
          scope: {
              multiSelectAttributes: '=multiSelectAttributes',
              dynamicAttributes: '=dynamicAttributes',
              rowTitle : '@rowTitle',
              multiSelectTitle : '@multiSelectTitle',
              removeFromSelectedCb: '=removeFromSelectedCb'
          },
          link : function linker(scope, element, attrs) {
              scope.multiSelectRow.anchor = UniqueAnchor.getUniqueAnchor();
              $(element).find('.dropdown-menu').attr('id', angular.copy(scope.multiSelectRow.anchor));
          }
      };
    }])
    .controller('MultiSelectRowCtrl', ['$anchorScroll', '$location', '$scope', '$q', function($anchorScroll, $location, $scope, $q) {
        var multiSelectRow = this;
          multiSelectRow.getSelectedOptionText = getSelectedOptionText;
          multiSelectRow.removeOptionFromSelectList = removeOptionFromSelectList;
          multiSelectRow.selectedOptions = [];
          multiSelectRow.goToOptions = goToOptions;

          //non-dynamic multiselect options
          multiSelectRow.extraSettings = multiSelectRow.multiSelectAttributes.extraSettings;
          multiSelectRow.translationTexts = multiSelectRow.multiSelectAttributes.translationTexts;
          multiSelectRow.events = multiSelectRow.multiSelectAttributes.events;

          // need to use a promise for the dynamically loaded attribute.
          var multiSelectDynamicAttr = $q.when(multiSelectRow.dynamicAttributes);
          multiSelectDynamicAttr.then(function(dynamicAttr){
              multiSelectRow.options = dynamicAttr.options;
              multiSelectRow.selectedOptions = dynamicAttr.selectedModel;
          });


          function removeOptionFromSelectList(id) {
              var indexToRemove;
              angular.forEach(multiSelectRow.selectedOptions, function(selectedOption, index) {
                 if (selectedOption.id == id) {
                     indexToRemove = index;
                 }
              });
              if (indexToRemove !== undefined) {
                  multiSelectRow.selectedOptions.splice(indexToRemove, 1);
              }
              if(multiSelectRow.removeFromSelectedCb) {
                  multiSelectRow.removeFromSelectedCb({id: id});
              }
          }

          function getSelectedOptionText(id) {
              if(multiSelectRow.options) {
                  var selectedOption = _.findWhere(multiSelectRow.options, {id: id});
                  return (selectedOption) ? selectedOption.label : '';
              }
          }

          // when the options go beyond the scrollable area, this will scroll to show all options
          function goToOptions() {
              var newHash = multiSelectRow.anchor;
              if ($location.hash() !== newHash) {
                  // set the $location.hash to `newHash` and
                  // $anchorScroll will automatically scroll to it
                  $location.hash(multiSelectRow.anchor);
              } else {
                  // call $anchorScroll() explicitly,
                  // since $location.hash hasn't changed
                  $anchorScroll();
              }
          }
    }]);
})();
