export default function routeHelperProvider($stateProvider, $locationProvider) {
  'ngInject';
  
  $locationProvider.html5Mode(true);
  
  let defaultOptions = {};
  
  let createRouteHelper = (path) => {
    return (name, options, callback) => {
      let nextPath = path.concat(name);
      let dottedName = nextPath.join('.');
      $stateProvider.state(dottedName, Object.assign({}, defaultOptions, options));
      if (callback) return callback(createRouteHelper(nextPath));
    };
  };
  
  let setDefaultOptions = (options) => {
    Object.assign(defaultOptions, options);
  };
  
  // the base helper function
  let state = createRouteHelper([]);
  
  return {
    state, setDefaultOptions,
    $get: () => {}
  };
  
}
