module.exports = (app) => {
    const common = require('../controller/common.controller.js');
    // Send message to facebook
    app.route('/sendToFB')
        .post(common.post_to_facebook);

    // Send message to facebook
    app.route('/translate')
        .post(common.translate);

    // Forwarder webhook registry
    app.route('/forwarder')
        .get(common.verify_token);
}