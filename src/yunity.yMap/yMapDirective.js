export default function yMapDirective(yMapService) {
  'ngInject';
  return {
    restrict: 'A',
    link: ($scope, $element) => {
      yMapService.init($element[0]);
    }
  };
}