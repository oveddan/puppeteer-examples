
import puppeteer from 'puppeteer';
import rw from '@runwayml/hosted-models';

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

console.log('open the browser window, and login to facebook:');

// wait for the main post box to be opened.
const model = new rw.HostedModel({
  url: "https://gpt-2-fbbc2c77.hosted-models.runwayml.cloud/v1/",
  token: "ma2wfXpwDlOuudT0BfE8NQ==",
});


console.log('login to twitter')


console.log('waiting for tweet box to appear.');
const messengerContainer = await page.waitForSelector('.DraftEditor-editorContainer');

console.log('found messenger container, clicking.');

await messengerContainer.click();
// const messengerLink = await page.waitForSelector('[data-testid=left_nav_item_Messenger]');

let randomSeed = Math.round(Math.random() * 1000);

let inputs = {
  "prompt": "I'm feeling",
  "max_characters": 140,
  "top_p": 0.9,
  "seed": randomSeed 
};
let outputs = await model.query(inputs);
let generated_text = outputs.generated_text;


await page.keyboard.type(generated_text, {delay: 100});

const tweetButton = await page.waitForSelector('a[data-testid=addButton]');

await tweetButton.click();

// add another tweet dialog comes up.  lets wait a few seconds.
console.log('waiting 3 seconds');
await page.waitForTimeout(3000);

console.log('typing a second tweet');

randomSeed = Math.round(Math.random() * 1000);

inputs = {
  "prompt": "I think that",
  "max_characters": 140,
  "top_p": 0.9,
  "seed": randomSeed 
};

outputs = await model.query(inputs);
generated_text = outputs.generated_text

await page.keyboard.type(generated_text, { delay: 100});

const tweetAgainButton = await page.waitForSelector('div[data-testid=tweetButton]')
await tweetAgainButton.click();