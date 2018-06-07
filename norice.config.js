const request = module.require('request');

module.exports = {
  webpack: require('./webpack.dev.js'),
  api: {
    '/aa': {
      body: { name: 'aaaS' },
    },
    '/upload': {
      post: {
        body: (ctx) => {
          const stream = request.post({
            url: 'http://192.168.0.106:8080/pattern/pattern/upload',
          });
          stream.on('error', () => {});
          return ctx.req.pipe(stream);
        },
      },
    },
  },
};
