// eslint-disable-next-line func-names
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            api: './api',
            assets: './assets',
            theme: './theme',
            components: './components',
            screens: './screens',
            navigation: './navigation',
            test: './test',
            utils: './utils'
          }
        }
      ]
    ]
  };
};
