import {test, expect, Locator, Page} from '@playwright/test';
import { DCLogin } from '../pageObjectModels/dc-login';
import { DCHome } from '../pageObjectModels/dc-home';

const credentials = {
    email: 'ckurt@drivers-check.de',
    password: 'Bananarama'
};

test.describe('Org Menu Test', () => {
    const {email, password} = credentials
    test('show Org Dashboard', async ({ page }: {page: Page}): Promise<void> => {
        const loginPage = new DCLogin(page);
        await loginPage.goto()
        await loginPage.login(email, password)

        const homePage = new DCHome(loginPage.page)
        await homePage.page.waitForLoadState('domcontentloaded')
        await expect(homePage.orgMenu).toBeVisible({ timeout: 30000 });
        await homePage.openOrgMenu()

        await page.waitForSelector(`[data-org-id="9828"]`, { state: 'visible', timeout: 10000 })
        const listItem = page.locator(`[data-org-id="9828"]`)
        await expect(listItem).toBeVisible();

        const innerText = await homePage.extractDirectTextFromAnchor(page, "9828")
        await listItem.click();
        
        const orgHeader: Locator = page.getByRole("heading").locator('small').getByText(innerText!);
        await expect(orgHeader).toBeVisible();
    });
});