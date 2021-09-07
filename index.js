const { mixedTypeAnnotation } = require("@babel/types");

const player = {
  songs: [
    {
      id: 1,
      title: 'Vortex',
      album: 'Wallflowers',
      artist: 'Jinjer',
      duration: 242,
    },
    {
      id: 2,
      title: 'Vinda',
      album: 'Godtfolk',
      artist: 'Songleikr',
      duration: 160,
    },
    {
      id: 7,
      title: 'Shiroyama',
      album: 'The Last Stand',
      artist: 'Sabaton',
      duration: 213,
    },
    {
      id: 3,
      title: 'Thunderstruck',
      album: 'The Razors Edge',
      artist: 'AC/DC',
      duration: 292,
    },
    {
      id: 4,
      title: 'All is One',
      album: 'All is One',
      artist: 'Orphaned Land',
      duration: 270,
    },
    {
      id: 5,
      title: 'As a Stone',
      album: 'Show Us What You Got',
      artist: 'Full Trunk',
      duration: 259,
    },
  ],
  playlists: [
    { id: 11, name: 'Metal', songs: [1, 7, 4] },
    { id: 12, name: 'Israeli', songs: [4, 5] },
  ],
  playSong(song) {
      console.log("Playing " + song.title + " from " + song.album + " by " + song.artist + " | " + timeConventor(song.duration) + ".");
  }
}
// this help function gets time in seconds and return it by minutes in this style => min:sec (for example, 04:19)
function timeConventor(duration){
  if (duration/60 < 10){
    if (duration%60 < 10){
      return "0"+Math.floor(duration/60)+ ":0" + duration%60;
    }else{
      return "0"+Math.floor(duration/60)+ ":" + duration%60;
    }
  }else if (duration%60 < 10){
    return Math.floor(duration/60)+ ":0" + duration%60;
  }else{
    return Math.floor(duration/60)+ ":" + duration%60;
  }

}
// this is help function that return boolean value of the exist of id in list (can be songs or playlists)
function isIdExist(List , id){
  for(let i = 0; i < List.length; i++){
    if (List[i].id === id){
      return true;
    }
  }
  return false;
}
//this is help function that return song from the player object by given Id
function getSongFromId(songs , id){
  for(let i = 0; i < songs.length; i++){
    if (songs[i].id === id){
      return songs[i];
    }
  }
}

function playSong(id) {
  if(isIdExist(player.songs , id)){
    player.playSong(getSongFromId(player.songs , id));
  }else{
    throw "non exist Id";
  } 
}
// this is help function that get id and remove the song from the player songs list
function removeSongFromPlayerById(songs , id){
  if (songs.length === 0){
    return [];
  }else if(songs[0].id === id){
    return removeSongFromPlayerById(songs.slice(1) , id);
  }else{
    return [songs[0]].concat(removeSongFromPlayerById(songs.slice(1) , id));
  }
} 
// this is help function that get id and list of playlists and return if song by the given id is exist in the playlists
function isExistOnPlaylist(playlists, id){
  for (let i = 0 ; i < playlists.length ; i++ ){
    for (let j = 0 ; j < playlists[i].songs.length ;j++){
      if (playlists[i].songs[j] === id){
        return true;
      }
    }
  }
  return false;
}
//this is help function that get one playlist and id and remove the id if exist
function removeFromPlaylistSongsList(songs , id){
  if(songs.length === 0){
    return [];
  }else if (songs[0] === id){
    return removeFromPlaylistSongsList(songs.slice(1) , id);
  }else{
    return [songs[0]].concat(removeFromPlaylistSongsList(songs.slice(1) , id));
  }
} 

function removeSong(id) {
  if (isIdExist(player.songs , id)){
    player.songs=removeSongFromPlayerById(player.songs , id)
    if (isExistOnPlaylist(player.playlists, id)){
      for (let i = 0 ; i < player.playlists.length ; i++){
        player.playlists[i].songs=removeFromPlaylistSongsList(player.playlists[i].songs, id);
      }
    }
  }else{
    throw "non exist Id";
  }
}
//this function return id number based on the player songs/playlists list.
function numberForId(playerList){
  let arr=[];
  for (let i = 0 ; i < playerList.length ; i++){
    arr.push(playerList[i].id);
  }
  if (arr.length === 0){
    return 1;
  }
  arr=arr.sort(function (a, b) { return a - b;  });
  let id = 0;
  for (let i = 0 ;  i < arr.length ; i++){
    if(arr[i] > (i+1)){
      return i+1;
    }
  }
  id = arr.length+1;
  return id;
}
//this functions get time by min:sec and return duration by sec
function timeConventorToSeconds(time){
  let arr = time.split('');
  let min = (parseInt(arr[0])*10)+parseInt(arr[1]);
  let sec = parseInt(arr[3]+arr[4]);
  return (min * 60) + sec;
}

