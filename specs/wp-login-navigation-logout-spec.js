import * as coverageHelper from '../lib/coverage-helper.js';
import config from '../config/config.js';
import LandingPage from '../lib/pages/landing-page.js';
import Login from '../lib/pages/login-page.js';
import Navigation from '../lib/pages/navigation-page.js';
import puppeteer from 'puppeteer';

describe('Login / Logout Tests', function () {

    this.timeout(config.mochaTimeout);
    let browser;
    let page;
    let HTMLCoverageReport='';

    before(async function () {
        browser = await puppeteer.launch({ headless: config.headless });
        page = await browser.newPage();
    });

    after(async function () {
        await browser.close();

        coverageHelper.outputCoverage('wp-login-navigation-logout-spec', HTMLCoverageReport);
    });

    it('Launch Calypso', async function () {
        await coverageHelper.startCoverage(page);

        await page.goto(config.calypsoBaseUrl);

        HTMLCoverageReport = await coverageHelper.stopCoverage(page, HTMLCoverageReport, 'Launch WordPress.com home');
    })

    it('Login by Username', async function () {
        await coverageHelper.startCoverage(page);

        let landingPage = new LandingPage(page);
        await landingPage.clickLogin();

        let loginPage = new Login(page);
        await loginPage.enterUsername();
        await loginPage.enterPassword();

        HTMLCoverageReport = await coverageHelper.stopCoverage(page, HTMLCoverageReport, 'Navigate to Login');

        await coverageHelper.startCoverage(page);

        await loginPage.submitLoginForm();

        HTMLCoverageReport = await coverageHelper.stopCoverage(page, HTMLCoverageReport, 'Login by Username');
    })

    it('Load My Sites from Reader', async function () {
        await coverageHelper.startCoverage(page);

        let navigationPage = new Navigation(page);
        await navigationPage.loadMySite();

        HTMLCoverageReport = await coverageHelper.stopCoverage(page, HTMLCoverageReport, 'Load my Site from reader');
    })

    it('Load My Profile', async function () {
        await coverageHelper.startCoverage(page);

        let navigationPage = new Navigation(page);
        await navigationPage.loadMyProfile();

        HTMLCoverageReport = await coverageHelper.stopCoverage(page, HTMLCoverageReport, 'Load my Profile');
    })

    it('Logout', async function () {
        await coverageHelper.startCoverage(page);

        let navigationPage = new Navigation(page);
        await navigationPage.logOut();

        HTMLCoverageReport = await coverageHelper.stopCoverage(page, HTMLCoverageReport, 'Logout');
    })
})
