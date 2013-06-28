'use strict';
/* jshint camelcase: false */
angular.module('node-spotify')
  .controller('NowPlayingCtrl', function($scope, socket, events) {
    $scope.image = 'img/noalbumcover.png';

    socket.on(events.now_playing_picture_changed, function(data) {
      if(data) {
        $scope.image = 'img/cover/' + data;
      } else {
        $scope.image = 'img/noalbumcover.png';
      }
    });
  });
