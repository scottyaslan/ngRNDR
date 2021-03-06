(function(root, factory) {
    define(['jquery', 'angular', 'rndr'], function($, c3, rndr) {
        return factory($, c3, rndr);
    });
}(this, function($, angular, rndr) {
    var pivotDataUiRenderer = {
        'PivotData UI': function(renderingEngine, opts) {
            /**
             * Create a v4 UUID.
             * @return {string} The generated UUID.
             */
            var generateUUID = function() {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = Math.random() * 16 | 0,
                        v = c == 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                })
            };

            var uuid = generateUUID();

            var defaults = {
                clazz: ['pvtTable'],
                locales: {
                    en: {
                        localeStrings: {
                            totals: 'Totals'
                        }
                    }
                },
                theme: {
                    base: {
                        default: 'CCCCCC',
                        hue1: 'CCCCCC',
                        hue2: 'CCCCCC',
                        hue3: 'CCCCCC'
                    },
                    tint: {
                        default: 'DDDDDD',
                        hue1: 'DDDDDD',
                        hue2: 'DDDDDD',
                        hue3: 'DDDDDD'
                    },
                    warn: {
                        default: 'BA554A'
                    }
                }
            };
            opts = $.extend(true, defaults, opts);

            var app = angular.module(uuid + 'App', ['ngResource', 'ngRoute', 'ngMaterial', 'ui.sortable', 'ngRndr', 'ngRndrTemplates']);

            var pivotDataUIConfig = function($mdThemingProvider) {
                //Define app palettes
                $mdThemingProvider.definePalette('basePalette', {
                    '50': 'CCCCCC',
                    '100': 'CCCCCC',
                    '200': opts.theme.base.hue1,
                    '300': opts.theme.base.hue2,
                    '400': 'CCCCCC',
                    '500': opts.theme.base.default,
                    '600': 'CCCCCC',
                    '700': 'CCCCCC',
                    '800': 'CCCCCC',
                    '900': opts.theme.base.hue3,
                    'A100': 'CCCCCC',
                    'A200': 'CCCCCC',
                    'A400': 'CCCCCC',
                    'A700': 'CCCCCC',
                    'contrastDefaultColor': 'light',
                    'contrastDarkColors': ['A100'],
                    'contrastLightColors': undefined
                });
                $mdThemingProvider.definePalette('tintPalette', {
                    '50': 'DDDDDD',
                    '100': 'DDDDDD',
                    '200': opts.theme.tint.default,
                    '300': 'DDDDDD',
                    '400': opts.theme.tint.hue1,
                    '500': 'DDDDDD',
                    '600': opts.theme.tint.hue2,
                    '700': 'DDDDDD',
                    '800': opts.theme.tint.hue3,
                    '900': 'DDDDDD',
                    'A100': 'DDDDDD',
                    'A200': 'DDDDDD',
                    'A400': 'DDDDDD',
                    'A700': 'DDDDDD',
                    'contrastDefaultColor': 'light',
                    'contrastDarkColors': ['A100'],
                    'contrastLightColors': undefined
                });
                $mdThemingProvider.definePalette('warnPalette', {
                    '50': 'BA554A',
                    '100': 'BA554A',
                    '200': 'BA554A',
                    '300': 'BA554A',
                    '400': 'BA554A',
                    '500': opts.theme.warn.default,
                    '600': 'BA554A',
                    '700': 'BA554A',
                    '800': 'BA554A',
                    '900': 'BA554A',
                    'A100': 'BA554A',
                    'A200': 'BA554A',
                    'A400': 'BA554A',
                    'A700': 'BA554A',
                    'contrastDefaultColor': 'light',
                    'contrastDarkColors': ['A100'],
                    'contrastLightColors': undefined
                });
                $mdThemingProvider.theme("default").primaryPalette("basePalette", {
                    "default": "500",
                    "hue-1": "200",
                    "hue-2": "300",
                    "hue-3": "900"
                }).accentPalette("tintPalette", {
                    "default": "200",
                    "hue-1": "400",
                    "hue-2": "600",
                    "hue-3": "800"
                }).warnPalette("warnPalette", {
                    "default": "500"
                });
            };

            pivotDataUIConfig.$inject = ['$mdThemingProvider'];

            app.config(pivotDataUIConfig);

            // remove old viz
            opts.element.empty();

            //when angular bootstraps an HTML element, it marks it using JQuery's function JQuery.data() to add injector's information. 
            //If the element we try to bootstrap already contains information with the HTML5 data property/attribute name "'$injector'", angular
            //will throw "Error: error:btstrpdApp Already Bootstrapped with this Element"...So, remove the $injector property/attribute using
            //JQuery before calling angular.bootstrap:
            opts.element.data('$injector', "");

            // append the new viz
            var result = $('<div ng-non-bindable id="' + uuid + '" style="height: 100%;"></div>');
            opts.element.append(result);

            // manually bootstrap the application
            var injector = angular.bootstrap($('#' + uuid), [uuid + 'App']);

            if (renderingEngine.dataView.meta.renderer == null) {
                renderingEngine.dataView.meta.renderer = opts.renderer;
            }

            //create embedded rendering engine from original to control the display of the data within this plugin 
            var embeddedRenderingEngine = new rndr.RenderingEngine(renderingEngine.dataView.meta.renderer, renderingEngine.id, renderingEngine.aggregator.name, renderingEngine.aggregator.aggInputAttributeName, renderingEngine.dataView.meta, renderingEngine.derivedAttributes, renderingEngine.locale, renderingEngine.sorters, null, renderingEngine.dataView.data);

            var pivotDataUIExploreController = injector.get('pivotDataUIExploreController');
            pivotDataUIExploreController.init(renderingEngine, embeddedRenderingEngine);
            var $compile = injector.get('$compile');
            var $rootScope = injector.get('$rootScope');
            result.append($compile('<pivot-data-ui-directive style="height: 100%;"></pivot-data-ui-directive>')($rootScope));

            // var rndrElam = $('#pivot-data-ui-rndr');
            // rndrElam.attr('id', rndrElam.attr('id') + '-' + uuid);

            // var a      = document.createElement('a');
            // a.href     = 'data:image/svg+xml;utf8,' + unescape($('#SVG')[0].outerHTML);
            // a.download = 'plot.svg';
            // a.target   = '_blank';
            // document.body.appendChild(a); a.click(); document.body.removeChild(a);

            return result;
        }
    };

    rndr.plugins.renderers.set('PivotData UI', {
        render: pivotDataUiRenderer['PivotData UI'],
        opts: {
            renderer: 'Pivot Table - Table'
        },
        dataViewName: 'PivotData'
    });
}));