export default function yMapDirective(yMapService) {
  return {
    restrict: 'A',
    link: ($scope, $element) => {
      yMapService.init($element[0]);
    }
  };
}