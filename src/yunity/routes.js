import rootTemplate from './root.html';

export default function(routeHelperProvider, $stateProvider, $urlRouterProvider) {
  'ngInject';
  
  $urlRouterProvider.otherwise(goToRoot);
  
  function yAPIResolve(yAPI) {
    'ngInject';
    return yAPI.resolve();
  }
  
  function makeLayoutFlexElement(elementName, attributes) {
    let attrStr = "";
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
    });
    
    root('profile/show', {
      url: '/profile/{id:int}',
      template: makeLayoutFlexElement('profile-page')
    });
    
    /* chat ----------------------------------------------------------------- */
    
    root('conversation', {
      url: '/conversations',
      template: makeLayoutFlexElement('conversation-list'),
      access: {
        requiresLogin: true
      }
    });
    
    root('conversation/show', {
      url: '/conversation/{id:int}',
      template: makeLayoutFlexElement('conversation'),
      access: {
        requiresLogin: true
      }
    });
    
    root('conversation/create', {
      url: '/conversation/create/:userids',
      template: makeLayoutFlexElement('conversation'),
      access: {
        requiresLogin: true
      }
    });
    
    root('chat/show', {
      url: '/chat/{userid:int}',
      template: makeLayoutFlexElement('conversation'),
      access: {
        requiresLogin: true
      }
    });
    
    /* users ---------------------------------------------------------------- */
    
    root('users', {
      url: '/users',
      template: makeLayoutFlexElement('list-users-page'),
      access: {
        requiresLogin: true
      }
    });
    
    /* items ---------------------------------------------------------------- */
    
    root('items', {
      url: '/items',
      template: makeLayoutFlexElement('list-items-page')
    }, (items) => {
      
      items('new', {
        url: '/new',
        template: makeLayoutFlexElement('create-item-page'),
        access: {
          requiresLogin: true
        }
      });
      
      items('show', {
        url: '/{id:int}',
        template: makeLayoutFlexElement('item-detail-page')
      });
      
    });
    
    /* groups --------------------------------------------------------------- */
    
    root('groups', {
      url: '/groups',
      template: makeLayoutFlexElement('groups')
    }, (groups) => {
      
      groups('add', {
        url: '/add',
        template: makeLayoutFlexElement('groups-add')
      });
      
      groups('show', {
        url: '/{id:int}',
        template: makeLayoutFlexElement('group-page')
      });
      
    });
    
  });
  
  function goToRoot($injector) {
    'ngInject';
    
    /* this is needed because '' and '/' are slightly different... */
    $injector.get('$state').go('root');
  }
  
}
