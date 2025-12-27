import { Page, Locator } from '@playwright/test';

export class SweetsPage {
  readonly page: Page;
  readonly firstItemAddButton: Locator;

  constructor(page: Page) {
    this.page = page;
    
    this.firstItemAddButton = page.locator('text="Add to Basket"').first();
  }

  async navigate() {
    await this.page.goto('https://sweetshop.netlify.app/sweets');
   
    await this.page.waitForLoadState('domcontentloaded');
  }

  async addItemToBasket() {
    
    await this.firstItemAddButton.click({ force: true });
  }
}