# yunity-webapp-mobile guide

We use [rwwagner90/angular-styleguide-es6](https://github.com/rwwagner90/angular-styleguide-es6) to define our angularjs style. It's a lengthy read, actually I didn't read it all yet. Just the main bits. It's an ES6 version of [John Papa's styleguide](https://github.com/johnpapa/angular-styleguide).

Here we include extra stuff that might be useful:
  1. Walkthroughs
    1. [Directive](#walkthrough-directive)
  1. [TODO](#todo)

# Walkthroughs

## [Directive](#walkthrough-directive)

Defining a directive involves:

  1. [Definition File](#directive-definition) `myDirective.js`
  1. [Controller File](#directive-controller) `MyCtrl.js`
  1. [Template File](#directive-template) `myTemplate.html`
  1. [Registration](#directive-registration) of the directive with a module

### [Definition file](#directive-definition)

This defines the directive, but does not contain any logic or template.

Contents of `myDirective.js`:

```javascript
/* import the template (uses webpack ngtemplate-loader)
   it stores it in the $templateCache and returns us the key that we
   can use as a templateUrl */
import myTemplate from './myTemplate.html';

// the template has a controller to manage the logic, keep it in a seperate file
import MyCtrl from './MyCtrl';

export default function() {
  return {
    scope: {},

    /* 'E' means this will be an <some-directive></some-directive>
       'A' would mean it gets used like <div some-directive></div> */
    restrict: 'E',

    templateUrl: myTemplate,

    /* this will get called as `new MyCtrl()` each time we view the directive */
    controller: MyCtrl,

    /* this is important, and means the controller is available as `ctrl`
       inside the template */
    controllerAs: 'ctrl'
  };
}
```

### [Controller File](#directive-controller)

This is where the logic of the directive lives.

Contents of `MyCtrl.js`:

```javascript
/* class has same name as file */
export default class MyCtrl {

  /* constructor defines the dependencies */
  constuctor($location, someService) {
    'ngInject'; // this must be the first line, allows ng-annotate to work

    /* Object.assign() copies the properties into `this` so we can
       use them later in the methods */
    Object.assign(this, {

      /* this is ES6 shorthand syntax for:
           { $location: $location, someService: someService } */
      $location, someService,

      /* ... can also use this to define some initial data */
      imageUrl: '/images/foo.png',
      data: {
        name: 'Peter',
        age: 50
      },
      animals: [{ name: 'cat' }, { name: 'dog' }]

    });

    /* initialization, we can do things here, this will be executed whenever
       the controller is created, on each page/directive view */

    someService.doSomething().then(data => {
      /* so long as you are using ES6 fat arrow function syntax
         `this` will always be what you want it to be
         ... in this case it will replace our initial data value */
      this.data = data;
    });

  } /* no comma needed here as it is a class definition */

  /* now we can define our method, which will be available in the view */

  myMethod() {
    this.someService().doSomethingElse().then(result => {
      /* the injected dependencies are available here via `this.` */
      this.$location.path('/somewhere');
    });
  }

  myOtherMethod() {
    this.someService().doYetAnotherThing().then(result => {
      /* we can set values on `this` and use them in the template */
      this.result = result;
    });
  }

}
```

### [Template file](#directive-template)

This just defines the view template for the directive. It has access to the
controller as `ctrl`.

Contents of `myTemplate.html`:

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

### [Registration](#directive-registration)

Contents of an angular module definition file:

```javascript
/* don't assume angular is available globally */
import angular from 'angular';

import myDirective from './myDirective';

/* here we are defining a new module */
export default angular.module('yunity.example', [])

  /* this is where we name it so it will be usable inside other templates as:
      <my-directive></my-directive> */
  .directive('myDirective', myDirective)

  /* import to export the name of the module so it can be easily declared as
     a dependency of another module */
  .name;
```

## [TODO](#todo)

  - [x] directive walkthrough
  - [ ] service walkthrough
  - [ ] module walkthrough
  - [ ] fix the heading links in this file
  - [ ] explain services vs factories vs ...
  - [ ] explain 'ngInject'
  - [ ] explain `Object.assign()`, destructring, ES6 fat arrows, ES6 object shorthand
  - [ ] explain webpack `file-loader`
  - [ ] explain webpack `ngtemplate-loader`
  - [ ] explain webpack change reloading
  - [ ] explain eslint and `npm run lint`
  - [ ] explain testing with karma
  - [ ] explain testing with karma browserstack
  - [ ] explain continuous integration with circleci
  - [ ] explain how to get commit access
  - [ ] explain how to contribute (fork/pull-request/etc)
  - [ ] explain how to setup atom with eslint package
  - [ ] add a task to write an eslint plugin (a bit like [this one](https://github.com/Gillespie59/eslint-plugin-angular))
  - [ ] work out which of this stuff should go on the wiki