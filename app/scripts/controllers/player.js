'use strict';
/* jshint camelcase: false */
/* global $ */
angular.module('node-spotify')
  .controller('PlayerCtrl', function ($scope, socket, events, util) {
    var currentSecond = 0;
    var songLengthInSeconds = 239;
    var $seekbar;

    socket.on(events.player_second_in_song, function(data) {
      currentSecond = data;
      $seekbar.slider('setValue', currentSecond * 100 / songLengthInSeconds);
    });

    socket.on(events.now_playing_data_changed, function(data) {
      console.log(data);
      songLengthInSeconds = data.track.duration;
    });

    $scope.pause = function() {
      socket.emit(events.player_pause);
    };

    $scope.resume = function() {
      socket.emit(events.player_resume);
    };

    $scope.back = function() {
      socket.emit(events.player_back);
    };

    $scope.forward = function() {
      socket.emit(events.player_forward);
    };

    /* jquery init seekbar */
    $seekbar = $('#seekbar');
    $seekbar.slider({
        min: 0,
        max: 100,
        step: 0.5,
        value: 0.1,
        layout: 'horizontal',
        formater: function(val) {
          return util.percentToTimeString(val, songLengthInSeconds);
        }
      }).on('slideStop', function(event) {
        console.log(event.value);
      });
  });
