module.exports = (app) => {
  const { api } = app;

  app.get('/api/items', api.product.getList);

  app.get('/api/items/:id', api.product.getDetails);

}