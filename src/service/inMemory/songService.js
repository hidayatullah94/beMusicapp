const { nanoid } = require('nanoid');
const InvariantError = require('../../exception/invariantError');
const NotFoundError = require('../../exception/notFoundError');

class SongService {
  constructor() {
    this._songs = [];
  }

  // add song
  addSong({
    title, year, performer, genre, duration, albumId,
  }) {
    const id = nanoid(16);

    const newSong = {
      id,
      title,
      year,
      performer,
      genre,
      duration,
      albumId,
    };

    this._songs.push(newSong);

    // validasi success add

    const isSuccess = this._songs.filter((s) => s.id === id).length > 0;

    if (!isSuccess) {
      throw new InvariantError('Song gagal ditambahkan');
    }

    return id;
  }

  // get song all
  getSong() {
    return this._songs;
  }

  // get song by ID
  getSongById(id) {
    const song = this._songs.filter((s) => s.id === id)[0];

    if (!song) {
      throw new NotFoundError('Song tidak ditemukan');
    }
    return song;
  }

  // edit song
  editSong(id, {
    title, year, performer, genre, duration, albumId,
  }) {
    const index = this._songs.findIndex((s) => s.id === id);

    if (index === -1) {
      throw new NotFoundError('Gagal memperbarui Song, Id tidak ditemukan');
    }

    this._songs[index] = {
      ...this._songs[index],
      title,
      year,
      performer,
      genre,
      duration,
      albumId,

    };
  }

  // delete song
  deleteSong(id) {
    const index = this._songs.findIndex((s) => s.id === id);

    if (index === -1) {
      throw new NotFoundError('Song gagal dihapus, Id tidak ditemukan');
    }

    this._songs.splice(index, 1);
  }
}

module.exports = SongService;
