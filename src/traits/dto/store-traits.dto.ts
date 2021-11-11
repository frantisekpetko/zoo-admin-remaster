import { IsString } from 'class-validator';


export class CreateTraitsDto {

    @IsString()
    name: string;
}