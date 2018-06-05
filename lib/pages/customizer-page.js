export default class Navigation {

    constructor(frame) {
        this.frame = frame;
        this.openTitleTaglinePanel = '#accordion-section-title_tagline';
        this.blogName = '#_customize-input-blogname';
        this.blogDescription = '#customize-control-blogdescription';
        this.closeTitleTagLinePanel = `.customize-section-back[tabindex='0']`;
        this.closeCustomizerButton = '.customize-controls-close';
    }

    async waitForCustomizer() {
        await this.frame.waitForSelector(this.openTitleTaglinePanel, { visible: true });
    }

    async expandTitleTaglinePanel() {
        await this.frame.click(this.openTitleTaglinePanel);
        await this.frame.waitForSelector(this.blogName, { visible: true });
        await this.frame.waitFor(7000);
        await this.frame.waitForSelector(this.blogDescription, { visible: true });
        await this.frame.waitForSelector(this.closeTitleTagLinePanel, { visible: true });
    }

    async closeTitleTaglinePanel() {
        await this.frame.click(this.closeTitleTagLinePanel);
        await this.frame.waitForSelector(this.openTitleTaglinePanel, { visible: true });
        await this.frame.waitForSelector(this.closeCustomizerButton, { visible: true });
    }

    async closeCustomizer() {
        await this.frame.click(this.closeCustomizerButton);
        await this.frame.waitFor(5000);
    }
}