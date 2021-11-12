import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Command, CommandArguments, _cli } from '@squareboat/nest-console';

import * as fs from 'fs';
import { resolve } from 'path';
import { getConnection } from 'typeorm';
import { Animal } from '../entity/animal.entity';
import { Image } from '../entity/image.entity';
import { Extlink } from '../entity/extlink.entity';
import { User } from '../entity/user.entity';
import * as bcrypt from 'bcrypt';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
//import wiki from 'wikijs';

@Injectable()
export class CommandsService {
  @Command('data', {
    desc: 'Get images from Internet',
    args: {},
  })
  async data() {
    //await this.getImages();
    //await this.createAnimalJSONfile();
    await this.deleteDataFromTables();
    await this.storeData();
    await this.createSeeds();
    _cli.success('message');
  }

  async getImages() {
    const image_finder = require('image-search-engine');

    const downloadImage = (url, image_path) =>
      axios({
        url,
        responseType: 'stream',
      }).then(
        (response) =>
          new Promise<void>((resolve, reject) => {
            response.data
              .pipe(fs.createWriteStream(image_path))
              .on('finish', () => resolve())
              .on('error', (e) => reject(e));
          }),
      );

    const namesObj = JSON.parse(
      fs.readFileSync(resolve('./src/data/seed/animals/names.json'), 'utf8'),
    );

    const latinnamesObj = JSON.parse(
      fs.readFileSync(
        resolve('./src/data/seed/animals/latinnames.json'),
        'utf8',
      ),
    );

    const imagesObj = [];

    fs.rmSync(resolve('./frontend/public/images'), {
      recursive: true,
      force: true,
    });

    fs.mkdir(resolve('./frontend/public/images'), (err) => {
      if (err) {
        return console.error(err);
      }
      console.log('Directory created successfully!');
    });

    await Promise.all(
      latinnamesObj.map(async (animal, index) => {
        try {
          const url = await image_finder.find(animal, {
            size: 'medium',
          });

          const imageName = `${animal}${uuidv4()}.jpg`;
          await downloadImage(
            `${url}`,
            resolve(`./frontend/public/images/${imageName}`),
          ).catch((e) => console.log('Error: ', e));
          imagesObj.push({
            name: namesObj[index],
            latinname: animal,
            image: imageName,
          });
        } catch (error) {
          console.error('Error:', error);
        }
      }),
    );

    fs.unlink('./src/data/seed/animals/images.json', function (err) {
      if (err) throw err;
      // if no error, file has been deleted successfully
      console.log('images.json deleted!');
    });

    fs.open('./src/data/seed/animals/images.json', 'w', function (err, file) {
      if (err) throw err;
      console.log('Saved!');
    });

    fs.writeFileSync(
      './src/data/seed/animals/images.json',
      JSON.stringify(imagesObj, null, 4),
      'utf8',
    );
  }

  @Command('animal:json', {
    desc: 'Get images from Internet',
    args: {},
  })
  async createAnimalJSONfile() {
    const imagesObj = JSON.parse(
      fs.readFileSync(resolve('./src/data/seed/animals/images.json'), 'utf8'),
    );

    _cli.info(JSON.stringify(imagesObj));
    const wiki = require('wikijs').default;

    const animalObj = [];

    try {
      await Promise.all(
        imagesObj.map(async (data) => {
          try {
            let content: any = [];
            _cli.info('Inside the Promise');
            wiki({ apiUrl: 'https://cz.wikipedia.org/w/api.php' })
              .page(data.name)
              .then(async (page) => {
                //content = await page.content();
                _cli.success('Inside Wiki');
                content = await page.chain().summary().extlinks().request();
                animalObj.push({
                  name: data.name,
                  latinname: data.latinname,
                  image: data.image,
                  extract: content.extract,
                  extlinks: [...content.extlinks],
                });
              })
              .catch((e) => _cli.error(e))
              .finally(() => {
                _cli.info(JSON.stringify(animalObj));
                fs.writeFile(
                  './src/data/seed/animals/animals.json',
                  JSON.stringify(animalObj, null, 4),
                  'utf8',
                  () => console.log('Mkdir Done'),
                );
              });
          } catch (e) {
            console.error('Error: ', e);
          } finally {
          }
        }),
      );
    } catch (e) {
      console.error(e);
    }
  }

  async deleteDataFromTables() {
    const conn = getConnection();

    const entities = conn.entityMetadatas;

    for (const entity of entities) {
      const repository = conn.getRepository(entity.name); // Get repository
      await repository.clear(); // Clear each entity table's content
    }
  }

  @Command('store:data', {
    desc: 'Store intial data',
    args: {},
  })
  async storeData() {
    const animalsObj = JSON.parse(
      fs.readFileSync(resolve('./src/data/seed/animals/animals.json'), 'utf8'),
    );
    _cli.success(JSON.stringify(animalsObj));
    for (const _animal of animalsObj) {
      //const index = animalsObj.indexOf(_animal);
      const animal = new Animal();
      animal.name = _animal.name;
      animal.latinname = _animal.latinname;
      animal.description = _animal.extract;
      const image = new Image();
      image.urlName = _animal.image;

      _cli.info(_animal.image);
      try {
        await image.save();
      } catch (e) {
        _cli.error(e);
      }

      //await conn.manager.save(image);

      animal.images = [image];
      //console.log(animal.images);
      animal.extlinks = [];

      for (const extlink of _animal.extlinks) {
        const extLink = new Extlink();
        extLink.link = extlink;
        try {
          await extLink.save();
        } catch (e) {
          _cli.error(e);
        }

        //await conn.manager.save(extLink);
        animal.extlinks.push(extLink);
      }
      //console.log(animal.extlinks);
      //await conn.manager.save(animal);
      try {
        await animal.save();
      } catch (e) {
        _cli.error(e);
      }
    }
  }

  @Command('seeds', {
    desc: 'Create seeds',
    args: {},
  })
  async createSeeds(): Promise<void> {
    const salt = await bcrypt.genSalt();

    const user = new User();

    user.username = 'user';
    user.salt = salt;
    user.password = await bcrypt.hash('123456', salt);

    try {
      await user.save();
      _cli.success('success');
    } catch (error) {
      if (error.errno === 19) {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
