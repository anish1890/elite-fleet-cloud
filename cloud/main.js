const mailgun = require('mailgun-js');

const mailgunDomain = 'sandboxbxac4b67d652348a9a1c19564fbb0fdcf.mailgun.org';
const apiKey = 'key-892f4dcf0499ea48ea8eb6b5ce838549';

const mg = mailgun({ apiKey, domain: mailgunDomain });

Parse.Cloud.define('sendEmailNotification', async (request) => {
  const { recipientEmail, subject, message } = request.params;

  const data = {
    from: `Dirty Boat Bottoms <postmaster@${mailgunDomain}>`,
    to: recipientEmail,
    subject,
    text: message
  };

  try {
    await new Promise((resolve, reject) => {
      mg.messages().send(data, (error, body) => {
        if (error) return reject(error);
        resolve(body);
      });
    });

    return 'Email sent successfully!';
  } catch (error) {
    throw new Error(`Email sending failed: ${error.message}`);
  }
});
