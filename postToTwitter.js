import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  headless: false,
  slowMo: 10
});

const context = await browser.createIncognitoBrowserContext();
const page = await context.newPage();

await page.goto('https://www.twitter.com');

await page.setViewport({
  width: 1280,
  height: 720
});

console.log('open the browser window, and login to twitter:');

// wait for the tweet input to appear.
const messengerContainer = await page.waitForSelector('.DraftEditor-editorContainer');

console.log('found messenger container, clicking.');

await messengerContainer.click();
// const messengerLink = await page.waitForSelector('[data-testid=left_nav_item_Messenger]');

await page.keyboard.type('I love this site? But how do I use it?', {delay: 100});

const tweetButton = await page.waitForSelector('a[data-testid=addButton]');

await tweetButton.click();

// add another tweet dialog comes up.  lets wait a few seconds.
console.log('waiting 3 seconds');
await page.waitForTimeout(3000);

console.log('typing a second tweet');
await page.keyboard.type('Im tired.  lets try again tomorrow :', { delay: 100});

const tweetAgainButton = await page.waitForSelector('div[data-testid=tweetButton]')
await tweetAgainButton.click();