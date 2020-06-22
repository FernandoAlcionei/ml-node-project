const app = require("express")(),
  bodyParser = require("body-parser"),
  consign = require('consign'),
  config = require('./config'),
  http = require('http').Server(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '500mb' }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

consign({ cwd : 'app' })
  .then('util')  
  .then('api')
	.then('routes')
  .into(app);

http.listen(config.api.port, () => console.log("Express running " + config.api.port));
