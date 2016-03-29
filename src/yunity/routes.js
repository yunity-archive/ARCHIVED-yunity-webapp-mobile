export default function($routeProvider) {
  'ngInject';

  $routeProvider.when('/', {
    template: '<wall-page />',
    reloadOnSearch: false
  });

  $routeProvider.when('/signup', {
    template: '<signup-page />',
    reloadOnSearch: false
  });

  $routeProvider.when('/login', {
    template: '<login-page />',
    reloadOnSearch: false
  });
  
  $routeProvider.when('/logout', {
    template: '<logout-page />',
    reloadOnSearch: false
  });

  $routeProvider.when('/groups', {
    template: '<groups />',
    reloadOnSearch: false
  });

  $routeProvider.when('/groups/add', {
    template: '<groups-add />',
    reloadOnSearch: false
  });

  $routeProvider.when('/groups/:id', {

    template: (params) =>  {
      return `<group-page groupid="${params.id}" />`;
    },
    reloadOnSearch: false
  });

  $routeProvider.when('/profile/:id', {

    template: (params) =>  {
      return `<profile-page userid="${params.id}" />`;
    },
    reloadOnSearch: false
  });

  $routeProvider.when('/chat/:id', {
    template: '<y-chat></y-chat>',
    reloadOnSearch: false,
    access: {
      requiresLogin: true
    }
  });

  $routeProvider.when('/chat/new/:userids', {
    template: (params) =>  {
      return `<chat-page userids="${params.userids}" />`;
    },
    reloadOnSearch: false,
    access: {
      requiresLogin: true
    }
  });


  $routeProvider.when('/about', {
    templateUrl: 'about.html',
    reloadOnSearch: false
  });

  $routeProvider.when('/map', {
    template: '<map-page />',
    reloadOnSearch: false
  });

  $routeProvider.when('/create/item', {
    template: '<create-item-page />',
    reloadOnSearch: false,
    access: {
      requiresLogin: true
    }
  });

  $routeProvider.when('/list/items', {
    template: '<list-items-page />',
    reloadOnSearch: false

  });

  $routeProvider.when('/item/:id', {
    template: '<item-detail-page />',
    reloadOnSearch: false

  });

  $routeProvider.when('/list/users', {
    template: '<list-users-page />',
    reloadOnSearch: false,
    access: {
      requiresLogin: true
    }
  });

}
