import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({headless: false});
const page = await browser.newPage();

await page.goto('https://google.com');

await page.waitFor("#main");

console.log('main input found');

await page.type('#main', 'Some text for main input');

await page.keyboard.press('Enter');