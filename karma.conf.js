// Karma configuration

console.log('IN KARMA FILE');

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',

    // testing frameworks to use
    frameworks: ['mocha', 'chai', 'sinon'],

    // list of files / patterns to load in the browser. order matters!
    files: [
      // angular source
      'client/app/bower_components/angular/angular.js',
      'client/app/bower_components/angular-loader/angular-loader.js',
      'client/app/bower_components/angular-mocks/angular-mocks.js',
      'client/app/bower_components/angular-route/angular-route.js',
      'client/app/bower_components/ng-file-upload/ng-file-upload.js',
      'client/app/bower_components/angular-middleware/angular-middleware.js',
      'client/app/bower_components/angular-middleware/dist/angular-middleware.js',
      'client/app/bower_components/angular-bootstrap/ui-bootstrap.js',
      'client/app/bower_components/angular-slick-carousel/src/slick.js',

      // our app code
      'client/app/app.js',
      'client/app/add-items/*.js',
      'client/app/auth/*.js',
      'client/app/add-friend/add-friend.component.js',

      'client/app/services/*.js',
      'client/app/split/*.js',
      'client/app/upload-bill/upload-bill.component.js',
      'client/app/user-details/*.js',


      // 'client/app/**/*.js',

      // our spec files - in order of the README
      // 'specs/client/AddItemCtrlSpec.js',
      'specs/client/SplitCtrlSpec.js'
    ],

    // test results reporter to use
    reporters: ['progress'],

    // start these browsers. PhantomJS will load up in the background
    browsers: ['PhantomJS'],

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // if true, Karma exits after running the tests.
    singleRun: true

  });
};
