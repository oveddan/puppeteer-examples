import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({headless: false});

const page = await browser.newPage();

await page.setViewport({width: 1280, height: 720});

console.log('going to youtube')
await page.goto('https://www.youtube.com');

await page.click('form');

const searchBox = await page.waitForSelector('#search');

await page.type('#search', "I'm so scared :(");

await page.keyboard.press('Enter');

// wait for the link for the first video appear.
await page.waitForSelector('a#video-title');

console.log('found video, opening the first one.')

// click the link for the first video appear.
await page.click('a#video-title');

const watchDuration = 5;

while(true) {
  await page.waitFor('h1 yt-formatted-string');

  const videoTitle = await page.evaluate(function() {
    return document.querySelector('h1 yt-formatted-string').innerText;
  });

  console.log('watching video ' + videoTitle);

  // watch the video for the watchDuration seconds
  await page.waitFor(watchDuration * 1000);

  await page.waitForSelector('#related #items #contents a');

  await page.click('#related #items #contents a');

}
