# yunity-webapp-mobile guide

We use [rwwagner90/angular-styleguide-es6](https://github.com/rwwagner90/angular-styleguide-es6) to define our angularjs style. It's a lengthy read, actually I didn't read it all yet. Just the main bits. It's an ES6 version of [John Papa's styleguide](https://github.com/johnpapa/angular-styleguide).

Here we include extra stuff that might be useful:
  1. Walkthroughs
    1. [Module](#module-walkthrough)
    1. [Provider](#provider-walkthrough)
    1. [Config](#config-walkthrough)
    1. [Service](#service-walkthrough)
    1. [Directive](#directive-walkthrough)
    1. [Controller](#controller-walkthrough)
    1. [Initialization](#initialization-walkthrough)
  1. [TODO](#todo)

# Walkthroughs

## Module Walkthrough

We keep the code split into modules to seperate functionality. The main app is also a module (`yunity`).

It depends on various submodules of ours (e.g. `yunity.yAPI`), and external AngularJS libs (e.g. `ui.router`).

A module looks like this:

```javascript
import angular from 'angular';

import someHelperProvider from './someHelperProvider';
import someConfig from './someConfig';
import MyExampleService from './MyExampleService';
import myExampleDirective from './myExampleDirective';
import myExampleController from './myExampleController';
import someInitialization from './someInitialization';

export default angular.module('yunity.example', [])
  .provider('someHelper', someHelperProvider)
  .config(someConfig)
  .service('myExampleService', MyExampleService)
  .directive('myExampleDirective', myExampleDirective)
  .controller('myExampleController', myExampleController)
  .run(someInitialization)
  .name;
```

#### Import angular

We always import angular, even though it is available as a global, and on the `window` object.
```javascript
import angular from 'angular';
```

#### One thing per file

Implement the functionality in seperate files. One file per thing.

```javascript
import someHelperProvider from './someHelperProvider';
import someConfig from './someConfig';
import MyExampleService from './MyExampleService';
import myExampleDirective from './myExampleDirective';
import myOtherExampleDirective from './myOtherExampleDirective';
import myExampleCtrl from './myExampleCtrl';
import someInitialization from './someInitialization';
```

#### Define modules

This defines a module, the dependencies go inside `[]`. It is required to specify even if it is empty

```javascript
angular.module('yunity.example', []) // GOOD defines module
angular.module('yunity.example')     // BAD loads module, must have already been defined
```

#### Export the name

The call to `module()` defines a module inside `angular`, and returns an object.

We export just the name:

```javascript
// yunity.example.module.js
export default angular.module('yunity.example', [])
  ...
  .name;
```

This allows us to easily use it from another module, e.g.:

```javascript
// yunity.foo.module.js
import example from './yunity.example.module';
...
angular.module('yunity.foo', [example])
...
```
### Register some things

#### provider

These are an overkill for most scenarios, and you should prefer a [service](#service-walkthrough).

They allow you to define things that can be used in a [config](#config-walkthough) function.

See [provider walkthrough](#provider-walkthrough) for how to write one.

#### config

 Runs first and only `provider` type dependencies are available.

```javascript
  .config(someConfig)
```

See [config walktrough](#config-walkthough) for how to write config.

#### service

Give them lower camelcase name, and the same name as the file (but without `Service` ending).

```javascript
  .service('myExample', MyExampleService)
```

See [service walkthough](#service-walkthrough) for how to write a service.

#### directive

Lower camelcase variable and name.

```javascript
  .directive('myOtherExample', myOtherExampleDirective)
```

`myOtherExample` gets turned into kebab-case `my-other-example` for the template.

This would allow me to use it as:

```html
<some-other-example></some-other-example>
```

See [directive walkthrough](#directive-walkthough) for how to write a directive.

#### controller

Normally controllers would be only registered inside directives, or routes.
We have only one controller registered directly in a module, `MainCtrl`, and this might go away one day too.

Capitalized camelcase. Ends in `..Ctrl`. Registered name also includes the `Ctrl`.

```javascript
  .controller('MyExampleCtrl', MyExampleCtrl)
```

#### run

We can run some code when the application/module starts up. All dependencies are now available.

Pass in a function.

```javascript
  .run(someInitialization)
```

See [initialization walkthough](#initialization-walkthrough) for how to write initialization.

## Provider Walkthough

Actually, I won't write this. You should use a [service](#service-walkthrough) instead.
Though, if you really need a provider, and you know what you're doing, then go ahead.

## Config Walkthough

Inside a config function you cannot access all dependencies, only `Provider` type ones.

They are normally used to configure angular core services, and external libaries.

```javascript
export default function(routeHelperProvider, $stateProvider, $urlRouterProvider) {
  'ngInject';
  ...
}
```

  * `$stateProvider` and `$urlRouterProvider` come from `angular-ui-router`
  * `routeHelperProvider` - something that was registered as `.provider('routeHelper', routeHelperProvider)`


## Service Walkthrough

Most of the fiddly logic should be contained in services, as they are abstracted from any specific view, and can be reused.

Contents of `myExampleService.js`:

```javascript
export default class myExampleService {

  constructor($http, $cookies) {
    'ngInject';
    Object.assign(this, {
      $http, $cookies,
      foo: 10
    });
  }

  doSomething() {
    return this.$http('/api/foo').then(res => {
      return res.data;
    });
  }

  getFoo() {
    return this.foo;
  }

}
```

#### Export as default class

Just a convention that allows to import as `import MyExampleService from './MyExampleService.js'`.

```javascript
export default class MyExampleService { ...
```

#### Define dependencies to inject in constructor

```javascript
...
  constructor($http, $cookies) {
    'ngInject';
...
```

#### Object.assign() to add arguments to object

`Object.assign()` copies key/values from arguments `1..n` into the object at argument `0`.

We can use this along with ES6 object shorthand to add arguments and default values to the object without repetition.

```javascript
...
  Object.assign(this, {
    $http, $cookies,
    foo: 10
  });
...
```

It is the same as doing:

```javascript
...
  this.$http = $http;
  this.$cookies = $cookies;
  this.foo = 10;
...
```

#### Define methods

Methods are what users of your services will call to do things.

```javascript
...
  doSomething() {
    ...
  }
...
```

#### Return a promise if doing anything async

Most angular built in things will resolve a promise too.

```javascript
...
  doSomething() {
    return $http('/foo').then(res => {
      return res.data;
    })
  }
...
```

## Directive Walkthrough

Contents of `myExampleDirective.js`:

```javascript
import myExampleTemplate from './my-example.html';
import MyExampleCtrl from './MyExampleCtrl';

export default function() {
  return {
    scope: {},
    restrict: 'E',
    templateUrl: myExampleTemplate,
    controller: MyExampleCtrl,
    controllerAs: 'ctrl'
  };
}
```

#### Import template html files

We use [ngtemplate-loader](https://github.com/WearyMonkey/ngtemplate-loader) so we can import html templates directly.

It automatically adds them to the angular `$templateCache`, and returns the cache key that can be used with `templateUrl` properties.

```javascript
import myExampleTemplate from './myExample.html';
...
  templateUrl: myExampleTemplate,
...
```

#### Define the controller in a seperate file

```javascript
import MyExampleCtrl from './MyExampleCtrl';
...
  controller: MyExampleCtrl,
...
```

See [Controller](#controller-walkthrough) for how to write a controller.

#### Restrict 'E' or 'A'

To use the directive as `<my-example></my-example>` use:

```javascript
...
  restrict: 'E',
...
```

To use the directive as `<div my-example></div>` use:

```javascript
...
  restrict: 'A',
...
```

#### Use controllerAs syntax

This makes the controller available as `ctrl`. We don't use `$scope` anymore.

```javascript
...
  controllerAs: 'ctrl'
...
```

### Template File

This just defines the view template for the directive. It has access to the
controller as `ctrl`.

Contents of `myExampleTemplate.html`:

```html
<!-- make sure there is only one top level element that contains everything -->
<div>

  <!-- everything in our controller is available via ctrl as we specified
       that in `myDirective.js` -->
  <!-- use `ng-` versions of attributes if you have angular stuff in the value -->
  <img ng-src={{ ctrl.imageUrl }}>

  <!-- attach a function call to a button click -->
  <button ng-click="ctrl.myMethod()"></button>

  <ul>
    <!-- will output one <li> for each animal -->
    <li ng-repeat="animal in ctrl.animals">
      {{ animal.name }}
    </li>
  </ul>

</div>
```

## Controller Walkthough

This is where the logic directly connected to a view should live. Anything the view directly calls will be in here.

Most of the stuff about [writing a service](#service-walkthrough) also applies.

```javascript
export default class MyExampleCtrl {

  constuctor($location, myExample) {
    'ngInject';
    Object.assign(this, {
      $location, myExample,
      imageUrl: '/images/foo.png',
      data: {
        name: 'Peter',
        age: 50
      },
      animals: [{ name: 'cat' }, { name: 'dog' }]
    });
    myExample.doSomething().then(data => {
      this.data = data;
    });

  }

  myMethod() {
    this.myExample.doSomethingElse().then(result => {
      this.$location.path('/somewhere');
    });
  }

  myOtherMethod() {
    this.myExample.doYetAnotherThing().then(result => {
      this.result = result;
    });
  }

}
```

Inside the template this stuff will be usable as `ctrl.myMethod()`, `ctrl.data.name`, `ctrl.animals`, etc.

## Initialization Walkthough

TODO

## TODO

  - [x] directive walkthrough [guide]
  - [x] service walkthrough [guide]
  - [x] module walkthrough [guide]
  - [x] config walkthrough [guide]
  - [ ] initialization walkthrough [guide]
  - [x] controller walkthrough [guide]
  - [x] fix the heading links in this file
  - [ ] explain services vs factories vs ... [guide]
  - [ ] explain 'ngInject' [guide]
  - [ ] explain `Object.assign()`, destructring, ES6 fat arrows, ES6 object shorthand  [guide]
  - [ ] explain webpack `file-loader` [wiki]
  - [ ] explain webpack `ngtemplate-loader` [wiki]
  - [ ] explain webpack change reloading [wiki]
  - [ ] explain eslint and `npm run lint` [wiki]
  - [ ] explain testing with karma [wiki]
  - [ ] explain testing with karma browserstack [wiki]
  - [ ] explain continuous integration with circleci [wiki]
  - [ ] explain how to get commit access [wiki]
  - [ ] explain how to contribute (fork/pull-request/etc) [wiki]
  - [ ] explain how to setup atom with eslint package [wiki]
  - [ ] add a task to write an eslint plugin (a bit like [this one](https://github.com/Gillespie59/eslint-plugin-angular))
  - [x] work out which of this stuff should go on the wiki
