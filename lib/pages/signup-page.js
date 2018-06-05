import config from '../../config/config.js'

export default class Signup {

    constructor(page) {
        this.page = page;
        this.getStartedLink = '#hero-cta';
        this.siteTitle = '#siteTitle';
        this.siteTopic = '#siteTopic';
        this.submitStep1 = '.about__submit-wrapper button.is-primary';
        this.registerDomain = '.register-domain-step';
        this.nameSearch = '.search__input';
        this.domainPlaceholder = '.domain-suggestion.is-placeholder';
        this.suggestedWPcomResult = '.domain-search-results__domain-suggestions > .domain-suggestion.is-clickable';
        this.freePlanButton = '.plans-skip-button .button';
        this.signupForm = '.signup-form';
        this.signupEmail = '#email';
        this.signupPassword = '#password';
        this.submitStep4 = '.signup-form__submit';
        this.signupProcessing = '.signup-processing__content';
        this.signupNotice = '.notice';
        this.confirmEmail = '.email-confirmation__button';
        this.trampolineStep = '.trampoline-step';
    }

    async step1(title, topic) {
        await this.page.click(this.getStartedLink);
        await this.page.waitForNavigation();
        await this.page.waitForSelector(this.siteTitle, { visible: true });
        await this.page.type(this.siteTitle, title);
        await this.page.type(this.siteTopic, topic);
    }

    async step2(title) {
        await this.page.click(this.submitStep1);
        await this.page.waitForNavigation();
        await this.page.waitForSelector(this.registerDomain, { visible: true });
        await this.page.type(this.nameSearch, title);
        await this.page.waitForSelector(this.domainPlaceholder, { hidden: true });
    }

    async step3() {
        await this.page.click(this.suggestedWPcomResult);
        await this.page.waitForSelector(this.freePlanButton, { visible: true });
    }

    async step4(title) {
        await this.page.click(this.freePlanButton);
        await this.page.waitForSelector(this.signupForm, { visible: true });
        const emailAddress = `${title}.${config.signupInboxId}@mailosaur.io`;
        const newPassword = config.passwordForNewTestSignUps;
        await this.page.type(this.signupEmail, emailAddress);
        await this.page.type(this.signupPassword, newPassword);
    }

    async processSignup() {
        await this.page.click(this.submitStep4);
        await this.page.waitForSelector(this.signupProcessing, { visible: true });
        await this.page.waitForSelector(this.signupNotice, { visible: true });
        await this.page.waitForSelector(this.confirmEmail, { visible: true });
    }

    async createSite() {
        await this.page.click(this.confirmEmail, { delay: 5000 });
        await this.page.waitForSelector(this.confirmEmail, { hidden: true });
        await this.page.waitForSelector(this.trampolineStep, { visible: true });
    }

}