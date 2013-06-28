'use strict';

angular.module('node-spotify')
  .factory('util', function() {
    return {
      percentToTimeString: function(value, maxTimeInSeconds) {
        var seconds = value/100 * maxTimeInSeconds;
        var secondsInMinute = Math.floor( seconds % 60 );
        if(secondsInMinute < 10) {
          secondsInMinute = '0' + secondsInMinute;
        }
        return Math.floor(seconds / 60) + ':' + secondsInMinute;
      }
    };
  });