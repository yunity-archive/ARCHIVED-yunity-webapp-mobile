import rootTemplate from './root.html';

export default function(routeHelperProvider, $stateProvider, $urlRouterProvider) {
  'ngInject';

  $urlRouterProvider.otherwise(goToRoot);

  function yAPIResolve(yAPI) {
    'ngInject';
    return yAPI.resolve();
  }

  function makeLayoutFlexElement(elementName, attributes) {
    let attrStr = '';
    if (attributes)
      for (const attr in attributes) {
        const value = attributes[attr];
        if (value === false) continue;
        attrStr += ` ${attr}`;
        if (value !== true) attrStr += `="${value}"`;
      }

    return `<${elementName} flex layout="column"${attrStr}></${elementName}>`;
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
      template: makeLayoutFlexElement('login-page')
    });

    root('signup', {
      url: '/signup',
      template: makeLayoutFlexElement('signup-page')
    });

    root('logout', {
      url: '/logout',
      template: makeLayoutFlexElement('logout-page')
    });

    /* profile -------------------------------------------------------------- */

    root('profile', {
      url: '/profile',
      template: makeLayoutFlexElement('profile-page', { own: true }),
      access: {
        requiresLogin: true
      }
    }, (profile) => {
      profile('show', {
        url: '/profile/{id:int}',
        template: makeLayoutFlexElement('profile-page')
      });
    });

    /* chat ----------------------------------------------------------------- */

    root('conversation', {
      url: '/conversation',
      template: makeLayoutFlexElement('conversation-list-page'),
      access: {
        requiresLogin: true
      }
    }, (conversation) => {

      conversation('show', {
        url: '/conversation/{id:int}',
        template: makeLayoutFlexElement('conversation-page'),
        access: {
          requiresLogin: true
        }
      });

      conversation('create', {
        url: '/conversation/create/:userids',
        template: makeLayoutFlexElement('conversation-page'),
        access: {
          requiresLogin: true
        }
      });
    }
  );

    /* store ---------------------------------------------------------------- */

    root('store', {
      url: '/store',
      template: makeLayoutFlexElement('store-list-page'),
      access: {
        requiresLogin: true
      }
    }, (store) => {
      store('show', {
        url: '/profile/{id:int}',
        template: makeLayoutFlexElement('store-page')
      });
    });

  });

  function goToRoot($injector) {
    'ngInject';

    /* this is needed because '' and '/' are slightly different... */
    $injector.get('$state').go('root');
  }

}
