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
            ApiUrl: '/api',

            /*
             * Configuration
             */
            config(opt) {

                if (opt.url != undefined) {
                    this.ApiUrl = opt.url;
                }

            },


            authenticate(email, password) {

                this.apiCall({
                    uri: '/login',
                    method: 'POST',
                    data: {
                        email: email,
                        password: password
                    },
                    success: function (ret) {
                        console.log('success');
                    },
                    error: function (ret) {
                        console.log('error');
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
                 * BASE API URL
                 */
                var ApiUrl = this.ApiUrl;

                if (opt.uri != undefined) {
                    ApiUrl += opt.uri;
                }

                if (opt.data == undefined) {
                    opt.data = {};
                }

                /*
                 * RUN ANgulars HTTP CAll
                 */
                $http({
                    method: opt.method,
                    url: ApiUrl,
                    data: opt.data
                }).then(function successCallback(response) {

                    if (opt.success != undefined) {
                        opt.success(response);
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