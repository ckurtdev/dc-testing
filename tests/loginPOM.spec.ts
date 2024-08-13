import { test, expect, Locator, Page } from '@playwright/test';
import { DCLogin } from '../pageObjectModels/dc-login';
import {DCHome} from '../pageObjectModels/dc-home'

const credentials = {
    email: 'ckurt@drivers-check.de',
    password: 'Bananarama123!'
};

test.describe('Admin Monitor Login Tests', () => {
    const {email, password} = credentials
    let page: Page
    let loginPage: DCLogin
    let homePage: DCHome

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        homePage = new DCHome(page)
        loginPage = new DCLogin(page)
    });

    test('Login Test', async () => {
        await loginAndVerifySuccessfulLogin()
        await logoutAndVerifySuccessfulLogOut()
    });

    test('Unathorized Test', async ({ page }: {page: Page}) => {
        await page.goto('https://admin.dc.local/Organisations');
        await expect(page).toHaveURL('https://admin.dc.local/Login');
    });

    async function loginAndVerifySuccessfulLogin() {
        await loginPage.goto()
        loginPage.page.waitForLoadState('domcontentloaded')
        await loginPage.login(email, password)
        await expect(page.getByRole('heading', { name: ' Dashboard DriversCheck GmbH' }).locator('small')).toBeVisible();
    }

    async function logoutAndVerifySuccessfulLogOut() {
        await homePage.logOut()
        await expect(page.getByRole('heading', { name: 'Anmeldung zum AdminMonitor' })).toBeVisible();
    }
});
