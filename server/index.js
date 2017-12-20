var path = require("path");
var express = require("express");
var fs = require('fs');
var bodyParser = require('body-parser');
var http = require('http');
var https = require('https');
var routes = require('./api/routes/index');
var swaggerJSDoc = require('swagger-jsdoc');
var swaggerTools = require('swagger-tools');

var app = express();

//Serving files
var app_path = path.resolve(path.resolve(__dirname), '../src');
var build_path = path.resolve(path.resolve(__dirname), '../build');
app.use(express.static(app_path));
app.use(express.static(build_path));
app.use(bodyParser.json()); // To support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // To support URL-encoded bodies

//Swagger Definition
var swaggerDefinition = {
  info: { // API informations (required)
    title: '智能合约', // Title (required)
    version: '0.1.0', // Version (required)
    description: '智能合约调用接口', // Description (optional)
  },
  host: 'localhost:3000', // Host (optional)
  basePath: '/', // Base path (optional)
};

var options = {
  swaggerDefinition: swaggerDefinition,
  apis: ['./server/api/routes/*.js']
};

var swaggerSpec = swaggerJSDoc(options);

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerSpec, (middleware) => {
  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  // app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  // app.use(middleware.swaggerRouter({
  //   controllers: './server/api/controllers',
  //   useStubs: process.env.NODE_ENV === 'development' ? true : false // Conditionally turn on stubs (mock mode)
  // }));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());

  app.use('/', routes);

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  //Start http server
  //设置http端口号
  var PORT = 3000;
  //创建http服务器
  var httpServer = http.createServer(app).listen(PORT, function onStart(err) {
    if (err) {
      console.log(err);
    }
    var host = httpServer.address().address;
    var port = httpServer.address().port;
    console.info('==> Listening on port %s. Open up http://%s:%s/ in your browser.', port, host, port);
  });

  //Start https server
  //导入证书文件
  var key  = fs.readFileSync(path.join(__dirname, './ssl/key.pem'), 'utf8');
  var cert = fs.readFileSync(path.join(__dirname, './ssl/cert.pem'), 'utf8');
  var ca = fs.readFileSync(path.join(__dirname, './ssl/certrequest.csr'), 'utf8');
  var options = {key : key, cert : cert, ca : ca}
  //设置https端口号
  var SSLPORT = 3443;
  //创建https服务器
  var httpsServer = https.createServer(options, app).listen(SSLPORT, function() {
    var host = httpsServer.address().address;
    var port = httpsServer.address().port;
     console.info('==> Listening on port %s. Open up https://%s:%s/ in your browser.', port, host, port);
  });
});
