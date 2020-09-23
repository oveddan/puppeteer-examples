import rw from '@runwayml/hosted-models';

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

console.log(outputs.image);