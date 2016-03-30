import rootTemplate from './root.html';

export default function(routeHelperProvider, $stateProvider, $urlRouterProvider) {
  'ngInject';

  $urlRouterProvider.otherwise(goToRoot);

  function yAPIResolve(yAPI) {
    'ngInject';
    return yAPI.resolve();
  }

  routeHelperProvider.setDefaultOptions({
    resolve: { yAPIResolve }
  });

  routeHelperProvider.state('root', {
    url: '',
    templateUrl: rootTemplate
  }, (root) => {

    /* login/signup stuff -------------------------------------------------- */

    root('login', {
      url: '/login',
      template: '<login-page></login-page>'
    });

    root('signup', {
      url: '/signup',
      template: '<signup-page></signup-page>'
    });

    root('logout', {
      url: '/logout',
      template: '<logout-page></logout-page>'
    });

    /* profile -------------------------------------------------------------- */

    root('profile', {
      url: '/profile',
      template: '<ui-view></ui-view>'
    }, (profile) => {

      profile('show', {
        url: '/:id',
        template: '<profile-page></profile-page>'
      });

    });

    /* chat ----------------------------------------------------------------- */

    root('chat', {
      url: '/chat',
      template: '<ui-view><y-chat-list></y-chat-list></ui-view>',
      access: {
        requiresLogin: true
      }
    }, (chat) => {

      chat('show', {
        url: '/:id',
        template: '<y-chat></y-chat>',
        access: {
          requiresLogin: true
        }
      });

      chat('new', {
        url: '/new/:userids',
        template: '<chat-page></chat-page>',
        access: {
          requiresLogin: true
        }
      });

    });

    /* users ---------------------------------------------------------------- */

    root('users', {
      url: '/users',
      template: '<list-users-page></list-users-page>',
      access: {
        requiresLogin: true
      }
    });

    /* items ---------------------------------------------------------------- */

    root('items', {
      url: '/items',
      template: '<ui-view><list-items-page></list-items-page></ui-view>'
    }, (items) => {

      items('new', {
        url: '/new',
        template: '<create-item-page>',
        access: {
          requiresLogin: true
        }
      });

      items('show', {
        url: '/:id',
        template: '<item-detail-page></item-detail-page>'
      });

    });

    /* groups --------------------------------------------------------------- */

    root('groups', {
      url: '/groups',
      template: '<ui-view><groups></groups></ui-view>'
    }, (groups) => {

      groups('add', {
        url: '/add',
        template: '<groups-add></groups-add>'
      });

      groups('show', {
        url: '/:id',
        template: '<group-page></group-page>'
      });

    });

  });

  function goToRoot($injector) {
    'ngInject';

    /* this is needed because '' and '/' are slightly different... */
    $injector.get('$state').go('root');
  }

}
