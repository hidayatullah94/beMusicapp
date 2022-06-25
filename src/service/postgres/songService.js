const { Pool } = require('pg');
const { nanoid } = require('nanoid');

const { songs, detailSong } = require('../../utils/song');
const InvariantError = require('../../exception/invariantError');
const NotFoundError = require('../../exception/notFoundError');

class SongService {
  constructor() {
    this._pool = new Pool();
  }

  // service add
  async addSong({
    title, year, genre, performer, duration, albumId,
  }) {
    const id = nanoid(16);

    // query
    const query = {
      text: 'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      values: [id, title, year, genre, performer, duration, albumId],

    };
    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Song gagal ditambahkan');
    }
    return result.rows[0].id;
  }

  // service get all
  async getSong({ title = '', performer = '' }) {
    const result = await this._pool.query({
      text: ' SELECT id, title, performer FROM songs WHERE LOWER(title) LIKE LOWER($1) AND LOWER(performer) LIKE($2) ',
      values: [`%${title}%`, `%${performer}%`],
    });

    // create map function
    return result.rows.map(songs);
  }

  // service get by id
  async getSongById(id) {
    const query = {
      text: 'SELECT * FROM songs WHERE id = $1',
      values: [id],

    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Song tidak ditemukan');
    }
    return result.rows.map(detailSong)[0];
  }

  // service edit
  async editSong(id, {
    title, year, genre, performer, duration, albumId,
  }) {
    const query = {
      text: 'UPDATE songs SET title = $1, year = $2, genre = $3, performer = $4,   duration = $5, album_id = $6 WHERE id = $7 RETURNING id ',
      values: [title, year, genre, performer, duration, albumId, id],

    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui songs, Id tidak ditemukan');
    }
  }

  // service delete
  async deleteSong(id) {
    const query = {
      text: 'DELETE FROM songs WHERE id = $1 RETURNING id',
      values: [id],

    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('songs gagal dihapus, Id tidak ditemukan');
    }
  }
}

module.exports = SongService;
