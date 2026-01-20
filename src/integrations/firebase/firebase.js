const admin = require('firebase-admin');
const path = require('path');
const logger = require('../../config/logger');

// Path to your service account key JSON file (ensure this file is added to .gitignore)
const serviceAccountPath = path.resolve(__dirname, '../../secrets/firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountPath),
});

/**
 * Firebase Cloud Messaging helper.
 * @param {string|string[]} tokenOrTopic - Device token(s) or a topic (e.g. '/users')
 * @param {object} payload - { title, body, data }
 */
async function sendNotification(tokenOrTopic, payload) {
  try {
    const message = {
      token: typeof tokenOrTopic === 'string' && !tokenOrTopic.startsWith('/') ? tokenOrTopic : undefined,
      topic: typeof tokenOrTopic === 'string' && tokenOrTopic.startsWith('/') ? tokenOrTopic.slice(1) : undefined,
      notification: {
        title: payload.title,
        body: payload.body,
      },
      data: payload.data || {},
    };

    const response = await admin.messaging().send(message);
    logger.info('FCM notification sent', { tokenOrTopic, response });
    return response;
  } catch (err) {
    logger.error('FCM notification error', { err });
    throw err;
  }
}

module.exports = { sendNotification };
