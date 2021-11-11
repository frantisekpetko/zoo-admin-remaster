//const image_finder = require('image-search-engine');
const fs = require('fs');
//const https = require('https');
//const Stream = require('stream').Transform;
const { v1: uuidv1, v4: uuidv4 } = require('uuid');
//const axios = require('axios');
const wiki = require('wikijs').default;
const { resolve } = require('path');

const namesObj = JSON.parse(
  fs.readFileSync(resolve('./src/data/seed/animals/names.json'), 'utf8'),
);
const latinnamesObj = JSON.parse(
  fs.readFileSync(resolve('./src/data/seed/animals/latinnames.json'), 'utf8'),
);
/*const descObj = JSON.parse(
  fs.readFileSync(resolve('./src/data/seed/animals/description.json'), 'utf8'),
);

console.log('length', descObj.length);
*/



async function getDataFromWiki(data, index) {
  let descriptionObj = [];
  let extLinksObj = [];

  try {
    console.log(data);
    let content = {};
    let extLinksContent = {};

    wiki({ apiUrl: 'https://cz.wikipedia.org/w/api.php' })
      .page(data)
      .then(async (page) => {
        //content = await page.content();
        content = await page.chain().summary().extlinks().request();
        descriptionObj.push({
          name: data,
          latinname: latinnamesObj[index],
          extract: content.extract,
        });
        extLinksObj.push({
          name: data,
          latinname: latinnamesObj[index],
          extlinks: [...content.extlinks],
        });
        console.log('ContentImage', content);
      })
      .catch((e) => console.log('Error: ', e))
      .finally(() => {
        fs.writeFile(
          './src/data/seed/animals/extlinks.json',
          JSON.stringify(extLinksObj, null, 4),
          'utf8',
          () => console.log('Mkdir Images Done'),
        );

        fs.writeFile(
          './src/data/seed/animals/description.json',
          JSON.stringify(descriptionObj, null, 4),
          'utf8',
          () => console.log('Mkdir Done'),
        );
      });
  } catch (e) {
    console.log('Error: ', e);
  }
}
(async () => {
  try {
    await Promise.all(
      namesObj.map(async (animal, index) => {
        await getDataFromWiki(animal, index);
      }),
    );
  } catch (e) {}
})();

//getImages();
