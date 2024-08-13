import {test, expect, Locator, Page} from '@playwright/test';
import { DCLogin } from '../pageObjectModels/dc-login';
import { DCHome } from '../pageObjectModels/dc-home';

const credentials = {
    email: 'ckurt@drivers-check.de',
    password: 'Bananarama123!'
};

test.describe('Org Menu Test', () => {
    const {email, password} = credentials
    let page: Page
    let loginPage: DCLogin
    let homePage: DCHome
    let selectedOrg :string

    test.beforeEach(async({browser}) => {
        page = await browser.newPage();
        loginPage = new DCLogin(page)
        homePage = new DCHome(page)
    })

    test('show Org Dashboard', async (): Promise<void> => {
        await loginAndOpenMenu()
        await selectOrg("9828")
        await verifySuccessfulSelect()
    });

    async function loginAndOpenMenu(){
        await loginPage.login(email, password)
        await page.waitForLoadState('domcontentloaded')
        await verifySuccessfulLogin()
        await homePage.openOrgMenu()
        await page.waitForLoadState('networkidle')
    }

    async function selectOrg(id:string) {
        const listItem = page.locator(`[data-org-id="${id}"]`)
        selectedOrg = await homePage.extractDirectTextFromAnchor(page, id, listItem)
        await listItem.click();
    }

    async function verifySuccessfulLogin() {
        const dashboardLocator: Locator = page.getByRole('heading', { name: ' Dashboard DriversCheck GmbH' }).locator('small');
        await expect(dashboardLocator).toBeVisible();
    }

    async function verifySuccessfulSelect() {
        const orgHeader: Locator = page.getByRole("heading").locator('small').getByText(selectedOrg!);
        await expect(orgHeader).toBeVisible();
    }
});