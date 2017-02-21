define([], function() {
    'use strict';

    return function(DataSource) {
        /**
         * {@link DataSources} constructor.
         */
        function DataSources() {
            this.init();
        }
        DataSources.prototype = {
            /**
             * @typedef DataSources
             * @type {object}
             * @property {object} map - The map of registered {@link DataSource}'s.
             */
            constructor: DataSources,
            init: function() {
                var self = this;
                self.map = {};
            },
            /**
             * Instantiates a {@link DataSource} and adds it to the manager by `name` for fast lookups.
             * 
             * @param  {string} dataSourceConfigurationId The UUID of the {@link DataSourceConfiguration} reference by the instaniated {@link DataSource}.
             * @param  {string} name The name of the {@link DataSource}.
             * 
             * @return {object}      The {@link DataSource}.
             */
            create: function(dataSourceConfigurationId, name) {
                var self = this;
                if (dataSourceConfigurationId !== undefined) {
                    var dataSource = new DataSource(dataSourceConfigurationId, name);
                    self.add(dataSource);
                    return dataSource;
                }
            },
            /**
             * Adds a {@link DataSource} to the manager.
             * 
             * @param {DataSource} dataSource The {@link DataSource} to add.
             */
            add: function(dataSource) {
                var self = this;
                self.map[dataSource.dataSourceConfigId] = dataSource;
            },
            /**
             * Deletes a {@link DataSource} from the manager by `id`.
             * 
             * @param  {string} id The UUID of the {@link DataSource} to remove from the manager.
             */
            delete: function(dataSourceConfigId) {
                var self = this;
                delete self.map[dataSourceConfigId];
            },
            /**
             * Refreshes the data.
             */
            refresh: function() {
                angular.forEach(this.map, function(dataSource) {
                    dataSource.refresh();
                });
            }
        };

        return new DataSources();
    }
});