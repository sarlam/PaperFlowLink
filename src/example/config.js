export default {
  site: {
    title: 'Paper Flow Link Example Site',
    dataTypes: [
      {
        name: 'quotes',
        type: 'text', // defines types
        contentKey: 'text',
        isHTML: true,
        sizes: {
          WIDTH: 275
          // HEIGHT: 300
        }
      }
    ]
  },
  modules: [
    {
      name: 'readme',
      config: {
        // default to site.title
        name: 'Hello There',
        descrition: 'Some Markdown'
      }
    },
    {
      name: 'menu',
      config: [
        {
          y: '0',
          name: 'Genre',
          title: 'Le genre n\'est pas binaire'
        },
        {
          y: '800',
          name: 'Féminisme',
          title: 'Nous sommes tous féministes'
        },
        {
          y: '1400',
          name: 'Le Langage',
          title: 'L\'importance du langage et de rendre ces "autres" visisble'
        },
        {
          y: '1770',
          name: 'Cyborg',
          title: 'Le cyborg comme figure post-genre'
        }
      ]
    }
  ],
  paperArea: {
    // optional default 'paper-wrapper'
    id: '',
    MAX_X: 150,
    units: {
      media: 'px',
      pos: {
        X: 'vw',
        Y: 'vh'
      }
    },
    sizes: {
      img: {
        MAX_WIDTH: 700,
        MAX_HEIGHT: 1000
      },
      quotes: {
        WIDTH: 275
      },
      videos: {
        WIDTH: 700
      }
    }
  }
};
