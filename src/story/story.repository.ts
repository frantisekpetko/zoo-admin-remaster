
import { EntityRepository, Repository } from "typeorm";
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { Story } from "../entity/old/story.entity";
import { CreateStoryDto } from "./dto/create-story.dto";

@EntityRepository(Story)
export class StoryRepository extends Repository<Story> {
    private logger = new Logger('StoryRepository');

    async getAllStories(): Promise<Story[]> {
        const query = this.createQueryBuilder('story');
        const stories = await query.getMany();
        return stories;
    }


    async createStoryWithoutRelationship(createStoryDto: CreateStoryDto): Promise<void> {
       
    }
}