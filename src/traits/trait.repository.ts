import { Trait } from '../entity/old/trait.entity';
import { EntityRepository, getConnection, getRepository, Repository } from "typeorm";
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { GetTraitsDto } from './dto/get-traits.dto';
import { CreateTraitsDto } from './dto/store-traits.dto';

@EntityRepository(Trait)
export class TraitRepository extends Repository<Trait> {
    private logger = new Logger('TraitRepository');


    async getTraits(): Promise<Trait[]> {
       
        const query = this.createQueryBuilder('trait');
        
        try {
            const traits = await query.getMany();
            return traits;
        }
        catch (error) {
            this.logger.error(`Failed to get tasks for traits`, error.stack);
            throw new InternalServerErrorException();
        }

    }

    async storeInitialData(createTraitsDto: CreateTraitsDto): Promise<Trait> {
        const query = getRepository(Trait);
        this.logger.log('createTratDto', JSON.stringify(createTraitsDto));

        let item= null;
        let id = null;

        try { 
            /*await query.insert()
                 .into(Trait)
                 .values()
                .execute();*/
            function simpleStringify(object) {
                var simpleObject = {};
                for (var prop in object) {
                    if (!object.hasOwnProperty(prop)) {
                        continue;
                    }
                    if (typeof (object[prop]) == 'object') {
                        continue;
                    }
                    if (typeof (object[prop]) == 'function') {
                        continue;
                    }
                    simpleObject[prop] = object[prop];
                }
                return JSON.stringify(simpleObject); // returns cleaned up JSON
            };

            await getRepository(Trait).save(createTraitsDto);

            /*item = await query
                .createQueryBuilder('trait')
                .skip(0)
                .take(1)
                .orderBy('trait.id', 'DESC');*/

            item = await getRepository(Trait).find({
                order: {
                    id: 'DESC'
                },
                take: 1
            })
           

            this.logger.log( 'item');
            /*id = await getConnection()
                .createQueryBuilder()
                .insert()
                .into(Trait)
                .values([createTraitsDto])
                .execute();*/
            
            /*item = await this.createQueryBuilder()
                .select("trait")
                .from(Trait, "trait")
                .where("trait.id = :id", { id: id.raw.insertId})
                .getOne();*/
            
        }
        catch (e) {
            this.logger.error(e);
        }
    
        //this.logger.log(JSON.stringify(item), 'item');
        return item[0];
        //return item;
        
    }

  
}