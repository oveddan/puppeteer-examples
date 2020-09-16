import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  headless: false,
  slowMo: 10
});

const context = await browser.createIncognitoBrowserContext();
const page = await context.newPage();

await page.goto('https://www.facebook.com');

await page.setViewport({
  width: 1280,
  height: 720
});

console.log('open the browser window, and login to facebook:');

// wait for the facebook messenger link to appear.
const messengerLink = await page.waitForSelector('[data-testid=left_nav_item_Messenger]');

// let the page load
await page.waitForTimeout(3000);

// click the messenger link.
await messengerLink.click();

console.log('opened messenger link');

// wait for a chat to be opened.
await page.waitForSelector("[aria-label='New message']");


await page.keyboard.type('Hi!  Hows it going today?', {delay: 10});
await page.keyboard.press('Enter');

// wait 5 seconds before sending another message.
await page.waitForTimeout(5000);

await page.keyboard.type('Aw, ok.  Lets chat another day!', {delay: 20});
await page.keyboard.press('Enter');