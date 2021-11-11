import { Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateChoiceDto } from '../choice/dto/create-choice.dto';
import { Story } from '../entity/old/story.entity';
import { CreateStoryDto } from './dto/create-story.dto';
import { StoryService } from './story.service';

@Controller('story')
export class StoryController {

    constructor(private storyService: StoryService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAllStories(): Promise<Story[]> {
        return this.storyService.getAllStories();
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createStoryWithoutRelationship(createStoryDto: CreateStoryDto): Promise<void> {
        return this.storyService.createStoryWithoutRelationship(createStoryDto);
    }



}
