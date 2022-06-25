require('dotenv').config();

const Hapi = require('@hapi/hapi');
const albums = require('./music/album');
const songs = require('./music/song');

// const AlbumService = require('./service/inMemory/albumService');
// const SongService = require('./service/inMemory/songService');

const AlbumService = require('./service/postgres/albumService');
const SongService = require('./service/postgres/songService');

const AlbumValidator = require('./validator/album');
const SongValidator = require('./validator/song');

const init = async () => {
  // const albumService = new AlbumService();

  const albumService = new AlbumService();
  const songService = new SongService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  // register plugin
  await server.register(
    [
      {
        plugin: albums,
        options: {
          service: albumService,
          validator: AlbumValidator,
        },

      },
      {
        plugin: songs,
        options: {
          service: songService,
          validator: SongValidator,
        },

      },
    ],
  );

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
