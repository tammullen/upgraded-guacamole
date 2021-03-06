import config from '../config/config.js';

const emailWaitMS = config.get('emailWaitMS');

export default class EmailClient {
    constructor(mailboxId) {
        const apiKey = config.mailosaurApiKey;
        const Mailosaur = require('mailosaur')(apiKey, 'https://mailosaur.com/api/');
        this.mailbox = new Mailosaur.Mailbox(mailboxId);
    }

    /**
     * Load emails for specific email address.
     * It is possible to pass an optional function which will return list of emails only if validator will return "true"
     * It's possible to pass a function to validate received emails. For example when you waiting for specific email - validator may check if expected email is present
     * @param {string} emailAddress - Email address from where to get emails
     * @param {function} validator - Optional function to validate received emails
     * @returns {Object} - Returns `object`
     */
    async pollEmailsByRecipient(emailAddress, validator = () => true) {
        const intervalMS = 1500;
        let retries = emailWaitMS / intervalMS;
        let emails;

        while (retries > 0) {
            emails = await this.mailbox.getEmailsByRecipient(emailAddress);
            if (validator(emails)) {
                return emails;
            }
            await this.resolveAfterTimeout(intervalMS);
            retries--;
        }
        throw new Error(`Could not locate email for '${emailAddress}' in '${emailWaitMS}'ms`);
    }

    resolveAfterTimeout(timeout) {
        return new Promise(resolved => {
            setTimeout(() => {
                resolved('resolved');
            }, timeout);
        });
    }
}