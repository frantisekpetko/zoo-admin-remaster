import { IsNotEmpty } from 'class-validator';

export class CreateStoryDto {

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    text: string;

}