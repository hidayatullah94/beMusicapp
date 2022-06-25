const ClientError = require('../../exception/clientError');

class AlbumHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postAlbumHandler = this.postAlbumHandler.bind(this);
    this.getAlbumsHandler = this.getAlbumsHandler.bind(this);
    this.getAlbumByIdHandler = this.getAlbumByIdHandler.bind(this);
    this.putAlbumByIdHandler = this.putAlbumByIdHandler.bind(this);
    this.deleteAlbumByIdHandler = this.deleteAlbumByIdHandler.bind(this);
  }

  // handler add
  async postAlbumHandler(req, h) {
    try {
      this._validator.validateAlbumPayload(req.payload);
      const { name, year } = req.payload;
      const albumId = await this._service.addAlbum({ name, year });

      const response = h.response({
        status: 'success',
        message: 'Album berhasil ditambahkan',
        data: {
          albumId,
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
  async getAlbumsHandler() {
    const album = await this._service.getAlbum();

    return {
      status: ' success',
      data: {
        album,
      },

    };
  }

  // get by id handler
  async getAlbumByIdHandler(req, h) {
    try {
      const { id } = req.params;
      const album = await this._service.getAlbumById(id);

      const response = h.response({
        status: 'success',
        data: {
          album,
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

  // put handler
  async putAlbumByIdHandler(req, h) {
    try {
      this._validator.validateAlbumPayload(req.payload);
      const { id } = req.params;

      await this._service.editAlbum(id, req.payload);

      const response = h.response({
        status: 'success',
        message: 'Album berhasil diperbarui',

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

  // delete handler
  async deleteAlbumByIdHandler(req, h) {
    try {
      const { id } = req.params;
      await this._service.deleteAlbum(id);

      const response = h.response({
        status: 'success',
        message: 'Album berhasil dihapus',

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

module.exports = AlbumHandler;
