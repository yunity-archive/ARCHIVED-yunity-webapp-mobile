export default function routeHelperProvider($stateProvider, $locationProvider) {
  'ngInject';

  $locationProvider.html5Mode(true);

  let defaultOptions = {};

  /*
  * Helper to avoid redundant dotted names in the router
  */
  let createRouteHelper = (path) => {
    return (name, options, callback) => {
      let nextPath = path.concat(name);
      let dottedName = nextPath.join('.');
      $stateProvider.state(dottedName, Object.assign({}, defaultOptions, options));

      // this is the magic:
      if (callback) return callback(createRouteHelper(nextPath));
    };
  };

  let setDefaultOptions = (options) => {
    Object.assign(defaultOptions, options);
  };

  let state = createRouteHelper([]);

  return {
    state, setDefaultOptions,
    $get: () => {}
  };

}
