'use strict';
/* jshint camelcase: false */
angular.module('node-spotify')
  .controller('PlaylistCtrl', function($scope, socket, events, util) {
    $scope.util = util;
    $scope.playlist = {name: 'Choose a playlist'};
    $scope.playingTrackId = -1;

    socket.on(events.playlist_tracks, function(data) {
      $scope.playlist = data;
    });

    socket.on(events.playlist_renamed, function(data) {
      if($scope.playlist.id === data.id) {
        $scope.playlist.name = data.name;
      }
    });

    socket.on(events.now_playing_data_changed, function(track) {
      $scope.playingTrackId = track.id;
    });

    $scope.play = function(playlistId, trackId) {
      socket.emit(events.play, {playlistId: playlistId, trackId: trackId});
    };

    $scope.star = function(trackId, playlistId, starred) {
      $scope.playlist.tracks[trackId].starred = starred;
      socket.emit(events.track_set_starred, {trackId: trackId, playlistId: playlistId, starred: starred});
    };

  });
