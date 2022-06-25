const { nanoid } = require('nanoid');
const NotFoundError = require('../../exception/notFoundError');
const InvariantError = require('../../exception/invariantError');

class AlbumService {
  constructor() {
    this._albums = [];
  }

  // add album
  addAlbum({ name, year }) {
    const id = nanoid(16);

    const newAlbum = {
      id,
      name,
      year,
    };

    this._albums.push(newAlbum);

    // validasi add success

    const isSucces = this._albums.filter((a) => a.id === id).length > 0;

    if (!isSucces) {
      throw new InvariantError('Album gagal ditambahkan');
    }

    return id;
  }

  // get all album
  getAlbum() {
    return this._albums;
  }

  // get album by id
  getAlbumById(id) {
    const album = this._albums.filter((a) => a.id === id)[0];

    if (!album) {
      throw new NotFoundError('Album tidak ditemukan');
    }

    return album;
  }

  // edit album
  editAlbum(id, { name, year }) {
    const index = this._albums.findIndex((a) => a.id === id);

    if (index === -1) {
      throw new NotFoundError('Gagal memperbarui album, Id tidak ditemukan');
    }

    this._albums[index] = {
      ...this._albums[index],
      name,
      year,
    };
  }

  // delete album
  deleteAlbum(id) {
    const index = this._albums.findIndex((a) => a.id === id);

    if (index === -1) {
      throw new NotFoundError('Album gagal dihapus, Id tidak ditemukan');
    }

    this._albums.splice(index, 1);
  }
}

module.exports = AlbumService;
