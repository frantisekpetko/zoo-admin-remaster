import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';


export class GetTraitsDto {

    @IsString()
    name: string;
}