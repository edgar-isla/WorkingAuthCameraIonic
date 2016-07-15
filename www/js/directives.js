angular.module('App').directive('svgMap', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        templateUrl: 'img/Blank_US_Map.svg',
        link: function (scope, element, attrs) {
            var regions = element[0].querySelectorAll('.state');
            angular.forEach(regions, function (path, key) {
                var regionElement = angular.element(path);
                regionElement.attr("region", "");
                regionElement.attr("dummy-data", "dummyData");
                regionElement.attr("hover-region", "hoverRegion");
                $compile(regionElement)(scope);
            })
        }
    }
}]);

angular.module('App').directive('region', ['$compile', function ($compile,$rootScope) {
    return {
        restrict: 'A',
        scope: {
            dummyData: "=",
            hoverRegion: "="
        },
        link: function (scope, element, attrs) {
          scope.catzz="catzzzzzzzzzz";
            scope.elementId = element.attr("id");
            scope.regionClick = function () {
              console.log(scope.elementId);
            };
            scope.regionMouseOver = function () {
                scope.hoverRegion = scope.elementId;
                element[0].parentNode.appendChild(element[0]);
              //console.log(scope.elementId);

            };
            element.attr("ng-click", "regionClick()");
            element.attr("ng-attr-fill", "{{dummyData[elementId].value | map_colour}}");
            element.attr("ng-mouseover", "regionMouseOver()");
            element.attr("ng-class", "{active:hoverRegion==elementId}");
            element.removeAttr("region");
            $compile(element)(scope);
        }
    }
}]);
