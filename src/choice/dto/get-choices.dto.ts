import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';

export class GetChoicesDto {
    
    @IsNotEmpty()
    text: string;

}