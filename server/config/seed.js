/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import sqldb from '../sqldb';
var Thing = sqldb.Thing;
var User = sqldb.User;

Thing.sync()
  .then(() => Thing.destroy({ where: {} }))
  .then(() => {
    Thing.bulkCreate([{
      name: 'Hungry Henry',
      info: 'Likes to eat'
    }, {
      name: 'Two Timing Tim',
      info: 'Will never pay you back'
    }, {
      name: 'Cheap Chuck',
      info: 'Just dont mess with his dollar menu'
    }, {
      name: 'Starvin Marvin',
      info: 'The one the only'
    }, {
      name: 'Larry the Lush',
      info: 'Its noon, that means Larry is drunk'
    }, {
      name: 'Bob',
      info: 'Sits and stares'
    }]);
  });

User.sync()
  .then(() => User.destroy({ where: {} }))
  .then(() => {
    User.bulkCreate([{
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    }])
    .then(() => {
      console.log('finished populating users');
    });
  });
