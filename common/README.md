# yunity-webapp-common

Common functionality between yunity-webapp and yunity-webapp-mobile

This is a collection of independent ES6 modules. You can use them in an angular app module like so:

```es6
import yunityAPI from 'yunity-webapp-common/api';

const fooModule = angular.module('foo', [
    yunityAPI
]);
```

This works because each module exports a string with the name of the angular module.

## api

```es6
import yunityAPI from 'yunity-webapp-common/api';

const fooModule = angular.module('foo', [
    yunityAPI
]);

fooModule.run(['yAPI', (yAPI) => {

}]);
```

## socket

`yunitySocket` module provides `ySocket` service

## chat

`yunityChat` module provides `yChat` service

## map

`yunityMap` module provides `yMapService` service and `yMap` directive

## translate

`yunityTranslate` module provides `languageLinks` directive
