import { Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Choice } from '../entity/old/choice.entity';
import { ChoiceService } from './choice.service';
import { CreateChoiceDto } from './dto/create-choice.dto';

@Controller('choice')
export class ChoiceController {

    constructor(private choiceService: ChoiceService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    async getChoices(): Promise<Choice[]> {
        return this.choiceService.getChoices();
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createChoiceWithoutRelationship(createChoiceDto: CreateChoiceDto): Promise<void> {
        return this.choiceService.createChoiceWithoutRelationship(createChoiceDto);
    }


}
