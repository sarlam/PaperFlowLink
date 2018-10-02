const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@engine': path.resolve(__dirname, 'src/engine/'),
      '@example': path.resolve(__dirname, 'src/example/')
    }
  }
};
