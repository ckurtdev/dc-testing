import {expect, type Locator, type Page} from '@playwright/test';

export class DCLogin{
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;
    readonly forgotPasswordButton: Locator;
    readonly baseUrl: string;
  

    constructor(page: Page, baseUrl: string) {
        this.page = page;
        this.baseUrl = baseUrl;
        this.emailInput = page.getByPlaceholder('E-Mail')
        this.passwordInput = page.getByPlaceholder('Passwort')
        this.submitButton = page.getByRole('button', { name: 'Anmelden' })
        this.forgotPasswordButton = page.locator('a', {hasText: "Passwort vergessen?"})
    }

    async goto(){
        await this.page.goto("")
    }


    // open Pages
    async gotoForgotPassword(): Promise<void> {
        await this.forgotPasswordButton.click()
    }

    // actions
    async login(email: string, password: string): Promise<void>{
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password)
        await this.submitButton.click()
    }
}