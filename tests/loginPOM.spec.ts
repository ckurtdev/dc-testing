import { test, expect, Locator, Page } from '@playwright/test';
import { DCLogin } from '../pageObjectModels/dc-login';
import {DCHome} from '../pageObjectModels/dc-home'
import baseConfig from '../configs/playwright.config.base';

const credentials = {
    email: 'ckurt@drivers-check.de',
    password: 'Bananarama'
};

test.describe('Admin Monitor Login Tests', () => {
    const {email, password} = credentials
    console.log(baseConfig.use?.baseURL!)
    test('Login Test', async ({ page }: {page: Page}) => {
        const loginPage = new DCLogin(page, baseConfig.use?.baseURL!)
        await loginPage.goto()
        loginPage.page.waitForLoadState('domcontentloaded')
        await loginPage.login(email, password)
        
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
        await page.goto(baseURL + '/Organisations');
        await expect(page).toHaveURL('https://admin.drivers-check.de/Login');
    });
});
