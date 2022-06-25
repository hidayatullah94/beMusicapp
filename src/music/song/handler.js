const ClientError = require('../../exception/clientError');

class SongHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postSongHandler = this.postSongHandler.bind(this);
    this.getSongsHandler = this.getSongsHandler.bind(this);
    this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
    this.putSongByIdHandler = this.putSongByIdHandler.bind(this);
    this.deleteSongByIdHandler = this.deleteSongByIdHandler.bind(this);
  }

  // handler add
  async postSongHandler(req, h) {
    try {
      this._validator.validateSongPayload(req.payload);

      const {
        title, year, genre, performer, duration, albumId,
      } = req.payload;

      const songId = await this._service.addSong({
        title, year, genre, performer, duration, albumId,
      });

      const response = h.response({
        status: 'success',
        message: 'Song berhasil ditambahkan',
        data: {
          songId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,

        });
        response.code(error.statusCode);
        return response;
      }

      // server error

      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami',

      });
      response.code(500);
      return response;
    }
  }

  // handler get all
  async getSongsHandler(req, h) {
    const { query } = req;
    const songs = await this._service.getSong(query);
    const response = h.response({
      status: 'success',
      data: {
        songs,
      },

    });
    response.code(200);
    return response;
  }

  // handler get by id
  async getSongByIdHandler(req, h) {
    try {
      const { id } = req.params;

      const song = await this._service.getSongById(id);

      const response = h.response({
        status: 'success',
        data: {
          song,
        },

      });
      response.code(200);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,

        });
        response.code(error.statusCode);
        return response;
      }
      // server error

      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami',

      });
      response.code(500);
      return response;
    }
  }

  // handler edit
  async putSongByIdHandler(req, h) {
    try {
      this._validator.validateSongPayload(req.payload);

      const { id } = req.params;

      await this._service.editSong(id, req.payload);

      const response = h.response({
        status: 'success',
        message: 'Song berhasil diperbarui',

      });
      response.code(200);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,

        });
        response.code(error.statusCode);
        return response;
      }

      // server error
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami',

      });
      response.code(500);
      return response;
    }
  }

  // handler delete
  async deleteSongByIdHandler(req, h) {
    try {
      const { id } = req.params;

      await this._service.deleteSong(id);

      const response = h.response({
        status: 'success',
        message: 'Song berhasil dihapus',

      });
      response.code(200);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,

        });
        response.code(error.statusCode);
        return response;
      }

      // server error
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami',

      });
      response.code(500);
      return response;
    }
  }
}

module.exports = SongHandler;
