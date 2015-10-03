import ngCookies from 'angular-cookies';

const apiModule = angular.module('yunityAPI', [
    ngCookies,
]);

apiModule.provider('PendingRequests', function() {

    let pendingRequests = {};

    let getRequestId = (config) => {
        return `${ config.method }:${ config.url }`;
    }

    let isPending = () => {
        return Object.keys(pendingRequests).length > 0;
    }

    return {
        $get () {
            return {
                isPending: isPending
            }
        },
        registerRequest (config) {
            let id = getRequestId(config);
            pendingRequests[id] = pendingRequests[id] ? pendingRequests[id] + 1 : 1;
        },
        registerResponse (response) {
            let id = getRequestId(response.config);
            pendingRequests[id] -= 1;
            if (pendingRequests[id] == 0) {
                delete pendingRequests[id];
            }
        },
        isPending: isPending,
    }
});

apiModule.config(($httpProvider, PendingRequestsProvider) => {

    let requestTracker = ($q) => {

        let pendingRequests = PendingRequestsProvider.pendingRequests;

        return {
            request: (config) => {
                PendingRequestsProvider.registerRequest(config);
                return config;
            },
            response: (response) => {
                PendingRequestsProvider.registerResponse(response);
                return response;
            },
            responseError: (rejection) => {
                // TODO: handle errors
                console.error('caught error: ', rejection);
                return $q.reject(rejection);
            }
        }
    }
    $httpProvider.interceptors.push(requestTracker);
})

apiModule.run(function ($http, $cookies) {
    $http.defaults.headers.common['X-CSRFToken'] = $cookies.get('csrftoken');
});

apiModule.factory('$yunityAPI', ['$http', function ($http) {

        return {
            url: '/api',
            urlSuffix: '',
            requestStart: function() {},
            requestComplete: function() {},
            requestFailed: function () {},

            /*
             * Configuration
             */
            config(opt) {

                if (opt.url !== undefined) {
                    this.url = opt.url;
                }

                if(opt.urlSuffix !== undefined) {
                    this.urlSuffix = opt.urlSuffix;
                }

                if(opt.requestStart !== undefined) {
                    this.requestStart = opt.requestStart;
                }

                if(opt.requestComplete !== undefined) {
                    this.requestComplete = opt.requestComplete;
                }

                if(opt.requestFailed !== undefined) {
                    this.requestFailed = opt.requestFailed;
                }

            },

            /*
             * list Mappable Items by Filter
             * Param Object => {filter}
             */
            listMappable(opt) {

                return this.apiCall('/listitems').then(
                    function(ret) {
                        console.log('listmappables success');
                        if(opt.success != undefined) {
                            opt.success(ret);
                        }
                    },
                    function(ret) {
                        console.log('listmappables error');
                        if(opt.error != undefined) {
                            opt.error(ret);
                        }
                    }
                );
            },

            /*
             * Auth API call
             * Param object => {email,password,[success],[error]}
             */
            authenticate(opt) {

                return this.apiCall({
                    uri: '/login',
                    method: 'GET',
                    data: {
                        email: opt.email,
                        password: opt.password
                    },
                }).then(
                    function (ret) {
                        console.log('auth success');
                        if(opt.success != undefined) {
                            opt.success(ret);
                        }
                    },
                    function (ret) {
                        console.log('auth error');
                        if(opt.error != undefined) {
                            opt.error(ret);
                        }
                    }
                );

            },

            /*
             * Call the Api:
             * parameter Object { method, data, succes, error }
             *
             */
            apiCall(opt) {

                /*
                 * make this accessable
                 */
                let api = this;

                /*
                 * If opt is a string, use default values
                 */
                if (typeof(opt) === 'string') {
                    opt = {
                        url: opt,
                        method: 'GET'
                    };
                }

                /*
                 * if no data and no method specified do GET othwist POST
                 */
                if (opt.method == undefined && opt.data == undefined) {
                    opt.method = 'GET';
                }
                else if (opt.method == undefined) {
                    opt.method = 'POST';
                }

                if (opt.uri != undefined) {
                    api.url += opt.uri;
                }

                if (opt.data == undefined) {
                    opt.data = {};
                }

                api.requestStart();

                /*
                 * RUN Angulars HTTP Call
                 */
                return $http({
                    method: opt.method,
                    url: api.url + api.urlSuffix,
                    data: opt.data
                }).then(function (data) {
                    api.requestComplete();
                    return data;
                });
            }
        };
}]);

apiModule.factory('MapItemService', ['$q', '$yunityAPI', function($q, $yunityAPI) {
    return {
        getMapItemsAndUsers: function(opts) {
            return $q.all([
                $yunityAPI.apiCall('/items'),
                $yunityAPI.apiCall('/users'),
            ], function(items, users) {
                return {
                    items: items,
                    users: users
                }
            })
        },
        getMapItems: function(opts) {
            return $yunityAPI.apiCall('/items');
        }
    };
}]);

apiModule.run(() => {

});

export default 'yunityAPI';