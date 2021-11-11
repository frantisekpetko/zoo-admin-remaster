
import { EntityRepository, Repository } from "typeorm";
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { Choice } from '../entity/old/choice.entity';
import { CreateChoiceDto } from "./dto/create-choice.dto";

@EntityRepository(Choice)
export class ChoiceRepository extends Repository<Choice> {
    private logger = new Logger('ChoiceRepository');

    async getChoices(): Promise<Choice[]>
    {
        const query = this.createQueryBuilder('choice');
        const choices = await query.getMany();
        return choices;
    }

    async createChoiceWithoutRelationship(createChoiceDto: CreateChoiceDto,):Promise<void> {
        const { text } = createChoiceDto;
        const choice = new Choice();
        choice.title = text;
        choice.text = text;

        try {
            await choice.save();
        }
        catch (e) {
            ;
            throw new InternalServerErrorException();
        }
        //return choice
    }

}