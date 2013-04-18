'use strict';

/* Services */

angular.module('myApp.services', []).factory('Auth', function($http){
    return {
        register: function(user, success, error) {
            $http.post('/register', user).success(success).error(error);
        },
        login: function(user, success, error) {
            $http.post('/login', user).success(success).error(error);
        },
        logout: function(success, error) {
            $http.post('/logout').success(success).error(error);
        }
    };
});