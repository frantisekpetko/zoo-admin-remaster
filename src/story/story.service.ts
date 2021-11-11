import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateChoiceDto } from '../choice/dto/create-choice.dto';
import { Story } from '../entity/old/story.entity';
import { StoryRepository } from './story.repository';

@Injectable()
export class StoryService {

    constructor(
        @InjectRepository(StoryRepository)
        private storyRepository: StoryRepository) { }

    async getAllStories(): Promise<Story[]> {
        return this.storyRepository.getAllStories();
    }


    async createStoryWithoutRelationship(createStoryDto: CreateChoiceDto): Promise<void> {
        return this.storyRepository.createStoryWithoutRelationship(createStoryDto);
    }

}
