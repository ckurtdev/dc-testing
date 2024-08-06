import {expect, type Locator, type Page} from '@playwright/test';

export class DCLogin{
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;
    readonly forgotPasswordButton: Locator;
  

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.getByPlaceholder('E-Mail')
        this.passwordInput = page.getByPlaceholder('Passwort')
        this.submitButton = page.getByRole('button', { name: 'Anmelden' })
        this.forgotPasswordButton = page.locator('a', {hasText: "Passwort vergessen?"})
    }

    async goto(){
<<<<<<< HEAD
        await this.page.goto("https://admin.dc.local/Login")
=======
        await this.page.goto("")
>>>>>>> fde243b77507b43a8e75ee56e95fb25ab72a68fc
    }


    // open Pages
    async gotoForgotPassword(): Promise<void> {
        await this.forgotPasswordButton.click()
    }

    // actions
    async login(email: string, password: string): Promise<void>{
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password)
        await this.submitButton.click();
    }
}