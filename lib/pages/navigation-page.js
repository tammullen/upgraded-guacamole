export default class Navigation {

    constructor(page) {
        this.page = page;
        this.mySitesLink = '[data-tip-target=my-sites]';
        this.mySiteInfo = '.site__info';
        this.myProfileLink = '[data-tip-target=me]';
        this.logOutLink = '.button.sidebar__me-signout-button.is-compact';
        this.logOutPromo = '.feature';
        this.customizerLink = '[data-tip-target=themes]';
        this.customizerIFrameSelector = 'iframe.is-iframe-loaded';
    }

    async loadMySite() {
        await this.page.click(this.mySitesLink);
        await this.page.waitForSelector(this.mySiteInfo, { visible: true });
        await this.page.waitForSelector(this.myProfileLink, { visible: true });
    }

    async loadMyProfile() {
        await this.page.click(this.myProfileLink);
        await this.page.waitForSelector(this.logOutLink, { visible: true });
    }

    async logOut() {
        await this.page.click(this.logOutLink);
        await this.page.waitForSelector(this.logOutPromo, { visible: true });
    }

    async loadCustomizer() {
        await this.page.click(this.customizerLink);
        await this.page.waitForSelector(this.customizerIFrameSelector, { visible: true });
    }
}