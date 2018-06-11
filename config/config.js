require('dotenv').config();

module.exports = {
    calypsoBaseUrl: 'https://wordpress.com/',

    headless: false,

    mochaTimeout: 30000,

    testUserName: process.env.testUserName || '',

    testPassword: process.env.testPassword || '',

    mailosaurApiKey: process.env.mailosaurAPIKey || '',

    signupInboxId: process.env.signupInboxId || '',

    passwordForNewTestSignUps: process.env.passwordForNewTestSignUps || '',

    outputTarget: 'local', //'local' or 'WPCOM'

    outputWordPressName: process.env.outputWordPressName || '',

    outputWordPressAPIKey: process.env.outputWordPressAPIKey || ''
}