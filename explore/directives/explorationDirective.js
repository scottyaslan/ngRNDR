define([], function() {

    return function(exploreController, renderingEnginesCollection, dataSources) {
        return {
            restrict: 'E',
            templateUrl:'ng-rndr/explore/views/explore.html',
            link: function(scope, element, attrs) {
                exploreController.init();
                scope.exploreController = exploreController;
                scope.renderingEnginesCollection = renderingEnginesCollection;
                scope.dataSources = dataSources;
            }
        };
    }
});