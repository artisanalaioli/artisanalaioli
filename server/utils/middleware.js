import flash from 'connect-flash';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import passport from 'passport';

export default function middleware(app, express) {
  app.use(express.static(__dirname + '/../../client/app'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(session({ secret: 'keyboardCat' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
}
