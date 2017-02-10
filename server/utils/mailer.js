import mailer from 'express-mailer';
import path from 'path';

export default function mailSender(app, express, rootDir) {

  mailer.extend(app, {
    from: 'no-reply@divvy-app.com',
    host: 'smtp.gmail.com', // hostname
    secureConnection: true, // use SSL
    port: 465, // port for secure SMTP
    transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
    auth: {
      user: 'divvyappmailer@gmail.com',
      pass: 'divvyappmailer1'
    }
  });

  app.set('views', path.join(rootDir, 'views'));
  app.set('view engine', 'ejs');

  // MAILER ROUTING

  app.post('/mail', function(req, res, next) {
    // for each person in the bill's info array...
    req.body.info.forEach(function(person) {
      if (person.name !== req.body.owner) {
        // send an email to them telling them they owe money
        app.mailer.send('email', {
          to: person.email, // REQUIRED. This can be a comma delimited string just like a normal email to field. 
          subject: 'A Payment Owed Reminder from Divvy!', // REQUIRED.
          otherProperty: 'Other Property', // All additional properties are also passed to the template as local variables.
          name: person.name,
          owner: req.body.owner,
          restaurant: req.body.restaurant || 'some place',
          split: person.total
        }, function (err) {
          if (err) {
            // handle error
            console.log(err);
            res.send('There was an error sending the email');
            return;
          }
          res.send('Email Sent');
        });
      }
      
    })
  });

}
