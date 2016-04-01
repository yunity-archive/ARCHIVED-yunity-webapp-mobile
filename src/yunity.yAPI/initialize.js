export default function initialize($http, $cookies) {
  'ngInject';
  let token = $cookies.get('csrftoken');
  if (token !== undefined) {
    $http.defaults.headers.common['X-CSRFToken'] = token;
  }
}