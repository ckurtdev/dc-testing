import { type Locator, type Page } from '@playwright/test';
import OrgData from '../tests/test-types';

export class DCOrganizations {
    readonly page: Page;
    readonly newOrgButton: Locator;
    readonly searchInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.newOrgButton = page.locator('a[href="/Organisations/new"]');
        this.searchInput = page.locator('input[type="search"]');
    }

    async createOrg(orgData: OrgData) {
        await this.newOrgButton.click();
        await this.page.locator('#name').fill(orgData.orgName);
        await this.page.locator('#billRecipient').fill(orgData.billRecipient);
        await this.page.locator('#benefitRecipient').fill(orgData.benefitRecipient);
        await this.page.locator('#street').fill(orgData.street);
        await this.page.locator('#zip').fill(orgData.zip);
        await this.page.locator('#city').fill(orgData.city);
        await this.page.locator('#externalOrgId').fill(orgData.externalOrgId);
        await this.page.locator('#billEmail').fill(orgData.billEmail);
        await this.page.locator('button[type="submit"]').click();
    }

    async searchOrg(orgName: string) {
        await this.searchInput.fill(orgName);
    }

    async deleteOrg(orgName: string, password: string) {
        await this.page.locator(`td:has-text("${orgName}")`).click();
        await this.page.locator('a[href*="/Organisations/delete"]').click();
        await this.page.locator('input[type="password"]').fill(password);
        await this.page.locator('button[type="submit"]').click();
    }
}