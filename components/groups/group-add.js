import groupsAddTemplate from './groups-add.html';

export default function() {

  return {
    scope: {},
    restrict: 'E',
    templateUrl: groupsAddTemplate,
    controller: ($scope, yAPI, $location) => {

      $scope.addgroup = () => {

        if($scope.name != '') {
          yAPI.apiCall({
            uri: '/groups',
            method: 'POST',
            data: {
              description: $scope.description,
              name: $scope.name
            }
          }).then(() => {

            $location.path('/groups');

          });
        }
        else
        {
          alert('enter a group name please');
        }

      };


    },
    link: ($scope, element, attr) => {
      $scope.userid = attr.userid;
    }
  }
}