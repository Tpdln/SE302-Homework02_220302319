import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SweetsPage } from '../pages/SweetsPage';
import { BasketPage } from '../pages/BasketPage';

test.describe('Sweet Shop Website Automation Tests', () => {

 
  test('TC_01: Verify Valid Login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('test@example.com', 'password123');
    await expect(page).toHaveURL(/sweetshop.netlify.app/); 
  });


  test('TC_02: Verify Login with Invalid Email Format', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    
    
    await loginPage.login('gecersizemail', '123456');

    
    await expect(loginPage.loginButton).toBeVisible();
    
    
    await expect(page.url()).toContain('/login');
  });

 
  test('TC_03: Add Product to Basket', async ({ page }) => {
    const sweetsPage = new SweetsPage(page);
    await sweetsPage.navigate();

    
    await sweetsPage.addItemToBasket();

    const badge = page.locator('.badge-success');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveText('1');
  });

  
  test('TC_06: Basket Page Navigation', async ({ page }) => {
    await page.goto('https://sweetshop.netlify.app/');
    await page.locator('a[href="/basket"]').click();
    await expect(page).toHaveURL(/.*basket/);
    await expect(page.locator('h1, h2').first()).toContainText(/Basket/i);
  });

  
  test('TC_05: Checkout with Empty Fields', async ({ page }) => {
    const sweetsPage = new SweetsPage(page);
    await sweetsPage.navigate();
    await sweetsPage.addItemToBasket();

    const basketPage = new BasketPage(page);
    await basketPage.navigate();

    await basketPage.nameInput.fill('');
    
    
    await basketPage.submitButton.click({ force: true });

    
    await expect(page).toHaveURL(/.*basket/);
  });

});