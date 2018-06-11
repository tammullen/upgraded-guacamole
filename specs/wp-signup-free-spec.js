import * as coverageHelper from '../lib/coverage-helper.js';
import config from '../config/config.js';
import Signup from '../lib/pages/signup-page.js';
import puppeteer from 'puppeteer';

describe('Signup Tests', function () {

    this.timeout(config.mochaTimeout);
    let browser;
    let page;
    let HTMLCoverageReport='';
    let blogTitle;

    before(async function () {
        browser = await puppeteer.launch({ headless: config.headless });
        page = await browser.newPage();

        const timestamp = Date.now();
        blogTitle = `coveragePoC${timestamp}`;
    });

    after(async function () {
        await browser.close();

        coverageHelper.outputCoverage('wp-signup-free-spec', HTMLCoverageReport);
    });

    it('Launch Calypso', async function () {
        await coverageHelper.startCoverage(page);

        await page.goto(config.calypsoBaseUrl);
        await page.evaluate(() => { localStorage.setItem('ABTests', '{"checklistThankYouForFreeUser_20171204":"hide"}'); });

        HTMLCoverageReport = await coverageHelper.stopCoverage(page, HTMLCoverageReport, 'Launch WordPress.com home');
    })

    it('Get Started Step 1', async function () {
        await coverageHelper.startCoverage(page);

        let signupPage = new Signup(page);
        await signupPage.step1(blogTitle,'Electrician');

        HTMLCoverageReport = await coverageHelper.stopCoverage(page, HTMLCoverageReport, 'Get Started Step 1');
    })

    it('Get Started Step 2', async function () {
        await coverageHelper.startCoverage(page);

        let signupPage = new Signup(page);
        await signupPage.step2(blogTitle);

        HTMLCoverageReport = await coverageHelper.stopCoverage(page, HTMLCoverageReport, 'Get Started Step 2');
    })

    it('Get Started Step 3', async function () {
        await coverageHelper.startCoverage(page);

        let signupPage = new Signup(page);
        await signupPage.step3();

        HTMLCoverageReport = await coverageHelper.stopCoverage(page, HTMLCoverageReport, 'Get Started Step 3');
    })

    it('Get Started Step 4', async function () {
        await coverageHelper.startCoverage(page);

        let signupPage = new Signup(page);
        await signupPage.step4(blogTitle);

        HTMLCoverageReport = await coverageHelper.stopCoverage(page, HTMLCoverageReport, 'Get Started Step 4');
    })

    it('Signup Processing', async function () {
        await coverageHelper.startCoverage(page);

        let signupPage = new Signup(page);
        await signupPage.processSignup();

        HTMLCoverageReport = await coverageHelper.stopCoverage(page, HTMLCoverageReport, 'Signup Processing Page');
    })

    it('New Site Created', async function () {
        await coverageHelper.startCoverage(page);

        let signupPage = new Signup(page);
        await signupPage.createSite();

        HTMLCoverageReport = await coverageHelper.stopCoverage(page, HTMLCoverageReport, 'New Site Created');
    })

})