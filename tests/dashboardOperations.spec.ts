import { test, expect, Locator, Page } from '@playwright/test';
import { DCLogin } from '../pageObjectModels/dc-login';
import { DCHome } from '../pageObjectModels/dc-home';
import OrgData from './test-types.ts';

const credentials = {
    email: 'ckurt@drivers-check.de',
    password: 'Bananarama123!'
};

const orgData: OrgData = {
    orgName: "Playwright Test",
    billRecipient: "Somebody",
    benefitRecipient: "Somebody",
    street: "Somestreet 1337",
    zip: "12345",
    city: "Some City",
    externalOrgId: "SomeId",
    billEmail: "someBill@Email.com"
}

test.describe('Employee Site', () => {
    const {email, password} = credentials
    const employeeName = 'B Tester, Marcel'
    let page: Page;
    let loginPage: DCLogin;
    let homePage: DCHome

    test.beforeEach(async ({ browser }) => {
        page = await browser.newPage();
        loginPage = new DCLogin(page);
        homePage = new DCHome(page)
        await loginPage.login(email, password);
        await verifySuccessfulLogin();
    });

    test('Change Employee Salutation', async () => {
        await homePage.navigateTo(' Mitarbeiter')
        await homePage.navigateTo(' Alle Mitarbeiter')
        await openEmployeeProfile();
        await changeEmployeeBasicData('#salutation');
    });


    test('Add Orga, Delete Orga', async () => {
        await homePage.navigateTo(' Organisationen')
        await createOrg()
        await verifyOrgCreation()
        await deleteTestOrg()
        await verifyDeletion()
    });

    async function createOrg()
    {
        await page.locator('a[href="/Organisations/new"]').click();
        await page.locator('#name').fill(orgData.orgName)
        await page.locator('#billRecipient').fill(orgData.billRecipient)
        await page.locator('#benefitRecipient').fill(orgData.benefitRecipient)
        await page.locator('#street').fill(orgData.street)
        await page.locator('#zip').fill(orgData.zip)
        await page.locator('#city').fill(orgData.city)
        await page.locator('#externalOrgId').fill(orgData.externalOrgId)
        await page.locator('#billEmail').fill(orgData.billEmail)
        await page.locator('button[type="submit"]').click()
    }

    async function verifyOrgCreation(){
        await page.waitForLoadState("networkidle")
        await page.locator('input[type="search"]').fill(orgData.orgName)
        await expect(page.locator(`td:has-text("${orgData.orgName}")`)).toBeVisible()
    }

    async function deleteTestOrg() {
        await page.locator(`td:has-text("${orgData.orgName}")`).click()
        await page.locator('a[href*="/Organisations/delete"]').click();
        await page.locator('input[type="password"]').fill(password)
        await page.locator('button[type="submit"]').click()
    }

    async function verifyDeletion() {
        await page.locator('input[type="search"]').fill(orgData.orgName)
        await expect(page.locator('td[class="dt-empty"]')).toBeVisible()
    }
    
    async function verifySuccessfulLogin() {
        const dashboardLocator: Locator = page.getByRole('heading', { name: ' Dashboard DriversCheck GmbH' }).locator('small');
        await expect(dashboardLocator).toBeVisible();
    }

    async function openEmployeeProfile() {
        await page.getByLabel('Suchen').fill(employeeName);
        await expect(page.getByText('1 bis 1 von 1 Einträgen (')).toBeVisible();
        await expect(page.getByRole('cell', { name: employeeName })).toBeVisible();
        await page.getByRole('cell', { name: employeeName }).click();
        await page.waitForLoadState("domcontentloaded");
    }

    async function changeEmployeeBasicData( locatorStr: string ) {
        await page.locator('#employeeBasicData').getByRole('button', { name: ' Bearbeiten' }).click();
        const selectElement = page.getByRole('cell').locator(locatorStr);
        await selectElement.click();
    
        const currentSalutation = await selectElement.locator('option:checked').getAttribute('value');
        const newSalutation = await getAlternativeSalutation(selectElement, currentSalutation);
    
        await selectElement.selectOption(newSalutation);
        await page.getByRole('button', { name: ' Übernehmen' }).click();
    
        const updatedSalutation = await selectElement.locator('option:checked').getAttribute('value');
        expect(updatedSalutation).toBe(newSalutation);
    }

    async function getAlternativeSalutation(selectElement: Locator, currentSalutation: string | null): Promise<string> {
        const options = await selectElement.locator('option').all();
        for (const option of options) {
            const optionValue = await option.getAttribute('value');
            if (optionValue !== currentSalutation) {
                return optionValue!;
            }
        }
        throw new Error('No alternative salutation found');
    }
});
