import express from 'express';
import routes from './utils/routes';
import middleware from './utils/middleware';

var app = express();

middleware(app,express);
routes(app, express);

app.listen(3000, function() {
  console.log('listening on port 3000');
});

export { app };
