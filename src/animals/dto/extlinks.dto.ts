import { IsOptional, IsString, IsUrl } from 'class-validator';

export class Extlinks {
  @IsUrl(undefined, { message: 'Animal URLs is not valid.' })
  @IsOptional()
  @IsString({ message: 'URL is not string!' })
  extlinks: string[];
}
