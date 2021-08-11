module.exports = {
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      const [obj] = args; // 陣列解構
      obj.title = '60 Movie Poster'; // 頁籤名稱設定 (全部)
      obj.meta = [
        { description: 'Curated Collections of Movie Posters.' },
        { keywords: 'Movie, Poster, Classic' },
        { author: 'Yi Chieh' },
        {
          property: 'og:title',
          content: '60 Movie Poster',
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:site_name',
          content: '60 Movie Poster',
        },
        {
          property: 'og:url',
          content: 'https://umon752.github.io/60MoviePoster/',
        },
        {
          property: 'og:image',
          content: 'https://storage.googleapis.com/vue-course-api.appspot.com/umon752/1628672447780.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=A8U3VoF5d4U6FyDLondXlZmK1q%2F%2Fp0jkh7lE8xtiEwBJvyZnTGX0zvNE%2F1oeZ41dtgjtQQJBuGclNXgqO0J4LMGOzGaDklZl0bn1LnmRa%2Bq6qTt1BXgC34u81MOuJ%2FQlTSSdDVYp9VDEVawyOKCc2seszgY0hmZlCn6UnDrV92ZZIBXhP7EOm8ZGyBaMUR6FP%2B89VAkzunEGVDCC2ZduRbG%2BkWwzAa0K2%2FvstKj5l0g2Qgyng5L%2BQzbThWQhHUK60BSLeOY0l84hVBIQ1Dm%2F%2FmmSA%2FrCB3Iku1nyBrzBWDpwUlUFeYLTmYJuplMnAxS72ZhBdcc9TmR7aKKH%2FpoY9A%3D%3D',
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
