var async = require('async');
var helper = require('sendgrid').mail;
var fromEmail = new helper.Email('test@ason.sgncsfn9.aodaruma.com');
var subject = 'こんにちは';
var content = new helper.Content('text/plain', 'こんにちは');

async.parallel([
  function (callback) {
    console.log('parallel 1');
    var mail = new helper.MailU();
    mail.setFrom(fromEmail);
    mail.setSubject(subject);
    personalization = new helper.Personalization();
    toEmail = new helper.Email('wataru@kke.co.jp');
    personalization.addTo(toEmail);
    mail.addPersonalization(personalization);

    var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
    var request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON()
    });
    sg.API(request, function(error, response) {
      if (error) {
        console.log('Error response received');
      }
      console.log(response.statusCode);
      console.log(response.body);
      console.log(response.headers);
    });
  },
  function (callback) {
    console.log('parallel 2');
    setTimeout(function () {
      console.log('parallel 2 done.');
      callback(null, 2);
    }, 500);
  },
  function (callback) {
    console.log('parallel 3');
    setTimeout(function () {
      console.log('parallel 3 done.');
      callback(null, 3);
    }, 500);
  }
]);

console.log('done.');
