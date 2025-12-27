import { Page, Locator } from '@playwright/test';

export class BasketPage {
  readonly page: Page;
  readonly checkoutLink: Locator;
  readonly nameInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutLink = page.locator('a[href="/basket"]');
    
    
    this.nameInput = page.locator('#name').first(); 
    
    this.submitButton = page.getByRole('button', { name: /checkout/i });
  }

  async navigate() {
    await this.page.goto('https://sweetshop.netlify.app/basket');
  }
}