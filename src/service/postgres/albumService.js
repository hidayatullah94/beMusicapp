const { Pool } = require('pg');
const { nanoid } = require('nanoid');

const InvariantError = require('../../exception/invariantError');
const NotFoundError = require('../../exception/notFoundError');

class AlbumService {
  constructor() {
    this._pool = new Pool();
  }

  // service add album
  async addAlbum({ name, year }) {
    const id = nanoid(16);

    // create object query
    const query = {
      text: 'INSERT INTO albums VALUES($1, $2, $3) RETURNING id',
      values: [id, name, year],

    };

    // ekskusi query
    const result = await this._pool.query(query);

    // succes / fail
    if (!result.rows[0].id) {
      throw new InvariantError('Album gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  // service get all albums
  async getAlbum() {
    const result = await this._pool.query('SELECT * FROM albums');

    return result;
  }

  // service get album by id
  async getAlbumById(id) {
    const query = {
      text: 'SELECT * FROM albums WHERE id = $1',
      values: [id],

    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Album tidak ditemukan');
    }
    return result.rows[0];
  }

  // service edit album

  async editAlbum(id, { name, year }) {
    const query = {
      text: 'UPDATE albums SET name = $1, year = $2 WHERE id = $3 RETURNING id',
      values: [name, year, id],

    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui album, Id tidak ditemukan');
    }
  }

  // service delete album
  async deleteAlbum(id) {
    const query = {
      text: 'DELETE FROM albums WHERE id = $1 RETURNING id',
      values: [id],

    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Album gagal dihapus, Id tidak ditemukan');
    }
  }
}

module.exports = AlbumService;
