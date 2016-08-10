require.config({
    waitSeconds: 200,
    baseUrl: 'ngRNDR/bower_components',
    paths: {
        //RequireJS plugins
        'async': 'requirejs-plugins/src/async',
        'font': 'requirejs-plugins/src/font',
        'goog': 'requirejs-plugins/src/goog',
        'propertyParser': 'requirejs-plugins/src/propertyParser',
        //3rd party JS libs
        'ace': 'ace-builds/src-min-noconflict/ace',
        'jquery': 'jquery/dist/jquery',
        'jquery-ui': 'jquery-ui/jquery-ui.min',
        'jquery-csv': 'jquery-csv/src/jquery.csv',
        'jquery-ui-touch-punch': 'jqueryui-touch-punch/jquery.ui.touch-punch.min',
        'datatables.net': 'datatables.net/js/jquery.dataTables.min',
        'datatables.net-keytable': 'datatables.net-keytable/js/dataTables.keyTable.min',
        'datatables.net-buttons': 'datatables.net-buttons/js/dataTables.buttons.min',
        'datatables.net-fixedcolumns': 'datatables.net-fixedcolumns/js/dataTables.fixedColumns.min',
        'datatables.net-buttons-print': 'datatables.net-buttons/js/buttons.print.min',
        'datatables.net-buttons-html5': 'datatables.net-buttons/js/buttons.html5.min',
        'pdfmake': 'pdfmake/build/pdfmake.min',
        'vfs_fonts': 'pdfmake/build/vfs_fonts',
        'domReady': 'domready/ready',
        'fastclick': 'fastclick/lib/fastclick',
        'parallax': 'parallax/deploy/jquery.parallax.min',
        'jquery.contextMenu': 'jQuery-contextMenu/src/jquery.contextMenu',
        'gridster': 'gridster/dist/jquery.gridster',
        'rndr-angular-module': 'ngRNDR/dist/rndr',
        'rndr-templates-angular-module': 'ngRNDR/dist/rndr-templates',
        'c3': 'c3/c3.min',
        'd3': 'd3/d3.min',
        //Angular and any 3rd party angular modules
        'angular': 'angular/angular.min',
        'angular-material': 'angular-material/angular-material',
        'angular-animate': 'angular-animate/angular-animate',
        'angular-aria': 'angular-aria/angular-aria',
        'angular-resource': 'angular-resource/angular-resource.min',
        'angular-route': 'angular-route/angular-route.min',
        'angular-ui-sortable': 'angular-ui-sortable/sortable',
        'angular-contextMenu': 'angularContextMenu/src/angular-contextMenu',
        'ui-ace': 'angular-ui-ace/ui-ace',
        //ngRNDR plugins
        'c3_renderers': 'ngRNDR/dist/plugins/c3_renderers.min',
        'd3_renderers': 'ngRNDR/dist/plugins/d3_renderers.min',
        'datatables_renderers': 'ngRNDR/dist/plugins/datatables_renderers.min'
    },
    shim: {
        'font': ['goog', 'propertyParser'],
        'goog': ['async', 'propertyParser'],
        //3rd party JS libs
        'jquery-ui': ['jquery'],
        'jquery-csv': ['jquery'],
        'jquery-ui-touch-punch': ['jquery', 'jquery-ui'],
        'parallax': ['jquery'],
        'gridster': ['jquery'],
        'c3': ['d3'],
        'c3_renderers': ['c3'],
        'd3_renderers': ['d3'],
        'datatables_renderers': ['datatables.net', 'datatables.net-keytable', 'datatables.net-fixedcolumns', 'datatables.net-buttons-html5', 'datatables.net-buttons-print'], 
        'datatables.net': ['jquery'],
        'datatables.net-fixedcolumns': ['datatables.net'],
        'datatables.net-keytable': ['datatables.net'],
        'datatables.net-buttons': ['datatables.net'],
        'datatables.net-buttons-print': ['datatables.net'],
        'datatables.net-buttons-html5': ['datatables.net', 'datatables.net-buttons', 'vfs_fonts'],
        'pdfmake': {           
            'exports': 'pdfMake'
        },
        'vfs_fonts': {
            'deps': ['pdfmake'],
            'exports': 'pdfMake'
        },
        'jquery.contextMenu': ['jquery', 'jquery-ui'],
        //Angular and any 3rd party angular modules
        'angular': ['jquery', 'jquery-csv'],
        'angular-resource': ['angular'],
        'angular-route': ['angular'],
        'angular-material': ['angular', 'angular-animate', 'angular-aria'],
        'angular-animate': ['angular'],
        'angular-aria': ['angular'],
        'angular-ui-sortable': ['angular', 'jquery-ui'],
        'angular-contextMenu': ['angular', 'jquery.contextMenu'],
        'rndr-templates-angular-module': ['angular'],
        'ui-ace': ['angular', 'ace'],
        'rndr-angular-module': ['angular', 
                                'angular-route', 
                                'angular-material', 
                                'angular-resource', 
                                'parallax', 
                                'angular-contextMenu', 
                                'datatables.net', 
                                'gridster', 
                                'angular-ui-sortable', 
                                'ui-ace', 
                                'rndr-templates-angular-module']
    },
    deps: ['../app']
});