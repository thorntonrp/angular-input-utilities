/**
 * Created by ericjohndixon on 10/8/15.
 */
(function () {
    'use strict';

    angular
        .module('angular-input-utilities')
        .factory('UniqueAnchor', UniqueAnchor);
    //UniqueAnchor.$inject = [''];

    //FACTORY METHOD
    function UniqueAnchor() {
        var anchorNum = 0;
        return {
            getUniqueAnchor : getUniqueAnchor
        };
        /////////////////////////////////////////////////////////
        function getUniqueAnchor() {
            return 'anchor' + anchorNum++;
        }
    }
})();
