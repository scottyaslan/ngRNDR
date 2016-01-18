/*   Data Analytics Toolkit: Explore any data avaialable through a REST service 
*    Copyright (C) 2016  Scott Aslan
*
*    This program is free software: you can redistribute it and/or modify
*    it under the terms of the GNU Affero General Public License as
*    published by the Free Software Foundation, either version 3 of the
*    License, or (at your option) any later version.
*
*    This program is distributed in the hope that it will be useful,
*    but WITHOUT ANY WARRANTY; without even the implied warranty of
*    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*    GNU Affero General Public License for more details.
*
*    You should have received a copy of the GNU Affero General Public License
*    along with this program.  If not, see <http://www.gnu.org/licenses/agpl.html>.
*/
define(['app', '../../../common/services/uiControls', '../../../acquire/services/dataSourceConfigurationManager', '../../../render/services/renderingEngineManager', '../../../render/services/renderers', '../../../render/services/renderingEngineUtils', '../../../acquire/directives/acquisitionDirective', '../../../explore/directives/explorationDirective', '../../../syndicate/directives/dashboardDirective'], function(app) {
    app.controller('DATController', ['ServiceProvider', 'RenderingEngineManager', 'UiControls', 'DataSourceConfigurationManager', 'Renderers', '$window', '$rootScope', '$timeout', '$scope',
        function(ServiceProvider, RenderingEngineManager, UiControls, DataSourceConfigurationManager, Renderers, $window, $rootScope, $timeout, $scope) {
            function DATController() {
                this.mainContentView;
            };
            DATController.prototype = {
                constructor: DATController,
                init: function() {
                    //The Parallax jQuery plugin (sometimes) adds an extra
                    //body tag to the DOM if loaded in the <head></head> as 
                    //RequireJs does
                    var extraBodyTag = document.getElementsByTagName('body')[1];
                    if(extraBodyTag !== undefined){
                        extraBodyTag.remove();
                    }
                    //resize mainContent on window resize 
                    angular.element($window).bind('resize', function() {
                        //This is here to force the Explore and Dashboard Designer directives
                        //to re-link which will allow the gridster to draw itself to the appropriate
                        //size. The Data Aquisition Wizard however is a multi step work flow and is built
                        //in a responsive manner...so it resizes itself appropriately on window
                        //resize and thus we dont need or want to cause the directive to re-link since
                        //this will cause it to start over at step 1... 
                        if (datController.mainContentView !== "Data Source Configuration Wizard") {
                            var view = datController.mainContentView;
                            datController.mainContentView = "";
                            $('body').scope().$apply();
                            datController.mainContentView = view;
                        }
                    });
                    $rootScope.$on('data source configuration wizard save', function() {
                        datController.mainContentView = '';
                    });
                    $rootScope.$on('data source wizard configuration cancel', function() {
                        datController.mainContentView = '';
                    });
                    $rootScope.$on('initiate data source configuration wizard', function() {
                        datController.initiateDataSourceConfigurationWizard();
                    });
                    $rootScope.$on('DATController Explore View', function() {
                        datController.initiateDataExploration(false);
                        $scope.$apply();
                    });
                },
                initiateDataExploration: function(createNew){
                    if(datController.mainContentView !== "Explore"){
                       datController.mainContentView = "Explore"; 
                    }
                    if(createNew){
                        //Have to get on the call stack after the exploration-directive link function is executed
                        $timeout(function() {
                            ServiceProvider.ExploreController.new();
                        }, 0);   
                    }
                },
                initiateDataSourceConfigurationWizard: function(){
                    if(datController.mainContentView !== "Data Source Configuration Wizard"){
                        datController.mainContentView = "Data Source Configuration Wizard";
                    }
                },
                initiateDashboard: function(){
                    if(datController.mainContentView !== "Dashboard Designer"){
                        datController.mainContentView = "Dashboard Designer";
                    }
                },
                sandboxMenusEnabled: function() {
                    return Object.keys(RenderingEngineManager.renderingEngines).length === 0;
                }
            };
            $scope.Renderers = Renderers;
            $scope.RenderingEngineManager = RenderingEngineManager;
            $scope.UiControls = UiControls;
            var datController = new DATController();
            datController.init();
            $scope.DATController = datController;
            $scope.ServiceProvider = ServiceProvider;
        }
    ])
});