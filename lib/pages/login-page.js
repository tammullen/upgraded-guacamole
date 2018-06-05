import config from '../../config/config.js'

export default class Login {

    constructor(page) {
        this.page = page;
        this.username = '#usernameOrEmail';
        this.usernameSubmit = '#wp-submit, button[type="submit"]';
        this.password = '#password';
        this.loginSubmit = '#wp-submit, button[type="submit"]';
        this.readerHome = '.following.main';
        this.mySitesLink = '[data-tip-target=my-sites]';
    }

    async enterUsername() {
        await this.page.type(this.username, config.testUserName);
        await this.page.click(this.usernameSubmit);
    }

    async enterPassword() {
        await this.page.waitForSelector(this.password, { visible: true });
        await this.page.type(this.password, config.testPassword);
    }

    async submitLoginForm() {
        await this.page.click(this.loginSubmit);
        await this.page.waitForSelector(this.readerHome, { visible: true });
        await this.page.waitForSelector(this.mySitesLink, { visible: true });
    }

}