'use strict';
/* jshint camelcase: false */
angular.module('node-spotify')
  .factory('socket', function(events) {
    var eventFunctions = { login: angular.noop };
    var albums = {
      tenthousanddays: {name:'10,000 Days', cover: '10,000Days.jpg', artist:'Tool', tracks: [{name: 'Viginti Tres', duration: 302786},{name: 'Rosetta Stoned', duration: 671360},{name: 'Wings for Marie, Part 1', duration: 371440},{name: 'The Pot', duration: 381946},{name: 'Vicarious', duration: 426680},{name: 'Intension', duration: 441253},{name: 'Lipan Conjuring', duration: 71053},{name: 'Jambi', duration: 448613},{name: 'Right in Two', duration: 535800},{name: 'Lost Keys (Blame Hofmann)', duration: 226266},{name: '10,000 Days (Wings, Part 2)', duration: 673773}]},
      aeroplane_sea: {name:'In the Aeroplane Over the Sea', cover: 'Aeroplane.jpg', artist:'Neutral Milk Hotel', tracks: [{name: 'Two-Headed Boy, Part Two', duration: 313973},{name: 'The King of Carrot Flowers, Part One', duration: 120426},{name: 'Holland, 1945', duration: 192533},{name: '[untitled]', duration: 136026},{name: 'Ghost', duration: 248573},{name: 'Oh Comely', duration: 498146},{name: 'In the Aeroplane Over the Sea', duration: 202346},{name: 'The King of Carrot Flowers, Parts Two & Three', duration: 186280},{name: 'Two-Headed Boy', duration: 266106},{name: 'The Fool', duration: 113146},{name: 'Communist Daughter', duration: 117306}]},
      amateur_girlfriend: {name:'Amateur Girlfriend Go Proskirt Agent', cover: 'proskirt_agent.jpg', artist:'Xploding Plastix', tracks: [{name: 'Relieved Beyond Repair', duration: 105480},{name: 'Tintinnamputation', duration: 266400},{name: 'Treat Me Mean, I Need the Reputation', duration: 298200},{name: 'More Powah to Yah', duration: 326840},{name: 'Happy Jizz Girls', duration: 174040},{name: 'Having Smarter Babies', duration: 297253},{name: 'Behind the Eightball', duration: 289693},{name: 'Single Stroke Ruffs', duration: 148040},{name: '6-Hours Starlight', duration: 202186},{name: 'Sports, Not Heavy Crime', duration: 307093},{name: 'Doubletalk Gets Through to You', duration: 323733},{name: 'Comatose Luck', duration: 219733},{name: 'Funnybones & Lazylegs', duration: 288306},{name: 'Far-Flung Tonic', duration: 291573}]},
      amnesiac: {name:'Amnesiac', cover: 'amnesiac.jpg', artist:'Radiohead', tracks: [{name: 'Knives Out', duration: 254866},{name: 'Life in a Glasshouse', duration: 274706},{name: 'Morning Bell/Amnesiac', duration: 194266},{name: 'I Might Be Wrong', duration: 293760},{name: 'Pyramid Song', duration: 288733},{name: 'Like Spinning Plates', duration: 237466},{name: 'Dollars and Cents', duration: 291733},{name: 'Packt Like Sardines in a Crushd Tin Box', duration: 240333},{name: 'You and Whose Army?', duration: 191000},{name: 'Hunting Bears', duration: 121200},{name: 'Pulk/Pull Revolving Doors', duration: 247266}]},
      bangarang: {name:'Bangarang EP', cover: 'bangarang.jpg', artist:'Skrillex', tracks: [{name: 'Right In', duration: 181800},{name: 'Kyoto', duration: 200786},{name: 'The Devil’s Den', duration: 292906},{name: 'Breakn’ a Sweat', duration: 303306},{name: 'Bangarang', duration: 215000},{name: 'Right on Time', duration: 245000},{name: 'Summit', duration: 373986}]},
      bach_organ: {name:'Bach Organ Works', artist:'Johann Sebastian Bach', tracks: [{name: 'Fantasia and Fugue in G (Great) BWV.542', duration: 730000},{name: 'Toccata and Fugue (Dorian) BWV.532', duration: 676000},{name: 'Prelude and Fugue in E minor BWV.548', duration: 789000},{name: 'Prelude and Fugue in D major BWV.532', duration: 636000},{name: 'Chorale Prelude Wer nur den lieben Gott lasst walten, BWV.642', duration: 216000},{name: 'Toccata and Fugue in D minor BWV.565', duration: 481000}]},
      bach_violin: {name:'Double Concerto & Violin Concertos', artist:'Johann Sebastian Bach', tracks: [{name: 'Concerto in D minor for Two Violins and Orchestra Double, BWV 1043: I. Vivace', duration: 233133},{name: 'Concerto No. 2 in E major for Violin and Orchestra, BWV 1042: I. Allegro', duration: 514000},{name: 'Concerto No. 1 in A minor for Violin and Orchestra, BWV 1041: I. Allegro', duration: 266973},{name: 'Concerto No. 1 in A minor for Violin and Orchestra, BWV 1041: II. Andante', duration: 413933},{name: 'Concerto No. 2 in E major for Violin and Orchestra, BWV 1042: III. Allegro assai', duration: 176440},{name: 'Concerto No. 1 in A minor for Violin and Orchestra, BWV 1041: III. Allegro assai', duration: 250866},{name: 'Concerto in D minor for Two Violins and Orchestra Double, BWV 1043: III. Allegro', duration: 305293},{name: 'Concerto No. 2 in E major for Violin and Orchestra, BWV 1042: II. Adagio', duration: 445026},{name: 'Concerto in D minor for Two Violins and Orchestra Double, BWV 1043: II. Largo ma non tanto', duration: 419933}]},
      black_sands: {name:'Black Sands', cover: 'black_sands.jpg', artist:'Bonobo', tracks: [{name: 'Kong', duration: 237826},{name: 'Animals', duration: 405040},{name: 'We Could Forever', duration: 259839},{name: 'Prelude', duration: 78266},{name: 'All in Forms', duration: 291733},{name: 'Black Sands', duration: 408960},{name: 'El Toro', duration: 224293},{name: 'Brace Brace', duration: 421960},{name: '1009', duration: 270426},{name: 'Eyesdown', duration: 326240},{name: 'Stay the Same', duration: 284800},{name: 'The Keeper', duration: 288933},{name: 'Kiara', duration: 230306}]},
      brahms: {name:'Brahms: The Symphonies', artist:'Johannes Brahms; Herbert von Karajan, Berliner Philharmoniker', tracks: [{name: 'Variations on a Theme by Joseph Haydn, op. 56a: Finale: Andante', duration: 237000},{name: 'Symphony No. 3 in F major, op. 90: II. Andante', duration: 462000},{name: 'Symphony No. 3 in F major, op. 90: IV. Allegro', duration: 515000},{name: 'Variations on a Theme by Joseph Haydn, op. 56a: Variation III: Con moto', duration: 107000},{name: 'Symphony No. 3 in F major, op. 90: III. Poco Allegretto', duration: 364000},{name: 'Symphony No. 2 in D major, op. 73: II. Adagio non troppo - Listesso tempo, ma grazioso', duration: 621000},{name: 'Variations on a Theme by Joseph Haydn, op. 56a: Variation V: Vivace', duration: 52000},{name: 'Tragic Overture, op. 81', duration: 864000},{name: 'Symphony No. 1 in C minor, op. 68: I. Un poco sostenuto - Allegro', duration: 795000},{name: 'Symphony No. 1 in C minor, op. 68: IV. Adatio - Più Andante - Allegro non troppo, ma con brio', duration: 1046000},{name: 'Symphony No. 3 in F major, op. 90: I. Allegro con brio', duration: 596000},{name: 'Variations on a Theme by Joseph Haydn, op. 56a: Variation II: Più vivace', duration: 65000},{name: 'Symphony No. 2 in D major, op. 73: IV. Allegro con spirito', duration: 517000},{name: 'Variations on a Theme by Joseph Haydn, op. 56a: Variation I: Poco più animato', duration: 75000},{name: 'Symphony No. 4 in E minor, op. 98: II. Andante moderato', duration: 665000},{name: 'Symphony No. 1 in C minor, op. 68: III. Un poco Allefretto e grazioso', duration: 283000},{name: 'Variations on a Theme by Joseph Haydn, op. 56a: Variation VI: Vivace', duration: 76000},{name: 'Symphony No. 1 in C minor, op. 68: II. Andante sostenuto', duration: 537000},{name: 'Symphony No. 2 in D major, op. 73: III. Allegretto grazioso (Quasi Andantino) - Presto ma non assai - Tempo I', duration: 299000},{name: 'Variations on a Theme by Joseph Haydn, op. 56a: Chorale St. Antoni: Andante', duration: 111000},{name: 'Symphony No. 2 in D major, op. 73: I. Allegro non troppo', duration: 894000},{name: 'Symphony No. 4 in E minor, op. 98: IV. Allegro energico e passionato - Più Allegro', duration: 597000},{name: 'Symphony No. 4 in E minor, op. 98: III. Allegro giocoso - Poco meno presto - Tempo I', duration: 364000},{name: 'Symphony No. 4 in E minor, op. 98: I. Allegro non troppo', duration: 768000},{name: 'Variations on a Theme by Joseph Haydn, op. 56a: Variation IV: Andante con moto', duration: 133000}]},
      dark_twisted: {name:'My Beatiful Dark Twisted Fantasy', cover: 'dark_twisted.jpg', artist:'Kanye West', tracks: [{name: 'Monster', duration: 378000},{name: 'So Appalled', duration: 397000},{name: 'All of the Lights (interlude)', duration: 62000},{name: 'Blame Game', duration: 469000},{name: 'Dark Fantasy', duration: 280000},{name: 'Runaway', duration: 547000},{name: 'All of the Lights', duration: 299000},{name: 'Lost in the World', duration: 256000},{name: 'Gorgeous', duration: 357000},{name: 'Devil in a New Dress', duration: 351000},{name: 'Who Will Survive in America', duration: 98000},{name: 'Hell of a Life', duration: 327000},{name: 'See Me Now', duration: 363000},{name: 'Power', duration: 292656}]},
      donca_matic: {name:'The Donca Matic Singalongs', artist:'Xploding Plastix', tracks: [{name: 'Cashmere Tarmac', duration: 259959},{name: 'One Bullet Fits All', duration: 330266},{name: 'Sunset Spirals (feat. Sarah Cracknell)', duration: 211560},{name: 'The Famous Biting Guy', duration: 223533},{name: 'Donca Matic', duration: 306333},{name: 'The Snarling Amble (feat. Eek-A-Mouse)', duration: 278693},{name: 'Tripwire', duration: 281040},{name: 'Huncher', duration: 226693},{name: 'The Cave In Proper', duration: 285120},{name: 'Dizzy Blonde', duration: 332146},{name: 'Geigerteller', duration: 261573}]},
      dummy: {name:'Dummy', artist:'Portishead', cover: 'dummy.jpg', tracks: [{name: 'Sour Times', duration: 254000},{name: 'Glory Box', duration: 305573},{name: 'It\'s a Fire', duration: 229306},{name: 'Biscuit', duration: 304093},{name: 'Roads', duration: 305173},{name: 'Wandering Star', duration: 293960},{name: 'Numb', duration: 237960},{name: 'Mysterons', duration: 306200},{name: 'Pedestal', duration: 221000},{name: 'It Could Be Sweet', duration: 259973},{name: 'Strangers', duration: 238000}]},
      foley_room: {name:'Foley Room', cover: 'foley_room.jpg', artist:'Amon Tobin', tracks: [{name: 'Esther\'s', duration: 200066},{name: 'Big Furry Head', duration: 196973},{name: 'Horsefish', duration: 305800},{name: 'Foley Room', duration: 217226},{name: 'Bloodstone', duration: 252533},{name: 'Keep Your Distance', duration: 287266},{name: 'Always', duration: 218600},{name: 'The Killer\'s Vanilla', duration: 250506},{name: 'At the End of the Day', duration: 192200},{name: 'Straight Psyche', duration: 406866},{name: 'Kitchen Sink', duration: 287666},{name: 'Ever Falling', duration: 223960}]},
      goblin: {name:'Goblin', cover: 'goblin.jpg', artist:'Tyler, the Creator', tracks: [{name: 'Transylvania', duration: 192000},{name: 'Goblin', duration: 409000},{name: 'Bitch Suck Dick', duration: 216000},{name: 'Golden', duration: 343000},{name: 'Nightmare', duration: 322000},{name: 'Analog', duration: 174000},{name: 'Radicals', duration: 438000},{name: 'Her', duration: 211000},{name: 'Sandwitches', duration: 291000},{name: 'Yonkers', duration: 249000},{name: 'Tron Cat', duration: 254000},{name: 'Window', duration: 480000},{name: 'She', duration: 253000},{name: 'Fish / Boppin Bitch', duration: 380000},{name: 'AU79', duration: 220000}]},
      kid_a: {name:'Kid A', cover: 'kid_a.jpg', artist:'Radiohead', tracks: [{name: 'Kid A', duration: 284506},{name: 'Idioteque', duration: 309093},{name: 'In Limbo', duration: 211000},{name: 'Treefingers', duration: 222600},{name: 'Optimistic', duration: 315973},{name: 'Morning Bell', duration: 275800},{name: 'Everything in Its Right Place', duration: 251426},{name: 'How to Disappear Completely', duration: 356333},{name: 'The National Anthem', duration: 351693},{name: 'Motion Picture Soundtrack', duration: 419466}]},
      lateralus: {name:'Lateralus', cover: 'lateralus.jpg', artist:'Tool', tracks: [{name: 'Parabola', duration: 364533},{name: 'Lateralus', duration: 564146},{name: 'Faaip de Oiad', duration: 160000},{name: 'Triad', duration: 526000},{name: 'Reflection', duration: 669733},{name: 'Mantra', duration: 73600},{name: 'Parabol', duration: 186453},{name: 'Ticks & Leeches', duration: 488000},{name: 'Schism', duration: 405533},{name: 'The Grudge', duration: 516253},{name: 'Disposition', duration: 288093},{name: 'Eon Blue Apocalypse', duration: 66760},{name: 'The Patient', duration: 432933}]},
      like_clockwork: {name:'...Like Clockwork', cover: 'like_clockwork.jpg', artist:'Queens of the Stone Age', tracks: [{name: 'Kalopsia', duration: 278120},{name: 'My God Is the Sun', duration: 235400},{name: 'If I Had a Tail', duration: 295000},{name: 'I Appear Missing', duration: 360000},{name: 'Keep Your Eyes Peeled', duration: 304000},{name: 'Fairweather Friends', duration: 223400},{name: 'I Sat by the Ocean', duration: 235587},{name: 'The Vampyre of Time and Memory', duration: 214587},{name: 'Smooth Sailing', duration: 291000},{name: '…Like Clockwork', duration: 324312}]},
      loveless: {name:'Loveless', cover: 'loveless.jpg', artist:'My Bloody Valentine', tracks: [{name: 'To Here Knows When', duration: 333400},{name: 'Soon', duration: 418573},{name: 'Come In Alone', duration: 240746},{name: 'Loomer', duration: 160306},{name: 'Blown a Wish', duration: 218826},{name: 'I Only Said', duration: 336613},{name: 'Touched', duration: 58906},{name: 'Sometimes', duration: 321560},{name: 'Only Shallow', duration: 259306},{name: 'What You Want', duration: 335306},{name: 'When You Sleep', duration: 253933}]},
      merriweather: {name:'Merriweather Post Pavillon', cover: 'merriweather.jpg', artist:'Animal Collective', tracks: [{name: 'In the Flowers', duration: 322000},{name: 'No More Runnin', duration: 263000},{name: 'My Girls', duration: 341000},{name: 'Lion in a Coma', duration: 252000},{name: 'Bluish', duration: 314000},{name: 'Guys Eyes', duration: 271000},{name: 'Also Frightened', duration: 314000},{name: 'Daily Routine', duration: 346000},{name: 'Summertime Clothes', duration: 270000},{name: 'Brother Sport', duration: 359000},{name: 'Taste', duration: 233000}]},
      monoliths: {name:'Monoliths & Dimensions', cover: 'monoliths.jpg', artist:'Sunn O)))', tracks: [{name: 'Big Church [megszentségteleníthetetlenségeskedéseitekért]', duration: 582666},{name: 'Hunting & Gathering (Cydonia)', duration: 602000},{name: 'Aghartha', duration: 1054266},{name: 'Alice', duration: 980440}]},
      north_borders: {name:'The North Borders', cover: 'north_borders.jpg', artist:'Bonobo', tracks: [{name: 'Ten Tigers', duration: 243000},{name: 'Heaven for the Sinner', duration: 249000},{name: 'Don\'t Wait', duration: 317000},{name: 'Know You', duration: 245000},{name: 'Jets', duration: 274000},{name: 'Antenna', duration: 212000},{name: 'Cirrus', duration: 352000},{name: 'Sapphire', duration: 287000},{name: 'Emkay', duration: 325000},{name: 'Pieces', duration: 267000},{name: 'Towers', duration: 216000},{name: 'Transits', duration: 260000},{name: 'First Fires', duration: 278000}]},
      number_beast: {name:'Number Of The Beast', artist:'Iron Maiden', tracks: [{name: 'Total Eclipse', duration: 265400},{name: 'Children of the Damned', duration: 274866},{name: 'The Number of the Beast', duration: 290066},{name: 'Hallowed Be Thy Name', duration: 431066},{name: 'Invaders', duration: 203560},{name: '22 Acacia Avenue', duration: 396306},{name: 'Gangland', duration: 228866},{name: 'The Prisoner', duration: 362000},{name: 'Run to the Hills', duration: 233066}]},
      popngum: {name:'Pop\'n\'Gum', artist:'Superbus', tracks: [{name: 'Petit Détail', duration: 182133},{name: 'Sunshine', duration: 202773},{name: 'Des Hauts, des bas', duration: 143600},{name: 'Tu respires', duration: 225280},{name: 'Radio Song', duration: 144480},{name: 'Little Hily', duration: 183613},{name: 'C’est pas comme ça', duration: 154813},{name: 'Girl', duration: 189293},{name: 'Beggin’ Me to Stay', duration: 139173},{name: 'Sex Baby Sex', duration: 161853},{name: 'Taboo', duration: 169693},{name: 'Pop’n’Gum', duration: 134826}]},
      psilodumputer: {name:'Psilodumputer', cover: 'psilodumputer.jpg', artist:'Psilodump', tracks: [{name: '[untitled]', duration: 96000},{name: 'Jag Minns Inte (Saturn remix by Bodenständig 2000)', duration: 215000},{name: 'The Somnambulist', duration: 367000},{name: 'Psilodumputer', duration: 291000},{name: 'Huvudwerk', duration: 335000},{name: 'Jag Minns Inte (O.S.T. remix by Terror Flynn)', duration: 291000},{name: 'Control EQ Fixed (Gangster remix by Paza)', duration: 237000},{name: 'The Somnambulist (Umpadump remix by Din Stalker)', duration: 214000},{name: 'Behind the False Two', duration: 323000},{name: 'Låtsades Krama', duration: 445000},{name: 'Jag Minns Inte', duration: 430000},{name: 'Erased', duration: 283000},{name: 'Vuoksa the Triangle', duration: 239000},{name: 'You\'re So Full of SID', duration: 333000},{name: 'Psilodumputer (Rock Me-mix by Dorothy\'s Magic Bag)', duration: 144000},{name: 'Sitting Down', duration: 384000}]},
      random_access: {name:'Random Access Memories', cover: 'random_access.jpg', artist:'Daft Punk', tracks: [{name: 'Give Life Back to Music', duration: 274000},{name: 'Within', duration: 228000},{name: 'The Game of Love', duration: 321000},{name: 'Touch', duration: 498000},{name: 'Doin It Right', duration: 251000},{name: 'Motherboard', duration: 341000},{name: 'Fragments of Time', duration: 279000},{name: 'Contact', duration: 381000},{name: 'Get Lucky', duration: 367000},{name: 'Lose Yourself to Dance', duration: 353000},{name: 'Giorgio by Moroder', duration: 544000},{name: 'Beyond', duration: 290000},{name: 'Instant Crush', duration: 337000}]},
      songs_for_deaf: {name:'Songs For The Deaf', cover: 'songs_for_the_deaf.jpg', artist:'Queens of the Stone Age', tracks: [{name: 'A Song for the Dead', duration: 352440},{name: 'Mosquito Song', duration: 338333},{name: 'No One Knows', duration: 278706},{name: 'Do It Again', duration: 244840},{name: 'Another Love Song', duration: 195600},{name: 'You Think I Aint Worth a Dollar, but I Feel Like a Millionaire', duration: 192573},{name: 'Go With the Flow', duration: 187120},{name: 'God Is in the Radio', duration: 364933},{name: 'Hangin Tree', duration: 186306},{name: 'First It Giveth', duration: 198386},{name: 'The Sky Is Fallin', duration: 375866},{name: 'Song for the Deaf / Feel Good Hit of the Summer (reprise)', duration: 402733},{name: 'Everybodys Gonna Be Happy', duration: 155613},{name: 'Six Shooter', duration: 79333},{name: 'Gonna Leave You', duration: 170173}]},
      third: {name:'Third', artist:'Portishead', cover: 'third.jpg', tracks: [{name: 'Threads', duration: 347786},{name: 'Deep Water', duration: 93226},{name: 'Small', duration: 407373},{name: 'Hunter', duration: 238733},{name: 'Silence', duration: 300773},{name: 'Plastic', duration: 210573},{name: 'Nylon Smile', duration: 199600},{name: 'Magic Doors', duration: 211933},{name: 'Machine Gun', duration: 286440},{name: 'The Rip', duration: 270960},{name: 'We Carry On', duration: 387786}]},
      treated_timber: {name:'Treated Timber Resist Rot', cover: 'treated_timber.jpg', artist:'Xploding Plastix', tracks: [{name: 'A Rogue Friend Is a Wild Beast', duration: 331600},{name: 'Band of Miscreants', duration: 332360},{name: 'Arts of Exit', duration: 263626},{name: 'Kissed by a Kisser', duration: 406960},{name: 'The Full Graft', duration: 311453},{name: 'Errata', duration: 284840},{name: 'The Cost of Resistance', duration: 327080},{name: 'Joyous Insolence', duration: 351920},{name: 'I Want My Violence Back', duration: 324960},{name: 'The Rigamarole Shell Out', duration: 230266},{name: 'Bulldozer Butterfly', duration: 262586},{name: 'Austere Faultlines', duration: 303506}]}
    };

    var playlistNames = [
      'Electro',
      'Animal Collective - Merriweather Post Pavillon',
      'Xploding Plastix',
      'Queens of the Stone Age - Songs For The Deaf',
      'Classical',
      'Metal',
      'Rap',
      'Bonobo - The North Borders',
      'Bonobo - Black Sands',
      'Radiohead - Amnesiac',
      'Brostep',
      'Ninja Tune',
      'Chiptune',
      'Portishead',
      'Bach',
      'My Bloody Valentine - Loveless',
      'Radiohead - Kid A',
      'Tool',
      'Chillout',
      'Pop',
      'Sunn O)))',
      'Queens of the Stone Age - ...Like Clockwork',
      'Neutral Milk Hotel - In The Aeroplane Over The Sea',
    ];

    var albumsInPlaylist = [
      ['black_sands', 'foley_room', 'random_access', 'north_borders'],
      ['merriweather'],
      ['treated_timber', 'amateur_girlfriend', 'donca_matic'],
      ['songs_for_deaf'],
      ['brahms'],
      ['number_beast'],
      ['dark_twisted', 'goblin'],
      ['north_borders'],
      ['black_sands'],
      ['amnesiac'],
      ['bangarang'],
      ['foley_room', 'black_sands', 'north_borders'],
      ['psilodumputer'],
      ['third', 'dummy'],
      ['bach_violin', 'bach_organ'],
      ['loveless'],
      ['kid_a'],
      ['lateralus', 'tenthousanddays'],
      ['black_sands'],
      ['popngum'],
      ['monoliths'],
      ['like_clockwork'],
      ['aeroplane_sea']
    ];

    function buildPlaylist(id) {
      var playlist = { id: id, name: playlistNames[id], tracks: [] };
      for(var i = 0; i < albumsInPlaylist[id].length; i++) {
        var album = albums[albumsInPlaylist[id][i]];
        for(var j = 0; j < album.tracks.length; j++) {
          playlist.tracks.push( { artists: [{name: album.artist}], cover: album.cover, name: album.tracks[j].name, duration: album.tracks[j].duration/1000, album: album.name});
        }
      }
      return playlist;
    }

    var playlists = [];
    for(var id = 0; id < playlistNames.length; id++) {
      playlists.push(buildPlaylist(id));
    }

    function triggerAllEvents(name, data) {
      for(var i = 0; i < eventFunctions[name].length; i++) {
        eventFunctions[name][i](data);
      }
    }

    return {
        on: function(event, fun) {
            if(eventFunctions[event] !== undefined) {
              eventFunctions[event].push(fun);
            } else {
              eventFunctions[event] = [fun];
            }
          },

        emit: function(event, inData) {
            var data = {};
            if(event === events.logged_in) {
              data.loggedIn = false;
            }
            else if(event === events.login) {
              eventFunctions.logged_in[0]( {loggedIn: true});
            }
            else if(event === events.initial_data) {
              data = playlists;
            }
            else if(event === events.playlist_tracks) {
              data = playlists[inData.id];
            }
            else if(event === events.play) {
              var playlist = playlists[inData.playlistId];
              var track = playlist.tracks[inData.trackId];
              triggerAllEvents(events.now_playing_data_changed, {track: track});
              triggerAllEvents(events.now_playing_picture_changed, track.cover);
              return;
            }
            triggerAllEvents(event, data);
          }
      };
  });
