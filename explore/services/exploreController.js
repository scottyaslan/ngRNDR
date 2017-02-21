define([], function() {
    'use strict';

    return function(renderingEnginesCollection, dataSources, dataSourceConfigurations, aggregators, uiControls, $window, $timeout, $rootScope, $http) {
        function ExploreController() {
            this.selectedDataSourceConfigId;
            this.dialogContentView;
            this.constants;
        }
        ExploreController.prototype = {
            constructor: ExploreController,
            init: function(constants) {
                exploreController.constants = {
                    sortableOptions: {
                        placeholder: "placeholder",
                        connectWith: ".dropzone",
                        update: function(e, ui) {
                            //TODO: Need a way to provide feedback to the user that the renderer is updating                             
                            //uiControls.showRenderingEngineProgress(); ???

                            //TODO: Need to remove any RenderingEngine.attributeFilterInclusions and  RenderingEngine.attributeFilterExclusions
                            //that are not on the row or column

                            //Cannot correctly update renderer until the angular digest completes which updates the RenderingEngine.rows and
                            //RenderingEngine.cols arrays. We must get on the call stack after the that cycle completes 
                            $timeout(function() {
                                renderingEnginesCollection.map[renderingEnginesCollection.activeRenderingEngine].draw($('#renderer'), dataSources.map[renderingEnginesCollection.map[renderingEnginesCollection.activeRenderingEngine].dataSourceConfigId].formattedData);
                            }, 0);
                        }
                    },
                    dataExplorationGrid: {
                        namespace: '#DataExploration',
                        enableDragging: false,
                        widget_margins: [10, 10],
                        /*
                         * Determination of the widget dimension is calculated as follows:
                         * 
                         *     (($window.innerWidth - (# of columns +1)*(column margin)*2 margins on either side)/# of columns)
                         *     (($window.innerHeight - (pixel height of toolbars) - (# of rows +1)*(row margin)*2 margins on either side)/# of rows)
                         */
                        widget_base_dimensions: [(($window.innerWidth - 7 * (10) * 2) / 6), (($window.innerHeight - 88 - 3 * (10) * 2) / 2)],
                        min_cols: 6,
                        resize: {
                            enabled: false,
                            start: function(e, ui, $widget) {
                                console.log('START position: ' + ui.position.top + ' ' + ui.position.left);
                            },
                            resize: function(e, ui, $widget) {
                                console.log('RESIZE offset: ' + ui.pointer.diff_top + ' ' + ui.pointer.diff_left);
                            },
                            stop: function(e, ui, $widget) {
                                console.log('STOP position: ' + ui.position.top + ' ' + ui.position.left);
                            }
                        },
                        draggable: {
                            start: function(e, ui, $widget) {
                                console.log('START position: ' + ui.position.top + ' ' + ui.position.left);
                            },
                            drag: function(e, ui, $widget) {
                                console.log('DRAG offset: ' + ui.pointer.diff_top + ' ' + ui.pointer.diff_left);
                            },
                            stop: function(e, ui, $widget) {
                                console.log('STOP position: ' + ui.position.top + ' ' + ui.position.left);
                            }
                        },
                        parallax: {
                            enabled: false,
                            dataDepth: 0
                        }
                    }
                };
                var requireDataSourceConfigSelection = false;
                angular.forEach(renderingEnginesCollection.map, function(renderingEngine, uuid) {
                    requireDataSourceConfigSelection = true;
                });
                if (!requireDataSourceConfigSelection) {
                    exploreController.new();
                }
                $rootScope.$emit('explore:init');
            },
            new: function() {
                exploreController.selectedDataSourceConfigId = undefined;
                $rootScope.$emit('explore:new');
            },
            createRenderingEngine: function() {
                var wrapRenderingEngine = function(renderingEngine, dataSourceConfigurationId) {
                    //This is a flag that the tabs use in the Explore perspective to know which tab is active.
                    renderingEngine.disabled = false;
                    //This is an objet the `dashboard` uses in the Dashboard Designer perspective to know location and size of the widget.
                    renderingEngine.tile = {
                        size_x: 1,
                        size_y: 1,
                        col: 1,
                        row: 1
                    };
                
                    //This is the dataSourceConfigId used to pass data to the rndr directive
                    renderingEngine.dataSourceConfigId = dataSourceConfigurationId;
                };

                var dataSourceConfigurationId = this.selectedDataSourceConfigId;

                if (dataSources.map[dataSourceConfigurationId] === undefined) {
                    dataSources.create(dataSourceConfigurationId, dataSourceConfigurations.map[dataSourceConfigurationId].name);
                    $http(angular.fromJson(dataSourceConfigurations.map[dataSourceConfigurationId].httpConfig)).then(function successCallback(response) {
                        // this callback will be called asynchronously
                        // when the response is available
                        var dataSource = dataSources.map[dataSourceConfigurationId];
                        dataSource.data = $.csv.toArrays(response.data);
                        dataSource.format(dataSources.map[dataSourceConfigurationId]);
                        wrapRenderingEngine(renderingEnginesCollection.create("DT - Table"), dataSourceConfigurationId);
                    }, function errorCallback(response) {
                        var tmp;
                        dataSources.delete(dataSourceConfigurationId);
                    });
                } else {
                    wrapRenderingEngine(renderingEnginesCollection.create("DT - Table"), dataSourceConfigurationId);
                }
            },
            hideDialogAndDraw: function() {
               uiControls.hideDialog(); renderingEnginesCollection.map[renderingEnginesCollection.activeRenderingEngine].draw($('#renderer'), dataSources.map[renderingEnginesCollection.map[renderingEnginesCollection.activeRenderingEngine].dataSourceConfigId].formattedData);
            },
            initiateDataSourceWizard: function() {
                exploreController.dialogContentView = '';
                uiControls.hideDialog();
                $rootScope.$emit('exploreController:initiate data source configuration wizard');
            },
            closeDialog: function() {
                uiControls.hideDialog();
                if (Object.keys(renderingEnginesCollection.map).length === 0) {
                    //$rootScope.$emit('acquisitionController:cancel');  
                }
            }
        };
        var exploreController = new ExploreController();
        return exploreController;
    }
});