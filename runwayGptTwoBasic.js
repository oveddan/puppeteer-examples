import rw from '@runwayml/hosted-models';
import * as fs from 'fs';

const model = new rw.HostedModel({
  url: "https://gpt-2-fbbc2c77.hosted-models.runwayml.cloud/v1/",
  token: "ma2wfXpwDlOuudT0BfE8NQ==",
});
//// You can use the info() method to see what type of input object the model expects
// model.info().then(info => console.log(info));

const randomSeed = Math.round(Math.random() * 1000);

const inputs = {
  "prompt": "I feel",
  "max_characters": 50,
  "top_p": 0.9,
  "seed": randomSeed 
};

const outputs = await model.query(inputs);

const { generated_text, encountered_end } = outputs;

fs.writeFileSync('feelingText.txt', generated_text);
console.log('generated:', generated_text);