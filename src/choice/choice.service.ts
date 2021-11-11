import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Choice } from '../entity/old/choice.entity';
import { ChoiceRepository } from './choice.repository';
import { CreateChoiceDto } from './dto/create-choice.dto';

@Injectable()
export class ChoiceService {

    constructor(
        @InjectRepository(ChoiceRepository)
        private choiceRepository: ChoiceRepository) { }

    async getChoices():Promise<Choice[]> {
        return this.choiceRepository.getChoices();
    }

    async createChoiceWithoutRelationship(createChoiceDto: CreateChoiceDto):Promise<void>{
        return this.choiceRepository.createChoiceWithoutRelationship(createChoiceDto);
    }
}
