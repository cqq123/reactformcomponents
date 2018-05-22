module.exports = {
  webpack: './webpack.dev.js',
  paths: {
    '/upload': {
      method: 'post',
      success: ({ proxy, req }) => {
        console.log('xixixi');
        console.log(req.headers['content-type']);
        proxy('http://huzhihui.iask.in/messageRecord/uploadFile', {
          headers: {
            'content-type': req.headers['content-type'],
            Host: 'huzhihui.iask.in',
          },
        });
        // proxy('http://192.168.0.123:8080/pattern/pattern/upload');
      },
    },
  },
};
