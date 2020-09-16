import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({headless: false});
const page = await browser.newPage();

await page.goto('https://google.com');

await page.waitFor("#main");

console.log('main input found');

await page.type('#main', 'Some text for main input');

await page.keyboard.press('Enter');
// console.log('submit button found');

// await page.click('input[type=submit]');

// await page.waitFor('')

// // wait for an element to appear that matches the selector  'input[type="text"]'
// await page.waitFor('input[type="text"]');

// // type a key on the keybaord
// await page.keyboard.press("Enter");