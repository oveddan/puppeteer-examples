import puppeteer from 'puppeteer';

// launch puppeteer
const browser = await puppeteer.launch({headless:false});

// create a page
const page = await browser.newPage();

// navigate to google.com
await page.goto('https://google.com');
// capture a screenshot
await page.screenshot({path: 'google.png'});

// close the browser
await browser.close();