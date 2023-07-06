const path = require('path');

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      '@blocks': path.resolve(__dirname, 'src/blocks/'),
      '@components': path.resolve(__dirname, 'src/components/'),
      '@hooks': path.resolve(__dirname, 'src/hooks/'),
      '@interface': path.resolve(__dirname, 'src/interface/'),
      '@type': path.resolve(__dirname, 'src/type/'),
      '@utils': path.resolve(__dirname, 'src/utils/'),
    },
  };

  return config;
};
