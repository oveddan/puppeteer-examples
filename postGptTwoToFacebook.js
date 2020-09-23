
import puppeteer from 'puppeteer';
import rw from '@runwayml/hosted-models';

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

// wait for the main post box to be opened.
const model = new rw.HostedModel({
  url: "https://gpt-2-fbbc2c77.hosted-models.runwayml.cloud/v1/",
  token: "ma2wfXpwDlOuudT0BfE8NQ==",
});


console.log('login to facebook and go to the newsfeed.')

console.log('waiting for news feed text area to appear.');

await page.waitForSelector('textarea');

console.log('found text area.  Now generated text to post');

const randomSeed = Math.round(Math.random() * 1000);

const inputs = {
  "prompt": "I'm feeling",
  "max_characters": 200,
  "top_p": 0.9,
  "seed": randomSeed 
};
const outputs = await model.query(inputs);
const generated_text = outputs.generated_text;

console.log('generated text:', generated_text);

await page.type('textarea', generated_text);

// click the submit button.
await page.click('div[role=dialog] button[type=submit]')