var config = {
  api: {
    port: '5000',
  },
  integration: {
    uri: 'https://api.mercadolibre.com',
    api: {
      search: '/sites/MLA/search',
      productDetails: '/items',
      descriptions: '/descriptions',
    }
  }
};

module.exports = config;
