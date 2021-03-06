'use strict';
/* jshint camelcase: false */
(function(define) {
  define([], function() {
    var events = {
      /* Playlists */
      playlist_new: 'playlist_new',
      playlist_renamed: 'playlist_renamed',
      playlist_tracks: 'playlist_tracks',
      playlist_tracks_changed: 'playlist_tracks_changed',
      playlist_image: 'events.playlist_image',

      /* Tracks */
      track_set_starred: 'track_set_starred',

      /* general */
      initial_data: 'initial_data',
      logged_in: 'logged_in',
      login: 'login',
      logout: 'logout',
      message: 'message',
      search_complete: 'search_complete',

      /* player */
      player_play: 'player_play',
      player_pause: 'player_pause',
      player_resume: 'player_resume',
      player_forward: 'player_forward',
      player_back: 'player_back',
      player_second_in_song: 'player_second_in_song',
      player_end_of_track: 'player_end_of_track',
      now_playing_picture_changed: 'now_playing_picture_changed',
      now_playing_data_changed: 'now_playing_data_changed',
      player_seek: 'player_seek'
    };

    return events;
  });

})(typeof angular === 'object' ? function(mods, exports) { angular.module('node-spotify').factory('events', exports);}
  : function(mods, exports) { module.exports = exports(); });
