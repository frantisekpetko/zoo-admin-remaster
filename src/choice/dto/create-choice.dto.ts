import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateChoiceDto {

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    text: string;

}