import { resolve } from 'path';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Command, CommandArguments, _cli } from '@squareboat/nest-console';
import { getConnection, getRepository } from 'typeorm';
import { Trait } from './entity/old/trait.entity';
import { CreateTraitsDto } from './traits/dto/store-traits.dto';
import * as fs from 'fs';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import wiki from 'wikijs';
import { Animal } from './entity/animal.entity';
import { Extlink } from './entity/extlink.entity';
import { Image } from './entity/image.entity';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService {
  private imagesObj: string[] = [];

  constructor() {
    this.imagesObj = JSON.parse(
      fs.readFileSync(resolve('./src/data/seed/animals/images.json'), 'utf8'),
    );
  }

  @Command('prepare:app', {
    desc: 'Get images from Internet',
    args: {},
  })
  async prepareApp(): Promise<void> {
    await this.getImagesFromInternet();
    await this.storeData();
    await this.createSeeds();
  }

  @Command('get:images', {
    desc: 'Get images from Internet',
    args: {},
  })
  async getImagesFromInternet(): Promise<void> {
    const image_finder = require('image-search-engine');

    const namesObj = JSON.parse(
      fs.readFileSync(resolve('./src/data/seed/animals/names.json'), 'utf8'),
    );
    const latinnamesObj = JSON.parse(
      fs.readFileSync(resolve('./src/data/seed/animals/latinnames.json'), 'utf8'),
    );

    const descriptionObj = JSON.parse(
      fs.readFileSync(resolve('./src/data/seed/animals/description.json'), 'utf8'),
    );

    const imagesObj: { name: string; latinname: string; image: string }[] = [];

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

    await Promise.all(
      latinnamesObj.map(async (animal: string, index) => {
        try {
          const url = await image_finder.find(namesObj[index], {
            size: 'medium',
          });
          //, {size: "large", color: "pink"}
          //download(url);
          const imageName = `${latinnamesObj[index]}${uuidv4()}.jpg`;
          await downloadImage(
            `${url}`,
            resolve(`./frontend/public/images/${imageName}`),
          ).catch((e) => console.log('Error: ', e));
          imagesObj.push({
            name: descriptionObj[index],
            latinname: latinnamesObj[index],
            image: imageName,
          });
        } catch (error) {
          console.error('Error:', error);
        }
      }),
    );
    //commands.log(JSON.stringify(imagesObj, null, 4));

    fs.writeFileSync(
      './src/data/seed/animals/images.json',
      JSON.stringify(imagesObj, null, 4),
      'utf8',
    );

    await this.prepareJSON();
  }

  async prepareJSON() {
    try {
      await Promise.all(
        this.imagesObj.map(async (animal, index) => {
          await this.prepareData(animal, index);
        }),
      );
    } catch (e) {}
  }

  async prepareData(data, index) {
    const wiki = require('wikijs').default;
    /*const namesObj = JSON.parse(
      fs.readFileSync(resolve('./src/data/seed/animals/names.json'), 'utf8'),
    );*/
    const latinnamesObj = JSON.parse(
      fs.readFileSync(
        resolve('./src/data/seed/animals/latinnames.json'),
        'utf8',
      ),
    );

    const descriptionObj = [];
    const extLinksObj = [];

    try {
      console.log(data);
      let content: any = {};
      const extLinksContent = {};

      wiki({ apiUrl: 'https://cz.wikipedia.org/w/api.php' })
        .page(data.latinname)
        .then(async (page) => {
          //content = await page.content();
          content = await page.chain().summary().extlinks().request();
          descriptionObj.push({
            name: data.name,
            latinname: data.latinname,
            extract: content.extract,
          });
          extLinksObj.push({
            name: data,
            latinname: data.latinname,
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

  @Command('store:datas', {
    desc: 'Store intial data',
    args: {},
  })
  async storeData() {
    const animalsObj = JSON.parse(
      fs.readFileSync(
        resolve('./src/data/seed/animals/animals.json'),
        'utf8',
      ),
    );

    const conn = getConnection();

    const entities = getConnection().entityMetadatas;

    for (const entity of entities) {
      const repository = getConnection().getRepository(entity.name); // Get repository
      await repository.clear(); // Clear each entity table's content
    }

    for (const _animal of animalsObj) {
      //const index = animalsObj.indexOf(_animal);
      const animal = new Animal();
      animal.name = _animal.name;
      animal.latinname = _animal.latinname;
      animal.description = _animal.extract;
      const image = new Image();
      image.urlName = _animal.image;
      await conn.manager.save(image);

      animal.images = [image];
      //console.log(animal.images);
      animal.extlinks = [];

      for (const extlink of _animal.extlinks) {
        const extLink = new Extlink();
        extLink.link = extlink;
        await conn.manager.save(extLink);
        animal.extlinks.push(extLink);
      }
      //console.log(animal.extlinks);
      await conn.manager.save(animal);
    }
  }

  @Command('seeds', {
    desc: 'Create seeds',
    args: {},
  })
  async createSeeds(): Promise<void> {
    /*let item = await getRepository(Trait)
                .createQueryBuilder('trait')
                .skip(0)
                .take(1)
                .orderBy('trait.id', 'DESC');
    */
    /*
    const createTraitsDto: CreateTraitsDto = new CreateTraitsDto();
    createTraitsDto.name = 'lord';

    const query = getConnection().createQueryBuilder();
    await query.insert().into(Trait).values([createTraitsDto]).execute();
    */
    const salt = await bcrypt.genSalt();
    //commands.log(salt);

    const user = new User();

    user.username = 'user';
    user.salt = salt;
    user.password = await bcrypt.hash('123456', salt);

    //commands.log(user.password);
    try {
      await user.save();
      _cli.success('success');
    } catch (error) {
      if (error.errno === 19) {
        //duplicate username
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
