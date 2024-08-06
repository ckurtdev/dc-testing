import { test, expect, Locator, Page } from '@playwright/test';
import { DCLogin } from '../pageObjectModels/dc-login';
import {DCHome} from '../pageObjectModels/dc-home'

const credentials = {
    email: 'ckurt@drivers-check.de',
    password: 'Bananarama'
};

test.describe('Admin Monitor Login Tests', () => {
    const {email, password} = credentials
    test('Login Test', async ({ page }: {page: Page}) => {
        const loginPage = new DCLogin(page)
        await loginPage.goto()
        loginPage.page.waitForLoadState('domcontentloaded')
        await loginPage.login(email, password)
        loginPage.page.waitForLoadState('load')
        
        // check if successfull
        const dashboardLocator: Locator =  page.getByRole('heading', { name: ' Dashboard DriversCheck GmbH' }).locator('small')
        await expect(dashboardLocator).toBeVisible();
        
        //logout
        const homePage = new DCHome(page)
        await homePage.logOut()
        const loginLocator: Locator = page.getByRole('heading', { name: 'Anmeldung zum AdminMonitor' });
        await expect(loginLocator).toBeVisible();
    });
    
    test('Unathorized Test', async ({ page }: {page: Page}) => {
        await page.goto('https://admin.dc.local/Organisations');
        await expect(page).toHaveURL('https://admin.dc.local/Login');
    });
});
