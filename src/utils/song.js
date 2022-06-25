const songs = ({
  id,
  title,
  performer,

}) => ({
  id,
  title,
  performer,

});

const detailSong = ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  album_id,

}) => ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  albumId: album_id,

});

module.exports = { songs, detailSong };
