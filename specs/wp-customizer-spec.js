import * as coverageHelper from '../lib/coverage-helper.js';
import config from '../config/config.js';
import LandingPage from '../lib/pages/landing-page.js';
import Login from '../lib/pages/login-page.js';
import Navigation from '../lib/pages/navigation-page.js';
import Customizer from '../lib/pages/customizer-page.js';
import puppeteer from 'puppeteer';

describe('Login / Customizer / Logout Tests', function () {

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

        let dt = new Date();
        let utcDate = dt.toUTCString();

        coverageHelper.addWPcomPost(`wp-customizer-spec ${utcDate}`, HTMLCoverageReport);
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

        HTMLCoverageReport = await coverageHelper.stopCoverage(page, HTMLCoverageReport, 'Load My Sites from reader');
    })

    it('Load Customizer', async function () {
        await coverageHelper.startCoverage(page);

        let navigationPage = new Navigation(page);
        await navigationPage.loadCustomizer();

        const customizerIframe = await page.frames().find(f => f.url().includes('customize.php'));    
        let customizerPage = new Customizer(customizerIframe);
        await customizerPage.waitForCustomizer();

        HTMLCoverageReport = await coverageHelper.stopCoverage(page, HTMLCoverageReport, 'Load Customizer');
    })

    it('Expand Customizer Panel', async function () {
        await coverageHelper.startCoverage(page);
        
        const customizerIframe = await page.frames().find(f => f.url().includes('customize.php'));    
        let customizerPage = new Customizer(customizerIframe);
        await customizerPage.expandTitleTaglinePanel();

        HTMLCoverageReport = await coverageHelper.stopCoverage(page, HTMLCoverageReport, 'Expand Customizer Panel');
    })

    it('Close Customizer Panel', async function () {
        await coverageHelper.startCoverage(page);
        
        const customizerIframe = await page.frames().find(f => f.url().includes('customize.php'));    
        let customizerPage = new Customizer(customizerIframe);
        await customizerPage.closeTitleTaglinePanel();

        HTMLCoverageReport = await coverageHelper.stopCoverage(page, HTMLCoverageReport, 'Close Customizer Panel');
    })

    it('Close Customizer', async function () {
        await coverageHelper.startCoverage(page);
        
        const customizerIframe = await page.frames().find(f => f.url().includes('customize.php'));    
        let customizerPage = new Customizer(customizerIframe);
        await customizerPage.closeCustomizer();

        HTMLCoverageReport = await coverageHelper.stopCoverage(page, HTMLCoverageReport, 'Close Customizer');
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