export default class LandingPage {

    constructor(page) {
        this.page = page;
        this.loginLink = '#navbar-login-link';
        this.loginForm = '.login__form';
    }

    async clickLogin() {
        await this.page.click(this.loginLink);
        await this.page.waitForNavigation();
        await this.page.waitForSelector(this.loginForm, { visible: true });
    }

}