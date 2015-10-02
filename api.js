import ngCookies from 'angular-cookies';

const apiModule = angular.module('yunityAPI', [
    ngCookies,
]);

apiModule.run(function ($http, $cookies) {
    $http.defaults.headers.common['X-CSRFToken'] = $cookies.get('csrftoken');
});

apiModule.provider('$yunityAPI', [function () {

    this.$get = $http => {
        return {
            url: '/api',
            urlSuffix: '',

            /*
             * Configuration
             */
            config(opt) {

                if (opt.url != undefined) {
                    this.url = opt.url;
                }

                if(opt.urlSuffix != undefined) {
                    this.urlSuffix = opt.urlSuffix;
                }

            },

            /*
             * list Mappable Items by Filter
             * Param Object => {filter}
             */
            listMappable(opt) {

                this.apiCall({
                    uri: '/listitems',
                    method: 'GET',
                    success: function(ret) {
                        console.log('listmappables success');
                        if(opt.success != undefined) {
                            opt.success(ret);
                        }
                    },
                    error: function(ret) {
                        console.log('listmappables error');
                        if(opt.error != undefined) {
                            opt.error(ret);
                        }
                    }
                });

            },

            /*
             * Auth API call
             * Param object => {email,password,[success],[error]}
             */
            authenticate(opt) {

                this.apiCall({
                    uri: '/login/',
                    method: 'POST',
                    data: {
                        email: opt.email,
                        password: opt.password
                    },
                    success: function (ret) {
                        console.log('auth success');
                        if(opt.success != undefined) {
                            opt.success(ret);
                        }
                    },
                    error: function (ret) {
                        console.log('auth error');
                        if(opt.error != undefined) {
                            opt.error(ret);
                        }
                    }
                });

            },

            /*
             * Call the Api:
             * parameter Object { method, data, succes, error }
             *
             */
            apiCall(opt) {

                /*
                 * if no data and no method specified do GET othwist POST
                 */
                if (opt.method == undefined && opt.data == undefined) {
                    opt.method = 'GET';
                }
                else if (opt.method == undefined) {
                    opt.method = 'POST';
                }

                /*
                 * make this accessable
                 */
                let api = this;

                if (opt.uri != undefined) {
                    api.url += opt.uri;
                }

                if (opt.data == undefined) {
                    opt.data = {};
                }

                /*
                 * RUN Angulars HTTP Call
                 */
                $http({
                    method: opt.method,
                    url: api.url + api.urlSuffix,
                    data: opt.data
                }).then(function successCallback(response) {

                    if (opt.success != undefined) {
                        opt.success(response.data);
                    }

                }, function errorCallback(response) {

                    if (opt.error != undefined) {
                        opt.error(response);
                    }

                });
            }
        };
    };

    return this;

}]);

apiModule.run(() => {

});

export default 'yunityAPI';