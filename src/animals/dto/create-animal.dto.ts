import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Extlinks } from './extlinks.dto';
import { Type } from 'class-transformer';

export class CreateAnimalDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  latinname: string;

  @IsNotEmpty()
  description: string;
  /*
  @IsNotEmpty()
  images: Express.Multer.File | Array<Express.Multer.File>;
  */

  @IsUrl()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(Infinity)
  @Type(() => Extlinks)
  extlinks: Extlinks[];
}
