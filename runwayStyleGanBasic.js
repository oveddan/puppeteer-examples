import rw from '@runwayml/hosted-models';
import * as fs from 'fs';

const model = new rw.HostedModel({
  url: "https://skygan-a035afd5.hosted-models.runwayml.cloud/v1/",
  token: "jcRK4bhK45fIF7C/xacs9A==",
});
//// You can use the info() method to see what type of input object the model expects
// console.log(await model.info());

const z = [];

for(let i = 0; i < 512; i++) {
  z.push(Math.random());
}

const inputs = {
  "z": z,
  "truncation": 0.8
};

console.log('running stylegan2 on sky images')
const outputs = await model.query(inputs);

console.log('got an image, saving it');
// console.log(outputs.image);

console.log('saving image to file image.jpg');
const imageData = outputs.image.replace(/^data:image\/\w+;base64,/, "");
const buf = new Buffer(imageData, 'base64');
fs.writeFileSync('image.jpg', buf);

// see https://pptr.dev/#?product=Puppeteer&version=v5.3.1&show=api-elementhandleuploadfilefilepaths
// for how to upload this file using puppeteer.
