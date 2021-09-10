# MP3 Player - Second Weekend Assignment
You are going to implement an MP3 player.

A song object has:
- `id`: a unique ID (a number)
- `title`: a title
- `album`: album title
- `artist`: artist name
- `duration`: duration (number, in seconds)

A playlist object has:
- `id`: a unique ID (a number)
- `name`: a name
- `songs`: an array of song IDs
- 
The Main Functions Of The Assignment
- `playSong` - Gets a song ID. Uses `player.playSong` to play the song with the given ID.
- `removeSong` - Gets a song ID. Removes the song with the given ID from the player (from songs and playlists).
- `addSong` - Gets a title, album, artist, duration & ID. Adds a new song with given properties to the player. The ID is optional, and if omitted should be automatically generated. The song duration should be in `mm:ss` format (for example 06:27). Returns the ID of the new song.
- `removePlaylist` - Gets a playlist ID. Remove the playlist with the given ID from the player (does not delete the songs inside it).
- `createPlaylist` - Gets a name & ID. Creates a new, empty playlist with the given details. The ID is optional, and if omitted should be automatically generated. Returns the ID of the new playlist.
- `playPlaylist` - Gets a playlist ID. Plays all songs in the specified playlist, in the order the appear in the playlist.
- `editPlaylist` - Gets a playlist ID & a song ID. If the song ID exists in the playlist, removes it. If it was the only song in the playlist, also deletes the playlist. If the song ID does not exist in the playlist, adds it to the end of the playlist.
- `playlistDuration` - Gets a playlist ID. Returns the total duration of the entire playlist with the given ID.
- `searchByQuery` - Gets a query string. Returns a results object, which has:
  - `songs`: an array of songs in which either title or album or artist contain the query string. The songs should be sorted by their titles.
  - `playlists`: an array of playlists in which the name contains the query string. The playlists should be sorted by their names.
  The comparison in both cases should be case-insensitive.
- `searchByDuration` - Gets a duration in `mm:ss` format (for example 11:03). Returns the song, or playlist, with the closest duration to what was given.

There are many side functions that includes on the code.
this functions should break the main functions to small functions that are more simple.



