module.exports = {
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      const [obj] = args; // 陣列解構
      obj.title = '60 Movie Poster'; // 頁籤名稱設定 (每一頁)
      obj.meta = [
        { description: 'Curated Collections of Movie Posters.' },
        {
          property: 'og:title',
          content: '60 Movie Poster',
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:url',
          content: 'https://github.com/umon752/60MoviePoster',
        },
        {
          property: 'og:description',
          content: 'Curated Collections of Movie Posters.',
        },
      ];
      return args;
    });
  },

  publicPath: '/60MoviePoster/',
};
