import rw from '@runwayml/hosted-models';

const model = new rw.HostedModel({
  url: "https://gpt-2-fbbc2c77.hosted-models.runwayml.cloud/v1/",
  token: "ma2wfXpwDlOuudT0BfE8NQ==",
});
//// You can use the info() method to see what type of input object the model expects
// model.info().then(info => console.log(info));

const randomSeed = Math.round(Math.random() * 1000);

const inputs = {
  "prompt": "I'm feeling",
  "max_characters": 200,
  "top_p": 0.9,
  "seed": randomSeed 
};

const outputs = await model.query(inputs);

const { generated_text, encountered_end } = outputs;

console.log('generated:', generated_text);