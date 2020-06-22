const { integration } = require('../../config');

const getCondition = (attributes) => {
  const item = attributes.find(attribute => attribute.id == 'ITEM_CONDITION');
  return item ? item.value_name: '';
}

const getDescription = (descriptions) => {
  if (descriptions && descriptions.length) {
    return descriptions[0].plain_text;
  }

  return '';
}

module.exports = (app) => {
  const { util } = app;
  const api = {};

  api.getList = (req, res) => {
    const { search } = req.query;
    const searchField = search ? search : 'query';

    const productsApi = `${integration.api.search}?q=${searchField}`;

    util.request.httpGet(integration.uri, productsApi).then((response) => {
      const items = response.results.map(product => ({
        id: product.id,
        title: product.title,
        price: {
          currency: product.currency_id,
          amount: product.price,
          //Não consegui identificar qual propriedade correspondia ao "decimals"
          decimals: 00,
        },
        picture: product.thumbnail,
        condition: getCondition(product.attributes),
        free_shipping: product.shipping.free_shipping,
        state: product.address.state_name
      }));

      res.json({
        //Não consegui identificar quais propriedades correspondia ao "author" e "categories"
        author: {
          name: '',
          lastname: ''
        },
        categories: [],
        items
      })
    }).catch(error => util.callback.error(error, res));
  }

  api.getDetails = (req, res) => {
    const { id } = req.params;

    const productApi = `${integration.api.productDetails}/${id}`;
    const descriptionsApi = productApi + integration.api.descriptions

    const promisseProduct = util.request.httpGet(integration.uri, productApi);
    const promisseDescriptions = util.request.httpGet(integration.uri, descriptionsApi);

    Promise.all([promisseProduct, promisseDescriptions]).then((results) => {
      const product = results[0];
      const descriptions = results[1];

      res.json({
        //Não consegui identificar quais propriedades correspondia ao "author"
        author: {
          name: '',
          lastname: ''
        },
        item: {
          id: product.id,
          title: product.title,
          price: {
            currency: product.currency_id,
            amount: product.price,
            decimals: 00,
          },
          picture: product.pictures[0].url,
          condition: getCondition(product.attributes),
          free_shipping: product.shipping.free_shipping,
          sold_quantity: product.sold_quantity,
          description: getDescription(descriptions)
        }
      })
    }).catch(error => util.callback.error(error, res));
  }

  return api;
}