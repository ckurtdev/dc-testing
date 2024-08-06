import {expect, type Locator, type Page} from '@playwright/test';

export class DCHome{
    readonly page: Page;
    readonly orgMenu: Locator;
    readonly userMenu: Locator;
    readonly newsMenu: Locator;
    readonly moduleMenu: Locator;
    readonly languageMenu: Locator;
    readonly dashboardLink: Locator;
    readonly orgLink: Locator;
    readonly employeeMenu: Locator;
    readonly moduleLink: Locator;
    readonly escalationLink: Locator;
    readonly reportingMenu: Locator;
    readonly administrationMenu: Locator;
    readonly featureVotingLink: Locator;
    readonly helpCenterLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.orgMenu = page.getByTestId('org-selecion')
        this.userMenu = page.getByRole('link', { name: ' Cihan Kurt ' })
        this.newsMenu = page.locator('a', {hasText: "Neuigkeiten"})
        this.moduleMenu = page.locator('a', {hasText: "Führerscheinkontrolle"})
        this.languageMenu = page.locator('a', {hasText: "Deutsch"})
        this.dashboardLink = page.locator('a', {hasText: "Dashboard"})
        this.orgLink = page.locator('a', {hasText: "Organisationen"})
        this.employeeMenu = page.locator('a', {hasText: "Mitarbeiter"})
        this.moduleLink = page.locator('a', {hasText: "Führerscheinkontrollen"})
        this.escalationLink = page.locator('a', {hasText: "Eskalationen"})
        this.reportingMenu = page.locator('a', {hasText: "Berichtswesen"})
        this.featureVotingLink = page.locator('a', {hasText: "Feature Voting"})
        this.helpCenterLink = page.locator('a', {hasText: "Help Center"})
    }

    // Open Menu's
    async openOrgMenu() {
        await this.page.waitForLoadState("domcontentloaded")
        await this.orgMenu.click()
    }

    async openUserMenu() {
        await this.userMenu.click()
    }

    async openEmplyoeeMenu(){
        await this.employeeMenu.click()
    }

    async openReportingMenu(){
        await this.reportingMenu.click()
    }

    async openAdministrationMenu(){
        await this.administrationMenu.click()
    }

    // open Pages
    async gotoOrgSearch() {
        await this.openOrgMenu()
        this.page.locator('a', {hasText: "Organisation suchen"})
    }

    async logOut(){
        await this.openUserMenu()
        await this.page.getByRole('link', { name: ' Abmelden' }).click();
    }

    // actions
    async  extractDirectTextFromAnchor(page: Page, orgId: string) {
        const listItem = page.locator(`[data-org-id="${orgId}"]`);
        
        const directText = await listItem.evaluate((element) => {
          const anchor = element.querySelector('a');
          if (!anchor) return null;
          
          const clone = anchor.cloneNode(true) as HTMLElement;
          
          while (clone.firstChild) {
            clone.removeChild(clone.firstChild);
          }
          
          return clone.textContent?.trim();
        });
      
        return directText || '';
      }
}