function addSong(title, album, artist, duration, id) {
  let newId=id;
  if (isIdExist(player.songs , id)){
    throw "this id is taken";
  }else if(id=== undefined){
    newId = numberForId(player.songs);
  }
  player.songs.push(new Object());
  player.songs[player.songs.length-1].id= newId;
  player.songs[player.songs.length-1].duration= timeConventorToSeconds(duration);
  player.songs[player.songs.length-1].title= title;
  player.songs[player.songs.length-1].artist= artist;
  player.songs[player.songs.length-1].album= album;
  return newId;
}

//this function remove playlist/song from list of songs/playlists based on the id that given and based on that the id exist.
function removeHelp(List,id){
  if (List[0].id === id){
    return List.slice(1)
  }else{
    return [List[0]].concat(removeHelp(List.slice(1),id));
  }
}

function removePlaylist(id) {
  if (isIdExist(player.playlists, id)){
    player.playlists  = removeHelp(player.playlists,id);
  }else{
    throw "non exist Id";
  }
}

function createPlaylist(name, id) {
  let newId=id;
  if (isIdExist(player.playlists , id)){
    throw "this id is taken";
  }else if(id=== undefined){
    newId = numberForId(player.playlists);
  }
  player.playlists.push(new Object());
  player.playlists[player.playlists.length-1].id= newId;
  player.playlists[player.playlists.length-1].name= name;
  player.playlists[player.playlists.length-1].songs= [];
  return newId;
}
// this is help function that get list of properties and return the item with the id the function gets as argument.
function returnPropItem(playerList,id){
  if (playerList.length === 0){
    throw "non exist id";
  }else if (playerList[0].id === id){
    return playerList[0];
  }else{
    return returnPropItem(playerList.slice(1),id);
  }
}

function playPlaylist(id) {
  if (!isIdExist(player.playlists , id)){
    throw "non exist id";
  }else{
    let playlist = returnPropItem(player.playlists,id);
    for (let i = 0 ; i < playlist.songs.length ; i++ ){
      playSong(playlist.songs[i]);
    }
  }
}
// this is help function that gets List of songs id and return it without the id of the argument
function removeHelpForSongsOnPlaylists(List,id){
  if (List[0] === id){
    return List.slice(1)
  }else{
    return [List[0]].concat(removeHelpForSongsOnPlaylists(List.slice(1),id));
  }
}

function editPlaylist(playlistId, songId) {
  if (!isIdExist(player.songs , songId)){
    throw "non exist id for song";
  }else if (!isIdExist(player.playlists , playlistId)){
  throw "non exist id for song";
  }else if(isIdExist(returnPropItem(player.playlists, playlistId).songs , songId)){
  for (let i = 0 ; i < player.playlists.length ; i++){
    if (player.playlists[i].id === playlistId){
      console.log("Yam")
      player.playlists[i].songs.push(songId);
    }  
  }
  }else{
    for (let i = 0 ; i < player.playlists.length ; i++){
      if (player.playlists[i].id === playlistId){
        console.log("ebgui")
        player.playlists[i].songs = removeHelpForSongsOnPlaylists(player.playlists[i].songs,songId);
        if(player.playlists[i].songs.length === 0){
         removePlaylist(playlistId);
        }
      }
    }
  }  
}

function playlistDuration(id) {
  // your code here
}

function searchByQuery(query) {
  // your code here
}

function searchByDuration(duration) {
  // your code here
}
playPlaylist(11);
editPlaylist(11, 1);
console.log(timeConventor(242));
module.exports = {
  player,
  playSong,
  removeSong,
  addSong,
  removePlaylist,
  createPlaylist,
  playPlaylist,
  editPlaylist,
  playlistDuration,
  searchByQuery,
  searchByDuration,
}
